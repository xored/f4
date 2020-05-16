using concurrent::Actor
using concurrent::ActorPool
using concurrent::AtomicInt
using concurrent::Future

** Provides 'synchronized' access to a (non- 'const') mutable state object.
**
** 'SynchronizedState' creates the state object in its own thread and provides access to it via the
** 'sync()' and 'async()' methods. Note that by their nature, these methods are immutable
** boundaries. Meaning that while data in the State object can be mutable, data passed in and out
** of these these boundaries can not be.
**
** 'SynchronizedState' is designed to be *scope safe*, that is you cannot accidently call methods
** on your State object outside of the 'sync()' and 'async()' methods.
**
** Example usage:
**
** pre>
** syntax: fantom
**
** sync := SynchronizedState(ActorPool(), Mutable#)
** msg  := "That's cool, dude!"
**
** val  := sync.sync |Mutable state -> Int| {
**     state.buf.writeChars(msg)
**     return state.buf.size
** }
**
** class Mutable {
**     Buf buf := Buf()
** }
** <pre
**
** Note 'SynchronizedState' overrides 'trap()' to make convenience calls to 'sync()' allowing dynamic calls:
**
** pre>
** syntax: fantom
** sync := SynchronizedState(ActorPool(), Mutable#)
**
** size := sync->buf->size  //--> returns size of Mutable.buf
** <pre
internal const class SynchronizedState {
	@NoDoc	// advanced use only
	const |->Obj?| 		stateFactory
	@NoDoc	// advanced use only
	const LocalRef 		stateRef

	** The 'lock' object should you need to 'synchronize' on the state.
	const Synchronized	lock

	// Note we can't create a ctor(syncPool, type) 'cos that leads to ambiguous ctors in existing libs like afBedSheet / afParrotSdk2
	@NoDoc	// advanced use only - for setting own lock
	new make(|This| f) {
		f(this)
		if (this.stateRef == null)
			this.stateRef = LocalRef(SynchronizedState#.name)
	}

	** Creates a 'SynchronizedState' instance.
	**
	** The given state type must have a public no-args ctor as per [Type.make]`sys::Type.make`.
	new makeWithType(ActorPool actorPool, Type stateType) {
		this.lock			= Synchronized(actorPool)
		this.stateRef		= LocalRef(stateType.name)
		this.stateFactory	= |->Obj?| { stateType.make }
	}

	** Creates a 'SynchronizedState' instance.
	**
	** The given (immutable) factory func is used to create the state object inside it's thread.
	new makeWithFactory(ActorPool actorPool, |->Obj?| stateFactory) {
		this.lock			= Synchronized(actorPool)
		this.stateRef		= LocalRef(SynchronizedState#.name)
		this.stateFactory	= stateFactory
	}

	** Calls the given func synchronously, passing in the State object and returning the func's
	** response.
	**
	** The given func should be immutable.
	Obj? sync(|Obj state -> Obj?| func) {
		iFunc := func.toImmutable
		return lock.synchronized |->Obj?| { callFunc(iFunc) }
	}

	** Calls the given func asynchronously, passing in the State object.
	**
	** The given func should be immutable.
	Future async(|Obj state -> Obj?| func) {
		iFunc := func.toImmutable
		return lock.async |->Obj?| { callFunc(iFunc) }
	}

	** Calls the given func asynchronously, passing in the State object.
	**
	** The given func should be immutable.
	Future asyncLater(Duration duration, |Obj state -> Obj?| func) {
		iFunc := func.toImmutable
		return lock.asyncLater(duration) |->Obj?| { callFunc(iFunc) }
	}

	** Routes trap() to the enclosed state object. Allows convenience calls for calling 'sync()'
	** and returning state:
	**
	** pre>
	** syntax: fantom
	** sync := SynchronizedState(ActorPool(), Buf#)
	**
	** size := sync->size  //--> returns size of Buf
	** <pre
	override Obj? trap(Str name, Obj?[]? args := null) {
		iargs := args?.toImmutable
		return sync |state->Obj?| {
			state.trap(name, iargs)
		}
	}

	private Obj? callFunc(|Obj?->Obj?| func) {
		if (stateRef.val == null)
			stateRef.val = stateFactory.call
		return func.call(stateRef.val)
	}

	** Returns a string representation the state.
	override Str toStr() {
		sync { it.toStr }
	}
}

