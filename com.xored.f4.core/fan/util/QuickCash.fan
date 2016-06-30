using concurrent

** Caches a value for X amount of time.
** Factory funcs may be specified in ctor or overridden during get().
const class QuickCash {
	
	private const Duration?	timeout
	private const |->Obj|?	valueFunc
	private const AtomicRef	lastUpdatedRef	:= AtomicRef(null)
	private const AtomicRef	valueRef		:= AtomicRef(null)
	
	new make(Duration? timeout, |->Obj|? valFunc := null) {
		this.timeout 	= timeout
		this.valueFunc	= valFunc
	}

	@Operator
	Obj? get(|->Obj|? valFunc := null) {
		lastUpdated	:= lastUpdatedRef.val as Duration
		newValReq	:= timeout == null || lastUpdated == null || (Duration.now - lastUpdated) > timeout
		
		if (newValReq) {
			valueRef.val		= (valFunc ?: this.valueFunc)?.call
			lastUpdatedRef.val	= Duration.now
		}
		
		return valueRef.val
	}
}
