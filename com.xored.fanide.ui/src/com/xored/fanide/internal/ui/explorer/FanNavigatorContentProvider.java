/**
 * 
 */
package com.xored.fanide.internal.ui.explorer;

import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.IScriptModel;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.internal.ui.navigator.ScriptExplorerContentProvider;
import org.eclipse.dltk.internal.ui.navigator.IExtensionStateConstants.Values;
import org.eclipse.dltk.ui.DLTKUIPlugin;
import org.eclipse.dltk.ui.PreferenceConstants;
import org.eclipse.jface.util.IPropertyChangeListener;
import org.eclipse.jface.util.PropertyChangeEvent;
import org.eclipse.jface.viewers.Viewer;
import org.eclipse.ui.IMemento;
import org.eclipse.ui.navigator.ICommonContentExtensionSite;
import org.eclipse.ui.navigator.IExtensionStateModel;
import org.eclipse.ui.navigator.IPipelinedTreeContentProvider;
import org.eclipse.ui.navigator.PipelinedShapeModification;
import org.eclipse.ui.navigator.PipelinedViewerUpdate;

@SuppressWarnings("restriction")
public class FanNavigatorContentProvider extends ScriptExplorerContentProvider
		implements IPipelinedTreeContentProvider {

	public FanNavigatorContentProvider() {
		super(false);
	}

	public FanNavigatorContentProvider(boolean provideMembers) {
		super(provideMembers);
	}

	//public static final String JDT_EXTENSION_ID = "org.eclipse.jdt.ui.javaContent"; //$NON-NLS-1$

	private IExtensionStateModel fStateModel;

	private IPropertyChangeListener fLayoutPropertyListener;

	public void init(ICommonContentExtensionSite commonContentExtensionSite) {
		IExtensionStateModel stateModel = commonContentExtensionSite
				.getExtensionStateModel();
		IMemento memento = commonContentExtensionSite.getMemento();

		fStateModel = stateModel;
		restoreState(memento);
		fLayoutPropertyListener = new IPropertyChangeListener() {
			public void propertyChange(PropertyChangeEvent event) {
				if (Values.IS_LAYOUT_FLAT.equals(event.getProperty())) {
					if (event.getNewValue() != null) {
						boolean newValue = ((Boolean) event.getNewValue())
								.booleanValue() ? true : false;
						setIsFlatLayout(newValue);
					}
				}

			}
		};
		fStateModel.addPropertyChangeListener(fLayoutPropertyListener);

		setProvideMembers(DLTKUIPlugin.getDefault().getPreferenceStore()
				.getBoolean(PreferenceConstants.SHOW_SOURCE_MODULE_CHILDREN));
	}

	@Override
	public void dispose() {
		super.dispose();
		fStateModel.removePropertyChangeListener(fLayoutPropertyListener);
	}

	@Override
	public void inputChanged(Viewer viewer, Object oldInput, Object newInput) {
		super.inputChanged(viewer, oldInput, findInputElement(newInput));
	}

	@Override
	public Object getParent(Object element) {
		Object parent = super.getParent(element);
		if (parent instanceof IScriptModel) {
			return ((IScriptModel) parent).getWorkspace().getRoot();
		}
		if (parent instanceof IScriptProject) {
			return ((IScriptProject) parent).getProject();
		}
		return parent;
	}

	@Override
	public Object[] getElements(Object inputElement) {
		if (inputElement instanceof IWorkspaceRoot) {
			IWorkspaceRoot root = (IWorkspaceRoot) inputElement;
			return root.getProjects();
		} else if (inputElement instanceof IScriptModel) {
			return ((IScriptModel) inputElement).getWorkspace().getRoot()
					.getProjects();
		}
		if (inputElement instanceof IProject) {
			return super.getElements(DLTKCore.create((IProject) inputElement));
		}
		return super.getElements(inputElement);
	}

	@Override
	public boolean hasChildren(Object element) {
		if (element instanceof IProject) {
			return ((IProject) element).isAccessible();
		}
		return super.hasChildren(element);
	}

	@Override
	public Object[] getChildren(Object parentElement) {
		if (parentElement instanceof IWorkspaceRoot) {
			IWorkspaceRoot root = (IWorkspaceRoot) parentElement;
			return root.getProjects();
		}
		if (parentElement instanceof IProject) {
			IScriptProject project = DLTKCore.create((IProject) parentElement);
			return project.isValid() ? super.getChildren(project)
					: new Object[0];
		}
		return super.getChildren(parentElement);
	}

	private Object findInputElement(Object newInput) {
		if (newInput instanceof IWorkspaceRoot) {
			return DLTKCore.create((IWorkspaceRoot) newInput);
		}
		return newInput;
	}

	public void restoreState(IMemento memento) {

	}

	public void saveState(IMemento memento) {

	}

	public void getPipelinedChildren(Object parent, Set currentChildren) {
		customize(getChildren(parent), currentChildren);
	}

	public void getPipelinedElements(Object input, Set currentElements) {
		customize(getElements(input), currentElements);
	}

	public Object getPipelinedParent(Object object, Object suggestedParent) {
		return getParent(object);
	}

	public PipelinedShapeModification interceptAdd(
			PipelinedShapeModification addModification) {

		Object parent = addModification.getParent();

		if (parent instanceof IScriptProject) {
			addModification.setParent(((IScriptProject) parent).getProject());
		}

		if (parent instanceof IWorkspaceRoot) {
			deconvertScriptProjects(addModification);
		}

		convertToScriptElements(addModification);
		return addModification;
	}

	public PipelinedShapeModification interceptRemove(
			PipelinedShapeModification removeModification) {
		deconvertScriptProjects(removeModification);
		convertToScriptElements(removeModification.getChildren());
		return removeModification;
	}

	private void deconvertScriptProjects(PipelinedShapeModification modification) {
		Set convertedChildren = new LinkedHashSet();
		for (Iterator iterator = modification.getChildren().iterator(); iterator
				.hasNext();) {
			Object added = iterator.next();
			if (added instanceof IScriptProject) {
				iterator.remove();
				convertedChildren.add(((IScriptProject) added).getProject());
			}
		}
		modification.getChildren().addAll(convertedChildren);
	}

	/**
	 * Converts the shape modification to use Java elements.
	 * 
	 * 
	 * @param modification
	 *            the shape modification to convert
	 * @return returns true if the conversion took place
	 */
	private boolean convertToScriptElements(
			PipelinedShapeModification modification) {
		Object parent = modification.getParent();
		// As of 3.3, we no longer re-parent additions to IProject.
		if (parent instanceof IContainer) {

			IModelElement element = DLTKCore.create((IContainer) parent);
			if (element != null && element.exists()) {
				// we don't convert the root
				if (!(element instanceof IScriptModel)
						&& !(element instanceof IScriptProject))
					modification.setParent(element);
				return convertToScriptElements(modification.getChildren());

			}
		}
		return false;
	}

	/**
	 * Converts the shape modification to use Java elements.
	 * 
	 * 
	 * @param currentChildren
	 *            The set of current children that would be contributed or
	 *            refreshed in the viewer.
	 * @return returns true if the conversion took place
	 */
	private boolean convertToScriptElements(Set currentChildren) {

		LinkedHashSet convertedChildren = new LinkedHashSet();
		IModelElement newChild;
		for (Iterator childrenItr = currentChildren.iterator(); childrenItr
				.hasNext();) {
			Object child = childrenItr.next();
			// only convert IFolders and IFiles
			if (child instanceof IFolder || child instanceof IFile) {
				if ((newChild = DLTKCore.create((IResource) child)) != null
						&& newChild.exists()) {
					childrenItr.remove();
					convertedChildren.add(newChild);
				}
			} else if (child instanceof IScriptProject) {
				childrenItr.remove();
				convertedChildren.add(((IScriptProject) child).getProject());
			} else if (!(child instanceof IResource)) {
				childrenItr.remove();
			}
		}
		if (!convertedChildren.isEmpty()) {
			currentChildren.addAll(convertedChildren);
			return true;
		}
		return false;

	}

	/**
	 * Adapted from the Common Navigator Content Provider
	 * 
	 * @param javaElements
	 *            the java elements
	 * @param proposedChildren
	 *            the proposed children
	 */
	private void customize(Object[] javaElements, Set proposedChildren) {
		List elementList = Arrays.asList(javaElements);
		for (Iterator iter = proposedChildren.iterator(); iter.hasNext();) {
			Object element = iter.next();
			IResource resource = null;
			if (element instanceof IResource) {
				resource = (IResource) element;
			} else if (element instanceof IAdaptable) {
				resource = (IResource) ((IAdaptable) element)
						.getAdapter(IResource.class);
			}
			if (resource != null) {
				int i = elementList.indexOf(resource);
				if (i >= 0) {
					javaElements[i] = null;
				}
			}
		}
		for (int i = 0; i < javaElements.length; i++) {
			Object element = javaElements[i];
			if (element instanceof IModelElement) {
				IModelElement cElement = (IModelElement) element;
				IResource resource = cElement.getResource();
				if (resource != null) {
					proposedChildren.remove(resource);
				}
				proposedChildren.add(element);
			} else if (element != null) {
				proposedChildren.add(element);
			}
		}
	}

	public boolean interceptRefresh(PipelinedViewerUpdate refreshSynchronization) {
		return convertToScriptElements(refreshSynchronization
				.getRefreshTargets());

	}

	public boolean interceptUpdate(PipelinedViewerUpdate updateSynchronization) {
		return convertToScriptElements(updateSynchronization
				.getRefreshTargets());
	}

	@Override
	protected void postAdd(final Object parent, final Object element,
			Collection runnables) {
		if (parent instanceof IScriptModel)
			super.postAdd(((IScriptModel) parent).getWorkspace().getRoot(),
					element, runnables);
		else if (parent instanceof IScriptProject)
			super.postAdd(((IScriptProject) parent).getProject(), element,
					runnables);
		else
			super.postAdd(parent, element, runnables);
	}

	@Override
	protected void postRefresh(final List toRefresh,
			final boolean updateLabels, Collection runnables) {
		for (Iterator iter = toRefresh.iterator(); iter.hasNext();) {
			Object element = iter.next();
			if (element instanceof IScriptModel) {
				iter.remove();
				toRefresh
						.add(((IScriptModel) element).getWorkspace().getRoot());
				super.postRefresh(toRefresh, updateLabels, runnables);
				return;
			}
		}
		super.postRefresh(toRefresh, updateLabels, runnables);
	}
}
