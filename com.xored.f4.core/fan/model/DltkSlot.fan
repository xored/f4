using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.core::IMember
using [java] org.eclipse.dltk.core::IField
using [java] org.eclipse.dltk.core::IMethod
using [java] org.eclipse.dltk.core::IParameter
using f4model

abstract const class DltkSlot : IFanSlot, Flags {
	override const Int flags
	override const Str name
	override const Str parent
	override const Str qname
	
	override const IFanType type
	private const Unsafe meHolder
	override IModelElement? me() { meHolder.val }
	
	new make(DltkType type, IMember slot) {
		this.type = type
		this.flags = slot.getFlags
		this.name = slot.getElementName
		this.parent = type.qname
		this.qname = "${parent}.$name"
		this.meHolder = Unsafe(slot)
	}
}

internal const class DltkField : DltkSlot, IFanField {
	private const Str declaredType

	new make(DltkType type, IField field) : super(type, field) {
		this.declaredType = field.getType
	}

	override Str of() { (type as DltkType).evaluateType(declaredType) }
}

const class DltkMethod : DltkSlot, IFanMethod {
	private const Str declaredReturnType
	override const IFanParam[] params
	
	new make(DltkType type, IMethod method) : super(type, method) {
		this.declaredReturnType = method.getType ?: ""
		this.params = method.getParameters.map { DltkParam(this, it) }
	}

	override Str of() { (type as DltkType).evaluateType(declaredReturnType) }
}

internal const class DltkParam : IFanParam {
	private const DltkMethod method
	private const Str declaredType
	override const Bool hasDefault
	override const Str name

	new make(DltkMethod method, IParameter param) {
		this.method = method

		hasDefault = param.getDefaultValue != null
		name = param.getName
		declaredType = param.getType ?: ""
	}

	override Str of() { (method.type as DltkType).evaluateType(declaredType) }
}
