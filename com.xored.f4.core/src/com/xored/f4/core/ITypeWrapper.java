/**
 * 
 */
package com.xored.f4.core;

import java.io.InputStream;

import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.dltk.core.CompletionRequestor;
import org.eclipse.dltk.core.IField;
import org.eclipse.dltk.core.IMethod;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.IModelElementVisitor;
import org.eclipse.dltk.core.INamespace;
import org.eclipse.dltk.core.IOpenable;
import org.eclipse.dltk.core.IScriptFolder;
import org.eclipse.dltk.core.IScriptModel;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.core.ISourceModule;
import org.eclipse.dltk.core.ISourceRange;
import org.eclipse.dltk.core.IType;
import org.eclipse.dltk.core.ITypeHierarchy;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.core.WorkingCopyOwner;

/**
 * @author Julia
 * 
 */
public class ITypeWrapper implements IType {

	String qname;
	
	public ITypeWrapper(String qname) {
		this.qname = qname;
	}
	
	@Override
	public String getFullyQualifiedName(String enclosingTypeSeparator) {
		return qname;
	}

	@Override
	public String getFullyQualifiedName() {
		return qname;
	}
	
	@Override
	public int getElementType() {
		return IModelElement.TYPE;
	}

	@Override
	public ISourceRange getNameRange() throws ModelException {
		return null;
	}

	@Override
	public int getFlags() throws ModelException {
		return 0;
	}

	@Override
	public INamespace getNamespace() throws ModelException {
		return null;
	}

	@Override
	public IType getDeclaringType() {
		return null;
	}

	@Override
	public ISourceModule getSourceModule() {
		return null;
	}

	@Override
	public IType getType(String name, int occurrenceCount) {
		return null;
	}

	@Override
	public String getElementName() {
		return null;
	}

	@Override
	public IModelElement getParent() {
		return null;
	}

	@Override
	public boolean isReadOnly() {
		return false;
	}

	@Override
	public IResource getResource() {
		return null;
	}

	@Override
	public IPath getPath() {
		return null;
	}

	@Override
	public boolean exists() {
		return false;
	}

	@Override
	public IModelElement getAncestor(int ancestorType) {
		return null;
	}

	@Override
	public IOpenable getOpenable() {
		return null;
	}

	@Override
	public IScriptModel getModel() {
		return null;
	}

	@Override
	public IScriptProject getScriptProject() {
		return null;
	}

	@Override
	public IResource getUnderlyingResource() throws ModelException {
		return null;
	}

	@Override
	public IResource getCorrespondingResource() throws ModelException {
		return null;
	}

	@Override
	public IModelElement getPrimaryElement() {
		return null;
	}

	@Override
	public String getHandleIdentifier() {
		return null;
	}

	@Override
	public boolean isStructureKnown() throws ModelException {
		return false;
	}

	@Override
	public void accept(IModelElementVisitor visitor) throws ModelException {
	}

	@Override
	public Object getAdapter(Class adapter) {
		return null;
	}

	@Override
	public ISourceRange getSourceRange() throws ModelException {
		return null;
	}

	@Override
	public String getSource() throws ModelException {
		return null;
	}

	@Override
	public IModelElement[] getChildren() throws ModelException {
		return null;
	}

	@Override
	public boolean hasChildren() throws ModelException {
		return false;
	}

	@Override
	public String[] getSuperClasses() throws ModelException {
		return null;
	}

	@Override
	public IField getField(String name) {
		return null;
	}

	@Override
	public IField[] getFields() throws ModelException {
		return null;
	}

	@Override
	public IType getType(String name) {
		return null;
	}

	@Override
	public IType[] getTypes() throws ModelException {
		return null;
	}

	@Override
	public IMethod getMethod(String name) {
		return null;
	}

	@Override
	public IMethod[] getMethods() throws ModelException {
		return null;
	}

	@Override
	public void codeComplete(char[] snippet, int insertion, int position,
			char[][] localVariableTypeNames, char[][] localVariableNames,
			int[] localVariableModifiers, boolean isStatic,
			CompletionRequestor requestor) throws ModelException {

	}

	@Override
	public void codeComplete(char[] snippet, int insertion, int position,
			char[][] localVariableTypeNames, char[][] localVariableNames,
			int[] localVariableModifiers, boolean isStatic,
			CompletionRequestor requestor, WorkingCopyOwner owner)
			throws ModelException {

	}

	@Override
	public IScriptFolder getScriptFolder() {
		return null;
	}

	@Override
	public String getTypeQualifiedName() {
		return null;
	}

	@Override
	public String getTypeQualifiedName(String enclosingTypeSeparator) {
		return null;
	}

	@Override
	public IMethod[] findMethods(IMethod method) {
		return null;
	}

	@Override
	public ITypeHierarchy loadTypeHierachy(InputStream input,
			IProgressMonitor monitor) throws ModelException {
		return null;
	}

	@Override
	public ITypeHierarchy newSupertypeHierarchy(IProgressMonitor monitor)
			throws ModelException {
		return null;
	}

	@Override
	public ITypeHierarchy newSupertypeHierarchy(ISourceModule[] workingCopies,
			IProgressMonitor monitor) throws ModelException {
		return null;
	}

	@Override
	public ITypeHierarchy newSupertypeHierarchy(WorkingCopyOwner owner,
			IProgressMonitor monitor) throws ModelException {
		return null;
	}

	@Override
	public ITypeHierarchy newTypeHierarchy(IScriptProject project,
			IProgressMonitor monitor) throws ModelException {
		return null;
	}

	@Override
	public ITypeHierarchy newTypeHierarchy(IScriptProject project,
			WorkingCopyOwner owner, IProgressMonitor monitor)
			throws ModelException {
		return null;
	}

	@Override
	public ITypeHierarchy newTypeHierarchy(IProgressMonitor monitor)
			throws ModelException {
		return null;
	}

	@Override
	public ITypeHierarchy newTypeHierarchy(ISourceModule[] workingCopies,
			IProgressMonitor monitor) throws ModelException {
		return null;
	}

	@Override
	public ITypeHierarchy newTypeHierarchy(WorkingCopyOwner owner,
			IProgressMonitor monitor) throws ModelException {
		return null;
	}

	@Override
	public <E extends IModelElement> E getAncestor(Class<E> clazz) {
		// TODO Auto-generated method stub
		return null;
	}
}
