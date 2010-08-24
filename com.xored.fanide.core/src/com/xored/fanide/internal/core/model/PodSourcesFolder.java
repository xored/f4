package com.xored.fanide.internal.core.model;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.IProjectFragment;
import org.eclipse.dltk.core.IScriptFolder;
import org.eclipse.dltk.core.ISourceModule;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.core.WorkingCopyOwner;
import org.eclipse.dltk.core.environment.EnvironmentPathUtils;
import org.eclipse.dltk.core.model.binary.ISourceMapperProvider;
import org.eclipse.dltk.core.model.binary.SourceMapper;
import org.eclipse.dltk.internal.core.DefaultWorkingCopyOwner;
import org.eclipse.dltk.internal.core.MementoModelElementUtil;
import org.eclipse.dltk.internal.core.ModelElement;
import org.eclipse.dltk.internal.core.ModelElementInfo;
import org.eclipse.dltk.internal.core.Openable;
import org.eclipse.dltk.internal.core.OpenableElementInfo;
import org.eclipse.dltk.internal.core.ScriptFolderInfo;
import org.eclipse.dltk.internal.core.util.MementoTokenizer;
import org.eclipse.dltk.utils.CorePrinter;

import fanx.fcode.FAttrs;
import fanx.fcode.FPod;
import fanx.fcode.FStore;
import fanx.fcode.FType;

/**
 * Element to represent sourced files.
 */
