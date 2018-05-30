using concurrent

** Provides 'synchronized' access to blocks of code. Example usage:
** 
** pre>
** syntax: fantom
**  
** lock := Synchronized(ActorPool())
** 
** val := lock.synchronized |->Obj?| {
**     // ...
**     // important stuff
**     // ...
**     return 69
** }
** <pre
** 
** 
** IoC Injection
** *************
** The Concurrent library defines an IoC 'SynchronizedProvider' that injects 'Synchronized' instances directly into your class.
** To use, ensure the 'id' field is set to a contributed 'ActorPool': 
** 
** pre>
** syntax: fantom
** const class Example {
** 
**     @Inject { id="actorPoolId" } 
**     const Synchronized lock
** 
**     new make(|This|in) { in(this) }
** }
** <pre
internal const class Synchronized {
	private static const Log	log 	:= Synchronized#.pod.log
	
	** The 'Actor' used to process all sync and async calls.
	@NoDoc  const Actor 		actor
	private const LocalRef		insync	:= LocalRef("synchronized")

	** The default timeout to use when waiting for 'synchronized' blocks to complete.
	** 
	** The default timeout of 'null' blocks forever.
	const Duration? timeout

	** Determines if this synchronised lock is re-entrant or not.
	** Re-entrant locks allow multiple nested calls to 'synchronized()' (on *this* object) without 
	** fear of deadlocks.
	** 
	** Because re-entrant locks are often considered an indication of bad design, setting 
	** 'reentrant' to 'false' will disable nested calls to 'synchronized()', throwing an Err 
	** instead.
	** 
	** Defaults to 'true'.
	const Bool reentrant := true
	
	** Create a 'Synchronized' class from the given 'ActorPool' and timeout.
	** 
	** The default timeout of 'null' blocks forever.
	new make(ActorPool actorPool, Duration? timeout := null, |This|? f := null) {
		this.actor	 = Actor(actorPool, #receive.func.bind([this]))
		this.timeout = timeout
		f?.call(this)
	}

	** Runs the given func asynchronously, using this Synchronized's 'ActorPool'.
	** 
	** Errs that occur within the block are logged but not rethrown unless you call 'get()' on 
	** the returned 'Future'. 
	** 
	** The given func and return value must be immutable.
	virtual Future async(|->Obj?| f) {
		// explicit call to .toImmutable() - see http://fantom.org/sidewalk/topic/1798#c12190
		func	:= f.toImmutable
		future 	:= actor.send([true, func].toImmutable)
		return future	// sounds cool, huh!?
	}

	** Runs the given func asynchronously, after the given duration has elapsed.
	** 
	** Errs that occur within the block are logged but not rethrown unless you call 'get()' on 
	** the returned 'Future'. 
	** 
	** The given func and return value must be immutable.
	virtual Future asyncLater(Duration d, |->Obj?| f) {
		// explicit call to .toImmutable() - see http://fantom.org/sidewalk/topic/1798#c12190
		func	:= f.toImmutable
		future 	:= actor.sendLater(d, [true, func].toImmutable)
		return future	// sounds cool, huh!?
	}

	** This effectively wraps the given func in a Java 'synchronized { ... }' block and returns its
	** calculated value. 
	** 
	** The given func and return value must be immutable.
	virtual Obj? synchronized(|->Obj?| f) {
		if (reentrant && inSync)
			return f.call()

		if (inSync)
			throw Err("This lock is NOT re-entrant. Due to Actor semantics, nested calls to synchronized() result in a Deadlock.")

		// explicit call to .toImmutable() - see http://fantom.org/sidewalk/topic/1798#c12190
		func	:= f.toImmutable
		future	:= actor.send([false, func].toImmutable)

		try {
			return future.get(timeout)
		} catch (IOErr err) {
			throw err.msg.contains("Not serializable") ? IOErr("Synchronized return type ${f.returns.signature} is not immutable or serializable", err) : err
		}
	}

	** Returns 'true' if the current thread is running inside the synchronised Actor. E.g.:
	**   
	**   syntax: fantom
	**  
	**   lock := Synchronized(ActorPool())
	**   lock.inSync    // --> false
	** 
	**   lock.synchronized |->| {
	**     lock.inSync  // --> true
	**     ...
	**   }
	Bool inSync() {
		insync.val == true
	}
	
	private Obj? receive(Obj[] msg) {
		logErr	:= msg[0] as Bool
		func 	:= msg[1] as |->Obj?|

		insync.val = true
		try {
			return func.call()

		} catch (Err e) {
			// log the Err so the thread doesn't fail silently
			if (logErr)
				log.err("This Err is being logged to avoid it being swallowed as Errs thrown in async {...} blocks do not propagate to the calling thread.", e)
			throw e

		} finally {
			insync.cleanUp
		}
	}	
}
