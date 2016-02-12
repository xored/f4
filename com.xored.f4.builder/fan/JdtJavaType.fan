using compilerJava
using compiler
using [java]org.eclipse.jdt.core::IType

class JdtJavaType : JavaType {
	
			IType				jdtType
	private JavaTypeRegistry	registry

	new make(JdtJavaPod pod, IType jdtType) : super.init(pod, jdtType.getTypeQualifiedName)	{
		this.jdtType = jdtType
		this.registry = pod.registry
	}
	
	override Void load() {
		if (loaded) return
		if (name.endsWith("HashMap")) {
			breakpoint := true
		}
		slots := Str:CSlot[:]
		registry.loadFromJdt(this, slots)
		this.slots = slots
		loaded = true
	}
}
