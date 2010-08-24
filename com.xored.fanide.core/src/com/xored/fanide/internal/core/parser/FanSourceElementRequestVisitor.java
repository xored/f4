package com.xored.fanide.internal.core.parser;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.eclipse.dltk.ast.declarations.Argument;
import org.eclipse.dltk.ast.declarations.FieldDeclaration;
import org.eclipse.dltk.ast.declarations.MethodDeclaration;
import org.eclipse.dltk.ast.expressions.CallArgumentsList;
import org.eclipse.dltk.ast.expressions.CallExpression;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.references.Reference;
import org.eclipse.dltk.ast.references.SimpleReference;
import org.eclipse.dltk.ast.references.TypeReference;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.compiler.IElementRequestor;
import org.eclipse.dltk.compiler.ISourceElementRequestor;
import org.eclipse.dltk.compiler.SourceElementRequestVisitor;
import org.eclipse.dltk.compiler.IElementRequestor.MethodInfo;

import com.xored.fanide.ast.declarations.FanMethodDeclaration;
import com.xored.fanide.ast.expressions.CallExpr;
import com.xored.fanide.ast.expressions.LocalVariableDef;
import com.xored.fanide.ast.references.FieldReference;
import com.xored.fanide.ast.references.FieldStorage;
import com.xored.fanide.ast.references.UnresolvedReference;
import com.xored.fanide.ast.statements.ExpressionStmt;
import com.xored.fanide.ast.typesystem.FanTypeRef;
import com.xored.fanide.ast.typesystem.FuncTypeRef;
import com.xored.fanide.ast.typesystem.SimpleTypeRef;
import com.xored.fanide.core.ast.FanFieldDeclaration;

public class FanSourceElementRequestVisitor extends SourceElementRequestVisitor {

	public FanSourceElementRequestVisitor(IElementRequestor requesor) {
		super(requesor);
		methodLocals = new ArrayList<String>();
	}

	private ArrayList<String> methodLocals;

	@Override
	public boolean visit(Expression expression) throws Exception {
		super.visit(expression);
		if (expression instanceof LocalVariableDef) {
			methodLocals.add(((LocalVariableDef) expression).getName()
					.getName());
		} else if (expression instanceof CallExpr) {
			CallExpr callExpr = (CallExpr) expression;
			int argsCnt = 0;
			if (callExpr.getArgs() != null) {
				argsCnt = callExpr.getArgs().getChilds().size();
			}
			SimpleReference caller = callExpr.getCaller();
			int start = caller.sourceStart();
			if (start < 0) {
				start = 0;
			}
			fRequestor.acceptMethodReference(caller.getName(), argsCnt, start,
					callExpr.sourceEnd());
			if (argsCnt == 0) {
				fRequestor.acceptFieldReference(caller.getName(), start);
			}
		} else if (expression instanceof Reference) {
			if (expression instanceof FieldReference) {
				FieldReference fieldReference = (FieldReference) expression;
				fRequestor.acceptFieldReference(fieldReference.getName(),
						expression.sourceStart());
			} else if (expression instanceof FieldStorage) {
				FieldStorage fieldStorage = (FieldStorage) expression;
				fRequestor.acceptFieldReference(fieldStorage.getName(),
						expression.sourceStart());
			} else if (expression instanceof UnresolvedReference) {
				SimpleReference unrRef = (SimpleReference) expression;
				if (!methodLocals.contains(unrRef.getName())) {
					fRequestor.acceptFieldReference(unrRef.getName(),
							expression.sourceStart());
				}
			} else if (expression instanceof SimpleTypeRef) {
				SimpleTypeRef typeRef = (SimpleTypeRef) expression;
				fRequestor.acceptTypeReference(typeRef.getType().getName(),
						expression.sourceStart());
			} else if (expression instanceof FuncTypeRef) {
				List<FuncTypeRef.Param> params = ((FuncTypeRef) expression)
						.getParams();
				Iterator<FuncTypeRef.Param> iter = params.iterator();
				while (iter.hasNext()) {
					FanTypeRef type = iter.next().getType();
					if (type != null && type instanceof SimpleTypeRef) {
						SimpleTypeRef typeRef = (SimpleTypeRef) type;
						fRequestor.acceptTypeReference(typeRef.getType()
								.getName(), typeRef.sourceStart());
					}
				}
			}
		} else if (expression instanceof CallExpression) {
			CallExpression expr = (CallExpression) expression;
			String name = expr.getName();
			int callCount = 0;
			CallArgumentsList args = expr.getArgs();
			if (args != null) {
				callCount = args.getChilds().size();
			}
			SimpleReference callName = expr.getCallName();
			fRequestor.acceptMethodReference(name, callCount, callName
					.sourceStart(), callName.sourceEnd());
		}
		return true;
	}

	@Override
	public boolean visit(Statement statement) throws Exception {
		super.visit(statement);
		if (statement instanceof Argument) {
			methodLocals.add(((Argument) statement).getRef().getName());
		} else if (statement instanceof FieldDeclaration) {
			FieldDeclaration field = (FieldDeclaration) statement;
			ISourceElementRequestor.FieldInfo info = new ISourceElementRequestor.FieldInfo();
			info.modifiers = field.getModifiers();
			info.name = field.getName();
			info.nameSourceStart = field.getNameStart();
			info.nameSourceEnd = field.getNameEnd() - 1;
			info.declarationStart = field.sourceStart();
			if (field instanceof FanFieldDeclaration) {
				TypeReference typeRef = ((FanFieldDeclaration) field).getType();
				if (typeRef != null) {
					info.type = typeRef.toString();
				}
			}
			this.fRequestor.enterField(info);
			return true;
		} else if (statement instanceof ExpressionStmt) {
			ExpressionStmt st = (ExpressionStmt) statement;
			MethodDeclaration currentMethod = getCurrentMethod();
			Expression expression = st.getExpression();
			if (currentMethod != null && expression instanceof SimpleReference) {
				if (currentMethod.getStatements().contains(st)) {
					fRequestor.acceptMethodReference(
							((SimpleReference) expression).getName(), 0,
							expression.sourceStart(), expression.sourceEnd());
				}
			}

		}
		return true;
	}

	@Override
	public boolean endvisit(Statement statement) throws Exception {
		if (statement instanceof FieldDeclaration) {
			FieldDeclaration field = (FieldDeclaration) statement;
			this.fRequestor.exitField(field.sourceEnd());
		}
		return super.endvisit(statement);
	}

	@Override
	protected void modifyMethodInfo(MethodDeclaration methodDeclaration,
			MethodInfo mi) {
		if (fInClass) {
			mi.isConstructor = false;
			if (methodDeclaration instanceof com.xored.fanide.core.ast.FanMethodDeclaration) {
				com.xored.fanide.core.ast.FanMethodDeclaration method = (com.xored.fanide.core.ast.FanMethodDeclaration) methodDeclaration;
				mi.isConstructor = method.isConstructur();
				// TODO: Do we need here full type name?
				TypeReference returnTypeRef = method.getType();
				if (returnTypeRef != null) {
					mi.returnType = returnTypeRef.toString();
				}
			}
		}
	}

	@Override
	protected void onEndVisitMethod(MethodDeclaration method) {
		if (method == null)
			return;
		if (method instanceof FanMethodDeclaration) {
			FanMethodDeclaration fanMethod = (FanMethodDeclaration) method;
			FanTypeRef type = fanMethod.getType();
			if (type != null && type instanceof SimpleTypeRef) {
				fRequestor.acceptTypeReference(((SimpleTypeRef) type).getType()
						.getName(), type.sourceStart());
			}
		}
		methodLocals.clear();
	}
}
