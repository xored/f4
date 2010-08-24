package com.xored.fanide.internal.core.model;

import static com.xored.fanide.core.FanCore.POD_EXTENSION;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;

import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.dltk.compiler.util.Util;
import org.eclipse.dltk.core.DLTKLanguageManager;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.ISourceElementParser;
import org.eclipse.dltk.core.ISourceRange;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.core.model.binary.IBinaryModule;
import org.eclipse.dltk.core.model.binary.SourceMapper;
import org.eclipse.dltk.internal.core.ModelElementInfo;

import com.xored.fanide.core.FanCore;

public class FanSourceMapper extends SourceMapper {

	public FanSourceMapper(IPath sourcePath, IPath sourceAttachmentRootPath) {
		super(sourcePath, sourceAttachmentRootPath);
	}

	@Override
	protected boolean isFileMatch(File child, String filename) {
		String name = child.getName();
		String lookingForName = getFanName(filename);
		if (name.equalsIgnoreCase(lookingForName)) {
			return true;
		}
		return super.isFileMatch(child, filename);
	}

	private String getFanName(String filename) {
		String lookingForName = filename;
		if (lookingForName.endsWith(".fcode")) {
			lookingForName = lookingForName.substring(0, lookingForName
					.length() - 6);
			lookingForName += ".fan";
		}
		return lookingForName;
	}

	@Override
	public boolean isArchive(File file) {
		IPath path = new Path(file.toString());
		String extension = path.getFileExtension();
		if (file.isFile() && extension != null
				&& extension.equalsIgnoreCase(POD_EXTENSION)) {
			// This is pod
			return true;
		}
		return super.isArchive(file);
	}

	@Override
	protected String findSourceInArchive(File file, String filename) {
		ZipFile zipFile = null;
		String lookingForName = getFanName(filename);
		try {
			zipFile = new ZipFile(file);
			Enumeration<? extends ZipEntry> entries = zipFile.entries();
			while (entries.hasMoreElements()) {
				ZipEntry entry = entries.nextElement();
				String name = entry.getName();
				IPath entryPath = new Path(name);
				if (entryPath.segmentCount() > 1) {
					if (entryPath.segment(0).equalsIgnoreCase("src")
							&& entryPath.lastSegment().equalsIgnoreCase(
									lookingForName)) {
						InputStream stream = zipFile.getInputStream(entry);
						byte[] array = Util.getInputStreamAsByteArray(stream,
								-1);
						stream.close();
						return new String(array);
					}
				}
			}
		} catch (ZipException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (zipFile != null) {
				try {
					zipFile.close();
				} catch (IOException e) {
					FanCore.log(e);
				}
			}
		}
		return super.findSourceInArchive(file, filename);
	}

	// Contain set of already processed modules
	private Set<IBinaryModule> fetchedModules = new HashSet<IBinaryModule>();

	@Override
	protected void fetchRangesForElement(IModelElement element) {
		// Fetch and correct source ranges for elements.
		IModelElement module = element.getAncestor(IModelElement.SOURCE_MODULE);
		if (!(module instanceof IBinaryModule)) {
			return;
		}
		IBinaryModule binaryModule = (IBinaryModule) module;
		if (!fetchedModules.add(binaryModule)) {
			return;
		}
		try {
			binaryModule.getChildren(); // Check what binary module childrens
			// are filled in.
		} catch (ModelException e) {
			FanCore.log(e);
		}
		String source = getSource(binaryModule);
		if (source != null) {
			ISourceElementParser sourceElementParser = DLTKLanguageManager
					.getSourceElementParser(element);
			if (sourceElementParser != null) {
				sourceElementParser.setReporter(null);
				Map<IModelElement, ModelElementInfo> newElements = new HashMap<IModelElement, ModelElementInfo>();
				SourceAsBinaryElementRequestor requestor = new SourceAsBinaryElementRequestor(
						binaryModule, null, this, newElements);
				sourceElementParser.setRequestor(requestor);
				sourceElementParser
						.parseSourceModule((org.eclipse.dltk.compiler.env.ISourceModule) binaryModule);
			}
			this.setRangeEnd(binaryModule, source.length());
		}
	}

	@Override
	public ISourceRange getSourceRange(IModelElement element) {
		ISourceRange sourceRange = super.getSourceRange(element);
		// if (element.getElementType() >= IModelElement.TYPE) {
		// if (sourceRange.getOffset() == -1) {
		// return getSourceRange(element.getParent());
		// }
		// }
		return sourceRange;
	}

	@Override
	public ISourceRange getNameRange(IModelElement element) {
		ISourceRange sourceRange = super.getNameRange(element);
		// if (element.getElementType() >= IModelElement.TYPE) {
		// if (sourceRange.getOffset() == -1) {
		// return getNameRange(element.getParent());
		// }
		// }
		return sourceRange;
	}
}
