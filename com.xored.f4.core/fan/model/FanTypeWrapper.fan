using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.core.resources::IResource
using [java] java.io::InputStream
using "[java]org.eclipse.dltk.internal.core"::SourceModule
using "[java]org.eclipse.dltk.internal.core"::DefaultWorkingCopyOwner
using "[java]org.eclipse.dltk.internal.core"::ModelElement
using "[java]org.eclipse.dltk.internal.core"::SourceType
using [java] org.eclipse.dltk.core
using [java] com.xored.f4.core::ITypeWrapper
using f4model

class FanTypeWrapper : ITypeWrapper {
	IFanType type
	IScriptProject project
	ISourceModule module
	Str? asTypeName
	
	new make (IFanType type, Str? asName, IScriptProject proj, ISourceModule module) : super(type.name) {
		this.type = type
		this.project = proj
		element := (type is DltkType) ? type.me : type
		this.module = module //SourceModule(element as IModelElement, type.name, DefaultWorkingCopyOwner.PRIMARY)
		this.asTypeName = asName
	}
	
	public Str? getAsTypeName(){ asTypeName }
	
	override Str?[]? getSuperClasses() { type.inheritance }
	
	override Str? getElementName() { type.name }
	
	override IScriptProject? getScriptProject() { project }
	
	override IModelElement? getParent() { project }
	
	override ISourceModule? getSourceModule() { module }
	
	override IType? getDeclaringType() { this }
	
	override Int getFlags() { 
		if (type is FfiType)
			return ((FfiType)type).getFlags
		else 
			return ((DltkType)type).getFlags
		return 0
	}
}
