package com.xored.fanide.internal.core.model;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;

import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.IBuildpathEntry;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.IProjectFragment;
import org.eclipse.dltk.core.IProjectFragmentTimestamp;
import org.eclipse.dltk.core.IScriptFolder;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.core.WorkingCopyOwner;
import org.eclipse.dltk.core.environment.EnvironmentPathUtils;
import org.eclipse.dltk.core.model.binary.ISourceMapperProvider;
import org.eclipse.dltk.core.model.binary.SourceMapper;
import org.eclipse.dltk.internal.core.MementoModelElementUtil;
import org.eclipse.dltk.internal.core.ModelElement;
import org.eclipse.dltk.internal.core.Openable;
import org.eclipse.dltk.internal.core.OpenableElementInfo;
import org.eclipse.dltk.internal.core.ScriptProject;
import org.eclipse.dltk.internal.core.util.MementoTokenizer;
import org.eclipse.dltk.utils.CorePrinter;

import com.xored.fanide.core.FanCore;

public class PodFragment extends Openable implements IProjectFragment,
		IProjectFragmentTimestamp, ISourceMapperProvider {
	private IPath path;
	private IBuildpathEntry buildpathEntry;

	public PodFragment(ScriptProject project, IBuildpathEntry rentry) {
		super(project);
		this.path = rentry.getPath();
		this.buildpathEntry = rentry;
	}

	@Override
	public String getElementName() {
		return "Pod@" + path.lastSegment();
	}

	@Override
	public int hashCode() {
		return path.hashCode();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof PodFragment))
			return false;

		final PodFragment other = (PodFragment) o;
		return this.path.equals(other.path);
	}

	@Override
	protected boolean buildStructure(OpenableElementInfo info,
			IProgressMonitor pm, Map newElements, IResource underlyingResource)
			throws ModelException {

		List<IModelElement> children = new ArrayList<IModelElement>();

		boolean hasPodEntries = false;
		final File podFile = getPodPath().toFile();
		ZipFile zipFile = null;
		Set<String> ignoreExtensions = new HashSet<String>();
		ignoreExtensions.add("fcode");
		ignoreExtensions.add("def");
		ignoreExtensions.add("fan"); // Ignore source attachments
		ignoreExtensions.add("class"); // Ignore class files, because they
		// could not be opened from here.
		Map<IPath, List<PodEntryFile>> otherEntries = new HashMap<IPath, List<PodEntryFile>>();
		if (podFile.exists()) {
			try {
				zipFile = new ZipFile(podFile);
				for (Enumeration<? extends ZipEntry> entries = zipFile
						.entries(); entries.hasMoreElements();) {
					ZipEntry entry = entries.nextElement();
					String name = entry.getName();
					IPath entryPath = new Path(name);
					if (name.equalsIgnoreCase("meta.props")) {
						hasPodEntries = true;
					}
					if (!ignoreExtensions
							.contains(entryPath.getFileExtension())) {
						// We found some other file.
						IPath root = entryPath.removeLastSegments(1);
						List<PodEntryFile> files = getFolderList(otherEntries,
								root);
						files.add(new PodEntryFile(entryPath.lastSegment(),
								root, this));
					}
				}
			} catch (ZipException e) {
				FanCore.log(e);
			} catch (IOException e) {
				FanCore.log(e);
			} finally {
				if (zipFile != null) {
					try {
						zipFile.close();
					} catch (IOException e) {
						FanCore.log(e);
					}
				}
			}
		}
		if (hasPodEntries) {
			children.add(new PodSourcesFolder(this, Path.EMPTY));
		}
		if (!otherEntries.isEmpty()) {
			Set<Entry<IPath, List<PodEntryFile>>> entrySet = otherEntries
					.entrySet();
			for (Entry<IPath, List<PodEntryFile>> entry : entrySet) {
				IPath root = entry.getKey();
				List<PodEntryFile> list = entry.getValue();
				PodFolder folder = new PodFolder(this, root, true);
				folder.setForeignResources(list);
				children.add(folder);
			}
		}

		info.setChildren(children.toArray(new IModelElement[children.size()]));

		IPath sourcePath = buildpathEntry.getSourceAttachmentPath();
		if (sourcePath != null) {
			FanSourceMapper sourceMapper = new FanSourceMapper(sourcePath,
					buildpathEntry.getSourceAttachmentRootPath());
			((PodFragmentElementInfo) info).setSourceMapper(sourceMapper);
		}
		return true;
	}

	private List<PodEntryFile> getFolderList(
			Map<IPath, List<PodEntryFile>> otherEntries, IPath root) {
		List<PodEntryFile> files = otherEntries.get(root);
		if (files == null) {
			files = new ArrayList<PodEntryFile>();
			otherEntries.put(root, files);
		}
		if (root.segmentCount() > 1) {
			getFolderList(otherEntries, root.removeLastSegments(1));
		}
		return files;
	}

	@Override
	public Object createElementInfo() {
		return new PodFragmentElementInfo();
	}

	@Override
	public IModelElement getHandleFromMemento(String token,
			MementoTokenizer memento, WorkingCopyOwner owner) {
		switch (token.charAt(0)) {
		case JEM_SCRIPTFOLDER:
			if (!memento.hasMoreTokens())
				return this;
			String classFileName = memento.nextToken();
			ModelElement classFile = (ModelElement) getScriptFolder(classFileName);
			return classFile.getHandleFromMemento(memento, owner);
		case JEM_USER_ELEMENT:
			return MementoModelElementUtil.getHandleFromMemento(memento, this,
					owner);
		}
		return !memento.hasMoreTokens() ? this : null;
	}

	@Override
	protected char getHandleMementoDelimiter() {
		return JEM_USER_ELEMENT;
	}

	@Override
	public void printNode(CorePrinter output) {
	}

	public void copy(IPath destination, int updateResourceFlags,
			int updateModelFlags, IBuildpathEntry sibling,
			IProgressMonitor monitor) throws ModelException {
	}

	public IScriptFolder createScriptFolder(String name, boolean force,
			IProgressMonitor monitor) throws ModelException {
		return null;
	}

	public void delete(int updateResourceFlags, int updateModelFlags,
			IProgressMonitor monitor) throws ModelException {
	}

	public Object[] getForeignResources() throws ModelException {
		return new Object[0];
	}

	public int getKind() throws ModelException {
		return IProjectFragment.K_BINARY;
	}

	public IBuildpathEntry getRawBuildpathEntry() throws ModelException {
		// getScriptProject().getRawBuildpath()[3].getPath()
		// return DLTKCore.newSpecialEntry(getPath(), false, true);
		return null;
	}

	public IScriptFolder getScriptFolder(IPath path) {
		if (path.segmentCount() == 0) {
			return getScriptFolder("");
		}
		return getScriptFolder(path.toString());
	}

	public IScriptFolder getScriptFolder(String name) {
		try {
			IModelElement[] elements = getChildren();
			for (int i = 0; i < elements.length; i++) {
				if (elements[i].getElementName().equals(name)) {
					return (IScriptFolder) elements[i];
				}
			}
		} catch (ModelException e) {
			if (DLTKCore.DEBUG) {
				e.printStackTrace();
			}
		}
		return new PodFolder(this, new Path(name), false);
	}

	public boolean isArchive() {
		return false;
	}

	public boolean isBuiltin() {
		return false;
	}

	@Override
	public boolean exists() {
		return true;
	}

	public boolean isExternal() {
		return true;
	}

	public void move(IPath destination, int updateResourceFlags,
			int updateModelFlags, IBuildpathEntry sibling,
			IProgressMonitor monitor) throws ModelException {
	}

	public int getElementType() {
		return IModelElement.PROJECT_FRAGMENT;
	}

	public IPath getPath() {
		return path;
	}

	/**
	 * Return local path to this pod
	 * 
	 * @return
	 */
	public IPath getPodPath() {
		return EnvironmentPathUtils.getLocalPath(path);
	}

	public IResource getResource() {
		return null;
	}

	public long getTimeStamp() {
		// Check for package still pressent here or not.
		File file = getPodPath().toFile();
		return file.lastModified();
	}

	public boolean isBinary() {
		return true;
	}

	public SourceMapper getSourceMapper() {
		try {
			return ((PodFragmentElementInfo) getElementInfo())
					.getSourceMapper();
		} catch (ModelException e) {
			FanCore.log(e);
		}
		return null;
	}

	public void setSourceMapper(SourceMapper sourceMapper) {
		try {
			((PodFragmentElementInfo) getElementInfo())
					.setSourceMapper(sourceMapper);
		} catch (ModelException e) {
			FanCore.log(e);
		}
	}

	public PodSourcesFolder getPodSourceFolder() {
		try {
			IModelElement[] children = this.getChildren();
			for (IModelElement e : children) {
				if (e instanceof PodSourcesFolder) {
					return (PodSourcesFolder) e;
				}
			}
		} catch (ModelException e) {
			FanCore.log(e);
		}
		return null;
	}
}