package com.xored.fanide.core.ast;

import org.eclipse.dltk.ast.ASTNode;
import org.eclipse.dltk.ast.declarations.ModuleDeclaration;
import org.eclipse.dltk.ast.references.SimpleReference;

public class FanStructureASTBuilder {
	private ModuleDeclaration moduleDeclaration = null;

	public interface IElement {
		void setStart(int value);

		void setEnd(int value);
	}

	public interface INamedElement extends IElement {
		void setName(String name);

		void setNameStart(int value);

		void setNameEnd(int value);

		void setModifiers(int modifiers);

	}

	public interface ITypedElement extends INamedElement {
		void setTypeName(String typeName, int start, int end);
	}

	public interface IFanReferences {
		void addMethodReference(String name, int start, int end);

		void addTypeReference(String name, int start, int end);

		void addFieldReference(String name, int start, int end);
	}

	public interface IFanType extends INamedElement, IFanReferences {
		void addSuperType(String superTypename, int start, int end);

		IFanField addField();

		IFanMethod addMethod();
	}

	public interface IFanMethodParameter extends ITypedElement {
		void setInitializationExpression(String value, int start, int end);
	}

	public interface IFanMethod extends ITypedElement, IFanReferences {
		IFanMethodParameter addParameter();

		void setConstructur(boolean value);
	}

	public interface IFanField extends ITypedElement {
		void setInitializer(ASTNode node);
	}

	public FanStructureASTBuilder() {
		moduleDeclaration = new ModuleDeclaration(0);
	}

	public ModuleDeclaration getModuleDeclaration() {
		return this.moduleDeclaration;
	}

	public IFanType addType() {
		FanTypeDeclaration decl = new FanTypeDeclaration();
		this.moduleDeclaration.getStatements().add(decl);
		return decl;
	}
}