public class PodSourcesFolder extends Openable implements IScriptFolder,
		ISourceMapperProvider {
	private IPath name;

	public PodSourcesFolder(ModelElement parent, IPath name) {
		super(parent);
		this.name = name;
	}

	public String getElementName() {
		return name.toString();
	}

	protected Object createElementInfo() {
		return new PodSourcesElementInfo();
	}

	public int getElementType() {
		return SCRIPT_FOLDER;
	}

	public int getKind() throws ModelException {
		return IProjectFragment.K_BINARY;
	}

	public IResource getResource() {
		return null;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass())
			return false;
		if (!super.equals(obj))
			return false;
		PodSourcesFolder other = (PodSourcesFolder) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	protected boolean buildStructure(OpenableElementInfo info,
			IProgressMonitor pm, Map newElements, IResource underlyingResource)
			throws ModelException {

		PodFragment fragment = (PodFragment) getProjectFragment();
		FStore zipFile = null;
		PodSourcesElementInfo podInfo = (PodSourcesElementInfo) info;
		try {
			IPath podPath = EnvironmentPathUtils.getLocalPath(fragment
					.getPodPath());
			File file = podPath.toFile();
			if (!file.isFile()) {
				return false;
			}
			zipFile = FStore.makeZip(file);
			FPod pod = new FPod(PodUtils.toPodName(podPath), zipFile);
			List<IModelElement> vChildren = new ArrayList<IModelElement>();
			Map<String, List<String>> fileToTypes = new HashMap<String, List<String>>();
			if (pod != null) {
				pod.read();

				podInfo.setPodName(pod.podName);
				podInfo.setPodVersion(pod.podVersion);
				FType[] types = pod.types;
				for (FType fType : types) {
					// FTypeRef ref = pod.typeRef(fType.self);
					fType.read();
					FAttrs attrs = fType.attrs;
					String sourceFile = attrs.sourceFile;
					int pos = sourceFile.lastIndexOf('.');
					if (pos != -1) {
						sourceFile = sourceFile.substring(0, pos) + ".fcode";
					}
					List<String> list = fileToTypes.get(sourceFile);
					if (list == null) {
						list = new ArrayList<String>();
						fileToTypes.put(sourceFile, list);
					}
					list.add(fType.filename());
				}
			}
			for (Map.Entry<String, List<String>> entry : fileToTypes.entrySet()) {
				vChildren.add(new PodModule(this, entry.getKey(),
						DefaultWorkingCopyOwner.PRIMARY, entry.getValue()));
			}

			info.setChildren(vChildren.toArray(new IModelElement[vChildren
					.size()]));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (zipFile != null) {
				try {
					zipFile.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return true;
	}

	protected char getHandleMementoDelimiter() {
		return JEM_USER_ELEMENT;
	}

	public IModelElement getHandleFromMemento(String token,
			MementoTokenizer memento, WorkingCopyOwner owner) {
		switch (token.charAt(0)) {
		case JEM_SOURCEMODULE:
			if (!memento.hasMoreTokens())
				return this;
			String classFileName = memento.nextToken();
			ModelElement classFile = (ModelElement) getSourceModule(classFileName);
			if (classFile != null) {
				return classFile.getHandleFromMemento(memento, owner);
			}
		case JEM_USER_ELEMENT:
			return MementoModelElementUtil.getHandleFromMemento(memento, this,
					owner);
		}
		return null;
	}

	public boolean containsScriptResources() throws ModelException {
		Object elementInfo = getElementInfo();
		if (!(elementInfo instanceof ScriptFolderInfo))
			return false;
		ScriptFolderInfo scriptElementInfo = (ScriptFolderInfo) elementInfo;
		return scriptElementInfo.containsScriptResources();
	}

	public boolean hasChildren() throws ModelException {
		return getChildren().length > 0;
	}

	public void printNode(CorePrinter output) {
		output.formatPrint("Pod Folder:" + getElementName()); //$NON-NLS-1$
		output.indent();
		try {
			IModelElement modelElements[] = this.getChildren();
			for (int i = 0; i < modelElements.length; ++i) {
				IModelElement element = modelElements[i];
				if (element instanceof ModelElement) {
					((ModelElement) element).printNode(output);
				} else {
					output.print("Unknown element:" + element); //$NON-NLS-1$
				}
			}
		} catch (ModelException ex) {
			output.formatPrint(ex.getLocalizedMessage());
		}
		output.dedent();
	}

	public ISourceModule createSourceModule(String name, String contents,
			boolean force, IProgressMonitor monitor) throws ModelException {
		return null;
	}

	public Object[] getForeignResources() throws ModelException {
		return ModelElementInfo.NO_NON_SCRIPT_RESOURCES;
	}

	public boolean exists() {
		return true;
	}

	public ISourceModule[] getSourceModules() throws ModelException {
		List<IModelElement> list = getChildrenOfType(SOURCE_MODULE);
		ISourceModule[] array = new ISourceModule[list.size()];
		list.toArray(array);
		return array;
	}

	public boolean hasSubfolders() throws ModelException {
		return false;
	}

	public boolean isRootFolder() {
		return name.segmentCount() == 0;
	}

	public IPath getPath() {
		return getParent().getPath().append(getElementName());
	}

	public void copy(IModelElement container, IModelElement sibling,
			String rename, boolean replace, IProgressMonitor monitor)
			throws ModelException {
	}

	public void delete(boolean force, IProgressMonitor monitor)
			throws ModelException {
	}

	public void move(IModelElement container, IModelElement sibling,
			String rename, boolean replace, IProgressMonitor monitor)
			throws ModelException {
	}

	public void rename(String name, boolean replace, IProgressMonitor monitor)
			throws ModelException {
	}

	public ISourceModule getSourceModule(String name) {
		IModelElement[] children = null;
		try {
			children = getChildren();
			for (int i = 0; i < children.length; i++) {
				IModelElement child = children[i];
				if (child instanceof ISourceModule) {
					if (name.equals(child.getElementName())) {
						return (ISourceModule) child;
					}
				}
			}
		} catch (ModelException e) {
			if (DLTKCore.DEBUG) {
				e.printStackTrace();
			}
		}
		return null;
	}

	@Override
	public boolean isReadOnly() {
		return true;
	}

	public SourceMapper getSourceMapper() {
		IModelElement parent = getParent();
		if (parent instanceof ISourceMapperProvider) {
			return ((ISourceMapperProvider) parent).getSourceMapper();
		}
		return null;
	}

	public String getPodName() throws ModelException {
		return ((PodSourcesElementInfo) getElementInfo()).getPodName();
	}

	public String getPodVersion() throws ModelException {
		return ((PodSourcesElementInfo) getElementInfo()).getPodVersion();
	}
}
