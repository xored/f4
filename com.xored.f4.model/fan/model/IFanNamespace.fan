
abstract class IFanNamespace {
	
	abstract IFanPod currPod()
	
	abstract Str[] podNames()
	
	abstract IFanPod? findPod(Str name)
	
	virtual IFanType? findType(Str name) { 
		if (name.isEmpty) return null
		if (name[-1] == '?') name = name[0..-2]

		result := null as IFanType 
		
		// special handling for Lists, Maps, and Funcs
		if (result == null)
			result = trySpecial(name)

		// look for a qualified name
		if (result == null) {
			pod := null as Str
			idx := name.index("::")
			if (idx != null) {
				pod  = name[0..<idx]
				name = name[idx+2..-1]
			}
		
			if (pod != null)
				// if a pod is named, don't look anywhere else
				result = findPod(pod)?.findType(name, false)
		}
		
		// try to resolve from usings
		if (result == null)
			result = tryResolve(name)

		// look inside the current pod
		if (result == null)
			result = currPod.findType(name, false)
		
		// the sys pod is always in scope, so lets explicitly look there next
		if (result == null)
			result = findPod("sys")?.findType(name, false)
		
		// finally, look everywhere else (all other pods) and grab the first matching type
		// code won't compile with this type, but returning it does let us play with autocomplete until we add the "using" statement
		if (result == null)
			result = podNames.eachWhile { findPod(it)?.findType(name, false) }

		return result
	} 

	virtual IFanType? tryResolve(Str name) { null }
	
	** Returns List or Map if applicable
	private IFanType? trySpecial(Str name) {
		
		if (name.endsWith("[]")) {
			bracesCount := 0
			isMap := false
			for (i := 0; i < name.size; i++) {
				if (isMap) break
				switch (name[i]) {
					case '[': bracesCount++
					case ']': bracesCount--
					case ':':
						if (bracesCount == 0) {
							// This is map because there is : not in brackets
							isMap = true
						}
				}
			}
			
			if (!isMap) {
				valueTypename := name[0..-3]
				valueType := findType(valueTypename)
				return findType("sys::List")?.parameterize(["sys::V" : valueType])
			}
		}

		if (TypeUtil.isMapType(name)) {
			Str cutName := name.startsWith("[") ? name[1..-2] : name
			bracesCount := 0
			for (i := 0; i < cutName.size; i++)	{
				switch (cutName[i])	{
					case '[': bracesCount++
					case ']': bracesCount--
					case ':':
					if (bracesCount == 0 && !TypeUtil.isQnamePos(cutName, i)) {
						keyTypename		:= cutName[0..i - 1]
						valueTypename	:= cutName[i + 1..-1]
						keyType			:= findType(keyTypename)
						valueType		:= findType(valueTypename)
						return findType("sys::Map")?.parameterize(["sys::K" : keyType, "sys::V" : valueType])
					}
				}
			}
			// exceptional case, only if name is incorrect
			return findType("sys::Map")
		}

		if (name.startsWith("|")) {
			func := findType("sys::Func")
			idx  := name.index("->")
			if (idx != null) {
				retType := findType(name[idx+2..<-1])
				if (retType != null)
					// there doesn't seem to be a need to parameterise the arguments too
					func = func.parameterize(["sys::R":retType])
			}
			return func
		}

		return null
	}
}