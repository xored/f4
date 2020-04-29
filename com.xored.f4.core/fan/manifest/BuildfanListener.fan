//using [java]org.eclipse.core.resources::IResourceChangeListener
//using [java]org.eclipse.core.resources::IResourceDeltaVisitor
//using [java]org.eclipse.core.resources::IResourceChangeEvent
//using [java]org.eclipse.core.resources::IResourceDelta
//using [java]org.eclipse.core.resources::IProject
//using [java]org.eclipse.core.resources::IResource
//using [java]org.eclipse.dltk.core::DLTKCore
//using [java]org.eclipse.jdt.core::IJavaProject
//using concurrent
//
//const class BuildfanListener : Actor, IResourceChangeListener {
//	//////////////////////////////////////////////////////////////////////////
//	// Interface methods
//	//////////////////////////////////////////////////////////////////////////
//	override Void resourceChanged(IResourceChangeEvent? event) { 
//		if(event.getType == IResourceChangeEvent.POST_CHANGE) {
//			visitor := DeltaVisitor()
//			event.getDelta.accept(visitor)
//			if(visitor.change.isEmpty) return
//			notifyListeners(visitor.change)
//		}
//	} 
//	
//	//////////////////////////////////////////////////////////////////////////
//	// Constructor and overriden methods
//	//////////////////////////////////////////////////////////////////////////
//	new make(ActorPool pool := ActorPool()) : super(pool) {}
//	
//	override Obj? receive(Obj? msg) {
//		try
//		{
//			if(msg isnot Obj[]) return null
//			list := msg as Obj[]
//			if(list.first isnot Method) return null
//			method := list.first as Method
//			Obj?[] args := list[1..-1] 
//			if(list.size == 2 && list.last is Unsafe)
//				args = list.last->val
//			return method.callOn(this, args)
//		} catch (Err e) {
//			e.trace //TODO: add normal error reporting
//			throw e
//		}
//	}
//	
//	//////////////////////////////////////////////////////////////////////////
//	// Public API
//	//////////////////////////////////////////////////////////////////////////
//	
//	Void addListener(BuildfanChangeListener listener) {
//		send([#doAddListener, listener].toImmutable)
//	}
//	
//	Void removeListener(BuildfanChangeListener listener) {
//		send([#doRemoveListener, listener].toImmutable)
//	}
//	
//	Void subscribe() {
//		DLTKCore.addPreProcessingResourceChangedListener(this, IResourceChangeEvent.POST_CHANGE)
//	}
//	
//	//////////////////////////////////////////////////////////////////////////
//	// Helper methods
//	//////////////////////////////////////////////////////////////////////////
//	
//	private Void notifyListeners(WorkspaceChange change) {
//		send([#doNotify, Unsafe([change])].toImmutable)
//	}
//	
//	private Void doNotify(WorkspaceChange change) {
//		listeners.each { notify(change) }
//	}
//	
//	private Void doAddListener(BuildfanChangeListener listener) {
//		listeners.add(listener)
//	}
//	
//	private Void doRemoveListener(BuildfanChangeListener listener) {
//		listeners.remove(listener)
//	}
// 
//	//////////////////////////////////////////////////////////////////////////
//	// Actor.locals properties
//	//////////////////////////////////////////////////////////////////////////
//	
//	BuildfanChangeListener[] listeners() {
//		locals.getOrAdd("listeners") |->Obj| { BuildfanChangeListener[,] }
//	}
//}
//
//**************************************************************************
//** DeltaVisitor
//**************************************************************************
//
//** Visits resource delta and collects changes
//class DeltaVisitor : IResourceDeltaVisitor {
//	WorkspaceChange change := WorkspaceChange()
//	
//	override Bool visit(IResourceDelta? delta) {
//		resource := delta.getResource
//		switch(resource.getType) {
//			case IResource.PROJECT:
//				IProject project := resource
//
//				if(!project.exists || projectClosed(delta, project)) {
//					change.closedProjects.add(project)
//					return false
//				}
//			
//				if(projectOpened(delta, project)) {
//					change.openedProjects.add(project)
//					return false
//				}
//			
//				return true
//			case IResource.FOLDER:
//				return false
//			case IResource.FILE:
//				if((resource.getName == Manifest.filename || resource.getName == IJavaProject.CLASSPATH_FILE_NAME) 
//					&& contentChanged(delta))
//					change.updatedProjects.add(resource.getProject)
//				return false
//			default: return true
//		}
//	}
//	
//	private static Bool contentChanged(IResourceDelta delta) {
//		switch(delta.getKind) {
//			case IResourceDelta.CHANGED:
//				return delta.getFlags.and(IResourceDelta.CONTENT) != 0
//			default: return true
//		}
//	}
//
//	private static Bool projectClosed(IResourceDelta delta, IProject project) { openChange(delta) && !project.isOpen }
//	private static Bool projectOpened(IResourceDelta delta, IProject project) { openChange(delta) && project.isOpen }
//	private static Bool openChange(IResourceDelta delta) { delta.getFlags.and(IResourceDelta.OPEN) != 0 }
//}
//
//class WorkspaceChange {
//	IProject[] closedProjects := IProject[,]
//	IProject[] openedProjects := IProject[,]
//	IProject[] updatedProjects := IProject[,]
//	
//	Bool isEmpty() { [closedProjects, openedProjects, updatedProjects].all { it.isEmpty } }
//}
//
//**************************************************************************
//** BuildfanChangeListener
//**************************************************************************
//
//** Base mixin for all listeners of buildfan changes
//const mixin BuildfanChangeListener {
//	abstract Void notify(WorkspaceChange change)
//}
//
