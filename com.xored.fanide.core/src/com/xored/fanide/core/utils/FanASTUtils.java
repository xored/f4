package com.xored.fanide.core.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Stack;

import org.eclipse.dltk.ast.ASTNode;
import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.declarations.MethodDeclaration;
import org.eclipse.dltk.ast.declarations.ModuleDeclaration;
import org.eclipse.dltk.ast.declarations.TypeDeclaration;
import org.eclipse.dltk.ast.statements.Block;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.core.DLTKCore;

import com.xored.fanide.ast.declarations.ClassDeclaration;
import com.xored.fanide.ast.expressions.CallExpr;
import com.xored.fanide.ast.expressions.LocalVariableDef;
import com.xored.fanide.ast.statements.UsingStmt;

public class FanASTUtils {
	private FanASTUtils() {
		throw new AssertionError("Cannot instantiate utility class"); //$NON-NLS-1$
	}

	public static ASTNode getEnclosingElement(Class element,
			ASTNode[] wayToNode, ASTNode node, boolean considerGiven) {
		int pos = -1;
		for (int i = wayToNode.length - 1; i >= 0; i--) {
			if (wayToNode[i] == node) {
				pos = i;
				break;
			}
		}
		if (pos != -1) {
			if (!considerGiven)
				pos--;
			for (int i = pos; i >= 0; i--) {
				if (element.isInstance(wayToNode[i]))
					return wayToNode[i];
			}
		}
		return null;
	}

	public static TypeDeclaration getEnclosingType(ASTNode[] wayToNode,
			ASTNode node, boolean considerGiven) {
		return (TypeDeclaration) getEnclosingElement(TypeDeclaration.class,
				wayToNode, node, considerGiven);
	}

	public static CallExpr getEnclosingCallNode(ASTNode[] wayToNode,
			ASTNode node, boolean considerGiven) {
		return (CallExpr) getEnclosingElement(CallExpr.class, wayToNode, node,
				considerGiven);
	}

	public static MethodDeclaration getEnclosingMethod(ASTNode[] wayToNode,
			ASTNode node, boolean considerGiven) {
		return (MethodDeclaration) getEnclosingElement(MethodDeclaration.class,
				wayToNode, node, considerGiven);
	}

	public static ASTNode findMinimalASTNode(ModuleDeclaration unit, int start,
			int end) {
		FanSelectionVisitor visitor = new FanSelectionVisitor(start, end);

		try {
			unit.traverse(visitor);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return visitor.getResult();
	}

	public static ASTNode[] restoreWayToNode(ModuleDeclaration module,
			final ASTNode nde) {
		final Stack<ASTNode> stack = new Stack<ASTNode>();

		ASTVisitor visitor = new ASTVisitor() {
			boolean found = false;

			@Override
			public boolean visitGeneral(ASTNode node) throws Exception {
				if (!found) {
					stack.push(node);
					if (node.locationMatches(nde)) {
						found = true;
					}
				}
				return super.visitGeneral(node);
			}

			@Override
			public void endvisitGeneral(ASTNode node) throws Exception {
				super.endvisitGeneral(node);
				if (!found) {
					stack.pop();
				}
			}
		};

		try {
			module.traverse(visitor);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return stack.toArray(new ASTNode[stack.size()]);
	}

	public static UsingStmt[] getUsingPackages(ModuleDeclaration module) {
		FanUsingCollector visitor = new FanUsingCollector();

		try {
			module.traverse(visitor);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<UsingStmt> usingPackages = visitor.getUsingPackages();
		return usingPackages.toArray(new UsingStmt[usingPackages.size()]);
	}

	public static ClassDeclaration determineSelfClass(
			ModuleDeclaration parsedUnit, ASTNode[] wayToNode) {
		for (int i = wayToNode.length; --i >= 0;) {
			final ASTNode node = wayToNode[i];
			if (node instanceof ClassDeclaration) {
				return (ClassDeclaration) node;
			}
		}
		return null;
	}

	public static LocalVariableDef[] findLocalVariables(final ASTNode scope,
			final ASTNode nextScope, final String varName) {
		final Collection variables = new ArrayList();
		ASTVisitor visitor = new ASTVisitor() {

			@Override
			public boolean visit(MethodDeclaration s) throws Exception {
				if (s == scope)
					return true;
				return false;
			}

			@Override
			public boolean visit(TypeDeclaration s) throws Exception {
				if (s == scope)
					return true;
				return false;
			}

			@Override
			public boolean visitGeneral(ASTNode node) throws Exception {
				if (node instanceof LocalVariableDef) {
					if (((LocalVariableDef) node).getName().getName().equals(
							varName)) {
						variables.add(node);
					}
				}
				if (node == nextScope)
					return false;
				return true;
			}

		};
		try {
			scope.traverse(visitor);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return (LocalVariableDef[]) variables
				.toArray(new LocalVariableDef[variables.size()]);
	}

}

class FanSelectionVisitor extends ASTVisitor {
	ASTNode result = null;
	final int start, end;

	public FanSelectionVisitor(int start, int end) {
		this.start = start;
		this.end = end;
	}

	public ASTNode getResult() {
		return result;
	}

	@Override
	public boolean visitGeneral(ASTNode s) throws Exception {
		int realStart = s.sourceStart();
		int realEnd = s.sourceEnd();
		if (s instanceof Block) {
			realStart = realEnd = -42; // never select on blocks
			// ssanders: BEGIN - Modify narrowing logic
		} else if (s instanceof TypeDeclaration) {
			TypeDeclaration declaration = (TypeDeclaration) s;
			realStart = declaration.sourceStart();
			realEnd = declaration.sourceEnd();
		} else if (s instanceof MethodDeclaration) {
			MethodDeclaration declaration = (MethodDeclaration) s;
			realStart = declaration.sourceStart();
			realEnd = declaration.sourceEnd();
		}
		if (realStart <= start && realEnd >= end) {
			if (result != null) {
				if ((s.sourceStart() >= result.sourceStart())
						&& (s.sourceEnd() <= result.sourceEnd()))
					result = s;
			} else {
				result = s;
			}
			// ssanders: END
			if (DLTKCore.DEBUG_SELECTION)
				System.out.println("Found " + s.getClass().getName()); //$NON-NLS-1$
		}
		return true;
	}

}

class FanUsingCollector extends ASTVisitor {
	List<UsingStmt> usingPackages = new ArrayList<UsingStmt>();

	public FanUsingCollector() {
	}

	public List<UsingStmt> getUsingPackages() {
		return usingPackages;
	}

	@Override
	public boolean visit(Statement s) throws Exception {
		if (s instanceof UsingStmt) {
			usingPackages.add((UsingStmt) s);
			return false;
		}
		return super.visit(s);
	}

}