using concurrent

** Manages an Obj reference stored in 'Actor.locals' with a unique key.
const class LocalRef {	
	static 
	private const AtomicInt	counter	:= AtomicInt(0)
	
	private const |->Obj?|? defFunc
	
	** The qualified name this 'ThreadLocal' is stored under in 'Actor.locals'. 
	** 'qname' is calculated from 'name'.
	const Str qname
	
	** The variable name given to the ctor.
	const Str name

	** The object held in 'Actor.locals'. If a value is not mapped when read, 'initFunc()' is 
	** called to create a default object. 
	Obj? val {
		get {
			// don't set a local var if it's null!
			if (!isMapped && defFunc != null)
				Actor.locals[qname] = defFunc.call
			return Actor.locals[qname]
		}
		set { Actor.locals[qname] = it }
	}
	
	** Creates a 'LocalRef' with given name.
	** 
	** If not null, 'defFunc' is called to create a default object whenever 'val' is read and a 
	** value is not mapped in 'Actor.locals'. This object is then stored and returned. 
	** This allows the creation of non-const default objects in multiple threads.
	** 
	** 'initFunc' must be immutable.  
	new makeWithFunc(Str name, |->Obj?|? defFunc := null) {
		this.qname 		= createPrefix(name, 4)
		this.name 		= name
		this.defFunc	= defFunc
	}

	** Returns 'true' if 'Actor.locals' holds an entry for this 'qname'.
	Bool isMapped() {
		Actor.locals.containsKey(qname)
	}
	
	** Removes this object from 'Actor.locals'.
	Void cleanUp() {
		Actor.locals[qname] = null
		Actor.locals.remove(qname)
	}
	
	// ---- Helper Methods ------------------------------------------------------------------------
	
	private Str createPrefix(Str name, Int pad) {
		count 	:= counter.incrementAndGet
		padded	:= count.toStr.padl(pad)
		inter	:= name.contains("\${id}") ? name : "\${id}.${name}"
		prefix 	:= inter.replace("\${id}", padded)
		return prefix
	}
}
