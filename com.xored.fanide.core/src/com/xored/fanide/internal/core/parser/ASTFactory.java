package com.xored.fanide.internal.core.parser;

import java.math.BigDecimal;
import java.util.List;

import org.antlr.runtime.Token;
import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.dltk.ast.expressions.CallArgumentsList;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.expressions.Literal;
import org.eclipse.dltk.ast.expressions.NumericLiteral;
import org.eclipse.dltk.ast.references.Reference;
import org.eclipse.dltk.ast.references.SimpleReference;
import org.eclipse.dltk.ast.statements.Block;
import org.eclipse.dltk.ast.statements.Statement;

import com.xored.fanide.ast.declarations.AbstractFanMethodDeclaration;
import com.xored.fanide.ast.declarations.AbstractFanTypeDeclaration;
import com.xored.fanide.ast.declarations.FanFacetDeclaration;
import com.xored.fanide.ast.declarations.FanFieldDeclaration;
import com.xored.fanide.ast.expressions.BinaryExpression;
import com.xored.fanide.ast.expressions.BoolLiteral;
import com.xored.fanide.ast.expressions.CallExpr;
import com.xored.fanide.ast.expressions.Closure;
import com.xored.fanide.ast.expressions.DecimalLiteral;
import com.xored.fanide.ast.expressions.DslLiteral;
import com.xored.fanide.ast.expressions.DurationLiteral;
import com.xored.fanide.ast.expressions.FanExpressionConstants;
import com.xored.fanide.ast.expressions.FloatLiteral;
import com.xored.fanide.ast.expressions.IntLiteral;
import com.xored.fanide.ast.expressions.ListLiteral;
import com.xored.fanide.ast.expressions.MapLiteral;
import com.xored.fanide.ast.expressions.NullLiteral;
import com.xored.fanide.ast.expressions.SlotLiteral;
import com.xored.fanide.ast.expressions.StrLiteral;
import com.xored.fanide.ast.expressions.TypeLiteral;
import com.xored.fanide.ast.expressions.UnaryExpression;
import com.xored.fanide.ast.expressions.UriLiteral;
import com.xored.fanide.ast.references.FieldStorage;
import com.xored.fanide.ast.references.ItReference;
import com.xored.fanide.ast.references.SlotReference;
import com.xored.fanide.ast.references.SuperReference;
import com.xored.fanide.ast.references.ThisReference;
import com.xored.fanide.ast.references.UnresolvedReference;
import com.xored.fanide.ast.statements.BreakStmt;
import com.xored.fanide.ast.statements.CaseStmt;
import com.xored.fanide.ast.statements.CatchStmt;
import com.xored.fanide.ast.statements.ContinueStmt;
import com.xored.fanide.ast.statements.DefaultStmt;
import com.xored.fanide.ast.statements.FinallyStmt;
import com.xored.fanide.ast.statements.ForStmt;
import com.xored.fanide.ast.statements.IfStmt;
import com.xored.fanide.ast.statements.ReturnStmt;
import com.xored.fanide.ast.statements.StmtList;
import com.xored.fanide.ast.statements.SwitchStmt;
import com.xored.fanide.ast.statements.ThrowStmt;
import com.xored.fanide.ast.statements.TryStmt;
import com.xored.fanide.ast.statements.WhileStmt;
import com.xored.fanide.ast.typesystem.ArrayTypeRef;
import com.xored.fanide.ast.typesystem.FanTypeRef;
import com.xored.fanide.ast.typesystem.FuncTypeRef;
import com.xored.fanide.ast.typesystem.MapTypeRef;
import com.xored.fanide.ast.typesystem.PodRef;
import com.xored.fanide.ast.typesystem.SimpleTypeRef;
import com.xored.fanide.core.FanCore;

public class ASTFactory {
	private TokenConverter converter;

	public ASTFactory(TokenConverter converter) {
		this.converter = converter;
	}

	public void handleTypeFacets(
			AbstractFanTypeDeclaration decl, List<FanFacetDeclaration> facets) {
		for (FanFacetDeclaration facet : facets) {
			decl.addFacet(facet);
		}
	}

	public void handleMethodFacets(
			AbstractFanMethodDeclaration decl, List<FanFacetDeclaration> facets) {
		for (FanFacetDeclaration facet : facets) {
			decl.addFacet(facet);
		}
	}

	public void handleFieldFacets(
			FanFieldDeclaration decl, List<FanFacetDeclaration> facets) {
		for (FanFacetDeclaration facet : facets) {
			decl.addFacet(facet);
		}
	}

	public StmtList makeStmtList(List<Statement> list) {
		StmtList stmt = new StmtList();
		Statement first = null;
		for (Statement s : list) {
			if (s != null) {
				if (first == null) {
					first = s;
					stmt.setStart(first.sourceStart());
				} else {
					stmt.setEnd(s.sourceEnd());
				}
				stmt.add(s);
			}
		}
		return stmt;
	}

	public Block makeBlock(Token lc, StmtList list, Token rc) {
		int start = startOf(lc);
		int end = (rc != null) ? endOf(rc) : (list != null) ? list.sourceEnd()
				: endOf(lc);
		Block stmt = new Block();
		stmt.setStart(start);
		stmt.setEnd(end);
		if (list != null) {
			for (Statement s : list.get()) {
				stmt.addStatement(s);
			}
		}
		return stmt;
	}

	public IfStmt makeIfStmt(Token ifKw, Token lp, Expression cond, Token rp,
			Statement thenBody, Token elseKw, Statement elseBody) {
		int start = startOf(ifKw);
		int end = (elseBody != null) ? elseBody.sourceEnd()
				: (thenBody != null) ? thenBody.sourceEnd()
						: (cond != null) ? startOf(rp) : endOf(ifKw);
		IfStmt stmt = new IfStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		stmt.setCondition(cond);
		stmt.setThenBody(thenBody);
		stmt.setElseBody(elseBody);
		return stmt;
	}

	public ForStmt makeForStmt(Token forKw, Token lp, Expression init,
			Token semi1, Expression cond, Token semi2, Expression incr,
			Token rp, Statement body) {
		int start = startOf(forKw);
		int end = (body != null) ? body.sourceEnd() : endOf(forKw);
		ForStmt stmt = new ForStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		stmt.setInitialization(init);
		stmt.setCondition(cond);
		stmt.setIncrement(incr);
		stmt.setBody(body);
		return stmt;
	}

	public WhileStmt makeWhileStmt(Token whileKw, Token lp, Expression cond,
			Token rp, Statement body) {
		int start = startOf(whileKw);
		int end = (body != null) ? body.sourceEnd() : (cond != null) ? cond
				.sourceEnd() : endOf(whileKw);
		WhileStmt stmt = new WhileStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		stmt.setCondition(cond);
		stmt.setBody(body);
		return stmt;
	}

	public ReturnStmt makeReturnStmt(Token returnKw, Expression returned,
			Token semi) {
		int[] bounds = boundsOf(returnKw);
		int start = bounds[0];
		int end = (semi != null) ? endOf(semi) : (returned != null) ? returned
				.sourceEnd() : bounds[1];
		ReturnStmt stmt = new ReturnStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		stmt.setReturned(returned);
		return stmt;
	}

	public ThrowStmt makeThrowStmt(Token throwKw, Expression thrown, Token semi) {
		int[] bounds = boundsOf(throwKw);
		int start = bounds[0];
		int end = (semi != null) ? endOf(semi) : (thrown != null) ? thrown
				.sourceEnd() : bounds[1];
		ThrowStmt stmt = new ThrowStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		stmt.setThrown(thrown);
		return stmt;
	}

	public BreakStmt makeBreakStmt(Token breakKw, Token semi) {
		int[] bounds = boundsOf(breakKw);
		int start = bounds[0];
		int end = (semi != null) ? endOf(semi) : bounds[1];
		BreakStmt stmt = new BreakStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		return stmt;
	}

	public ContinueStmt makeContinueStmt(Token continueKw, Token semi) {
		int[] bounds = boundsOf(continueKw);
		int start = bounds[0];
		int end = (semi != null) ? endOf(semi) : bounds[1];
		ContinueStmt stmt = new ContinueStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		return stmt;
	}

	public TryStmt makeTryStmt(Token tryKw, List<CatchStmt> catches,
			FinallyStmt f) {
		int[] bounds = boundsOf(tryKw);
		TryStmt stmt = new TryStmt();
		stmt.setStart(bounds[0]);
		stmt.setEnd(bounds[1]);
		for (CatchStmt s : catches) {
			if (s != null) {
				stmt.setEnd(s.sourceEnd());
				stmt.addCatch(s);
			}
		}
		if (f != null) {
			stmt.setFinally(f);
			stmt.setEnd(f.sourceEnd());
		}
		return stmt;
	}

	public CatchStmt makeCatchStmt(Token catchKw, Token lp, FanTypeRef type,
			Token id, Token rp, Statement body) {
		int[] bounds = boundsOf(catchKw);
		int start = bounds[0];
		int end = (body != null) ? body.sourceEnd() : bounds[1];
		CatchStmt stmt = new CatchStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		if (id != null) {
			stmt.setCaught(makeSimpleReference(id));
		}
		stmt.setCaughtType(type);
		stmt.setBody(body);
		return stmt;
	}

	public FinallyStmt makeFinallyStmt(Token finallyKw, Statement body) {
		int[] bounds = boundsOf(finallyKw);
		int start = bounds[0];
		int end = (body != null) ? body.sourceEnd() : bounds[1];
		FinallyStmt stmt = new FinallyStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		stmt.setBody(body);
		return stmt;
	}

	public SwitchStmt makeSwitchStmt(Token switchKw, Token lp, Expression e,
			Token rp, Token lc, List<CaseStmt> cases, DefaultStmt d, Token rc) {
		SwitchStmt stmt = new SwitchStmt();
		int[] bounds = boundsOf(switchKw);
		stmt.setStart(bounds[0]);
		stmt.setEnd(bounds[1]);
		stmt.setExpression(e);
		for (CaseStmt s : cases) {
			if (s != null) {
				stmt.setEnd(s.sourceEnd());
				stmt.addCase(s);
			}
		}
		if (d != null) {
			stmt.setDefault(d);
			stmt.setEnd(d.sourceEnd());
		}
		return stmt;
	}

	public CaseStmt makeCaseStmt(Token caseKw, Expression ex, Token colon,
			Statement body) {
		int[] bounds = boundsOf(caseKw);
		int start = bounds[0];
		int end = (body != null) ? body.sourceEnd() : bounds[1];
		CaseStmt stmt = new CaseStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		stmt.setExpression(ex);
		stmt.setBody(body);
		return stmt;
	}

	public DefaultStmt makeDefaultStmt(Token defaultKw, Token colon,
			Statement body) {
		int[] bounds = boundsOf(defaultKw);
		int start = bounds[0];
		int end = (body != null) ? body.sourceEnd() : bounds[1];
		DefaultStmt stmt = new DefaultStmt();
		stmt.setStart(start);
		stmt.setEnd(end);
		stmt.setBody(body);
		return stmt;
	}

	// -----------------------------------------------------------

	public SimpleTypeRef makeSimpleTypeRef(Token podName, Token dc,
			Token typeName) {
		Assert.isLegal(typeName != null);
		int start = (podName != null) ? startOf(podName) : startOf(typeName);
		int end = endOf(typeName);
		SimpleTypeRef ref = new SimpleTypeRef();
		ref.setStart(start);
		ref.setEnd(end);
		if (podName != null) {
			PodRef pod = makePodRef(podName);
			ref.setPod(pod);
		}
		ref.setType(makeSimpleReference(typeName));
		return ref;
	}

	public PodRef makePodRef(Token podName) {
		PodRef ref = new PodRef();
		int[] bounds = boundsOf(podName);
		ref.setStart(bounds[0]);
		ref.setEnd(bounds[1]);
		ref.setName(podName.getText());
		return ref;
	}

	public FuncTypeRef.Param makeFuncTypeParamRef(FanTypeRef type,
			Token paramName) {
		FuncTypeRef.Param param = new FuncTypeRef.Param();
		if (type != null) {
			param.setType(type);
		}
		if (paramName != null) {
			param.setParamName(makeSimpleReference(paramName));
		}
		return param;
	}

	public FuncTypeRef makeFuncTypeRef(Token startPipe,
			List<FuncTypeRef.Param> params, FanTypeRef returnedType,
			Token endPipe) {
		int start = startOf(startPipe);
		FuncTypeRef ref = new FuncTypeRef();
		ref.setStart(start);
		for (FuncTypeRef.Param p : params) {
			if (p != null) {
				ref.addParam(p);
				ref.setEnd(p.sourceEnd());
			}
		}
		if (returnedType != null) {
			ref.setReturnedType(returnedType);
			ref.setEnd(returnedType.sourceEnd());
		}
		if (endPipe != null) {
			ref.setEnd(endOf(endPipe));
		}
		return ref;
	}

	public ArrayTypeRef makeArrayTypeRef(FanTypeRef baseType, Token lb, Token rb) {
		Assert.isLegal(baseType != null && lb != null);
		ArrayTypeRef ref = new ArrayTypeRef();
		ref.setBaseType(baseType);
		ref.setStart(baseType.sourceStart());
		ref.setEnd(endOf(lb));
		if (rb != null) {
			ref.setEnd(endOf(rb));
		}
		return ref;
	}

	public MapTypeRef makeMapTypeRef(FanTypeRef keyType, Token colon,
			FanTypeRef valueType) {
		Assert.isLegal(keyType != null && colon != null);
		MapTypeRef ref = new MapTypeRef();
		ref.setKeyType(keyType);
		ref.setEnd(endOf(colon));
		ref.setValueType(valueType);
		if (valueType != null) {
			ref.setEnd(valueType.sourceEnd());
		}
		return ref;
	}

	public Expression makeTypedMapOrList(Expression type, Expression literal) {
		if (type == null)
			return literal;
		Assert.isLegal(literal != null);
		Assert.isLegal(literal instanceof MapLiteral
				|| literal instanceof ListLiteral);
		if (literal instanceof MapLiteral)
			return makeTypedMapLiteral(type, (MapLiteral) literal);
		else
			return makeTypedListLiteral(type, (ListLiteral) literal);
	}

	public MapLiteral makeTypedMapLiteral(Expression type, MapLiteral map) {
		Assert.isLegal(type instanceof MapTypeRef);
		MapTypeRef ref = (MapTypeRef) type;
		map.setStart(ref.sourceStart());
		map.setType(ref);

		return map;
	}

	public ListLiteral makeTypedListLiteral(Expression type, ListLiteral list) {
		if (type instanceof SimpleReference || type instanceof FanTypeRef) {
			ArrayTypeRef tref;
			if (type instanceof SimpleReference) {
				SimpleReference ref = (SimpleReference) type;
				tref = makeArrayTypeRefFromSimpleR(ref);
			} else {
				tref = new ArrayTypeRef();
				tref.setStart(type.sourceStart());
				tref.setEnd(type.sourceEnd());
				tref.setBaseType((FanTypeRef) type);
			}
			list.setStart(type.sourceStart());
			list.setType(tref);
		}

		return list;
	}

	private ArrayTypeRef makeArrayTypeRefFromSimpleR(SimpleReference ref) {
		ArrayTypeRef tref = new ArrayTypeRef();
		int start = ref.sourceStart();
		int end = ref.sourceEnd();
		tref.setStart(start);
		tref.setEnd(end);
		tref.setNullable(false);

		SimpleTypeRef baseType = new SimpleTypeRef();
		baseType.setStart(start);
		baseType.setEnd(end);
		baseType.setNullable(false);
		baseType.setType(new SimpleReference(start, end, ref.getName()));

		tref.setBaseType(baseType);
		return tref;
	}

	// ------------------------------------------------------------

	public SimpleReference makeSimpleReference(Token token) {
		Assert.isLegal(token != null);
		int[] bounds = boundsOf(token);
		int start = bounds[0];
		int end = bounds[1];
		SimpleReference ref = new SimpleReference(start, end, token.getText());
		return ref;
	}

	public StrLiteral makeStrLiteral(Token token) {
		Assert.isLegal(token != null);
		int[] bounds = boundsOf(token);
		int start = bounds[0];
		int end = bounds[1];
		StrLiteral literal = new StrLiteral(start, end);
		literal.setValue(token.getText());
		return literal;
	}

	public SlotLiteral makeSlotLiteral(Token token, FanTypeRef type) {
		Assert.isLegal(token != null);
		int[] bounds = boundsOf(token);
		int start = bounds[0];
		int end = bounds[1];
		SlotLiteral literal = new SlotLiteral(start, end);
		SlotReference ref = new SlotReference(start, end, token.getText());
		literal.setSlot(ref);
		if (type != null) {
			literal.setType(type);
		}
		return literal;
	}

	public TypeLiteral makeTypeLiteral(FanTypeRef ref) {
		Assert.isLegal(ref != null);
		TypeLiteral literal = new TypeLiteral(ref.sourceStart(), ref
				.sourceEnd());
		literal.setType(ref);
		return literal;
	}

	public BoolLiteral makeBoolLiteral(Token token) {
		Assert.isLegal(token != null);
		int[] bounds = boundsOf(token);
		int start = bounds[0];
		int end = bounds[1];
		BoolLiteral literal = new BoolLiteral(start, end);
		literal.setValue(token.getText());
		return literal;
	}

	public Literal makeNumberLiteral(Token token) {
		Assert.isLegal(token != null);
		int[] bounds = boundsOf(token);
		int start = bounds[0];
		int end = bounds[1];
		String value = token.getText();
		if (!value.startsWith("'")) {
			value = value.replaceAll("_", "");
		}
		try {
			if (value.startsWith("0x")) {
				IntLiteral literal = new IntLiteral(start, end);
				literal.setValue(token.getText());
				value = value.substring(2);
				if (value.length() < 16) {
					long intValue = Long.parseLong(value, 16);
					literal.setIntValue(intValue);
				}
				return literal;
			} else if (value.startsWith("'")) {
				IntLiteral literal = new IntLiteral(start, end);
				literal.setValue(token.getText());
				char intValue = convertCharEcapes(value);
				literal.setIntValue(intValue);
				return literal;
			} else if (isDecimalValue(value)) {
				DecimalLiteral literal = new DecimalLiteral(start, end);
				literal.setValue(value);
				value = cutDecimalSuffix(value);
				BigDecimal decimal = new BigDecimal(value);
				literal.setDecimalValue(decimal);
				return literal;
			} else if (isFloatValue(value)) {
				FloatLiteral literal = new FloatLiteral(start, end);
				literal.setValue(value);
				value = cutFloatSuffix(value);
				double fl = Double.parseDouble(value);
				literal.setFloatValue(fl);
				return literal;
			} else if (isDurationValue(value)) {
				DurationLiteral literal = new DurationLiteral(start, end);
				literal.setValue(token.getText());
				double durValue = converDurationToPlain(value);
				literal.setDurationValue(durValue);
				return literal;
			} else {
				if (value.contains(".") || value.contains("e")
						|| value.contains("E")) {
					DecimalLiteral literal = new DecimalLiteral(start, end);
					literal.setValue(value);
					BigDecimal decimal = new BigDecimal(value);
					literal.setDecimalValue(decimal);
					return literal;
				} else {
					IntLiteral literal = new IntLiteral(start, end);
					literal.setValue(token.getText());
					long intValue = Long.parseLong(value);
					literal.setIntValue(intValue);
					return literal;
				}
			}
		} catch (NumberFormatException e) {
			// If value was too long
			// TODO generate problem for further reporting
			FanCore.getDefault().getLog().log(
					new Status(IStatus.ERROR, FanCore.PLUGIN_ID,
							"Incorrect number format :" + value));
			// Just for now
			return new NumericLiteral(start, end, 0);
		}
	}

	private char convertCharEcapes(String value) {
		value = value.substring(1, value.length() - 1);
		try {
			if (value.equals("\\b")) {
				return '\b';
			} else if (value.equals("\\f")) {
				return '\f';
			} else if (value.equals("\\n")) {
				return '\n';
			} else if (value.equals("\\r")) {
				return '\r';
			} else if (value.equals("\\t")) {
				return '\t';
			} else if (value.equals("\\\"")) {
				return '\"';
			} else if (value.equals("\\\'")) {
				return '\'';
			} else if (value.equals("\\`")) {
				return '`';
			} else if (value.equals("\\$")) {
				return '$';
			} else if (value.equals("\\\\")) {
				return '\\';
			} else if (value.startsWith("\\u")) {
				value = value.substring(3);
				return (char) Integer.parseInt(value, 16);
			}
		} catch (NumberFormatException e) {
			FanCore.getDefault().getLog().log(
					new Status(IStatus.ERROR, FanCore.PLUGIN_ID,
							"Incorrect character format :" + value));
			// Just for now
			return 0;
		}
		Assert.isLegal(value.length() == 1);
		return value.charAt(0);
	}

	private double converDurationToPlain(String value) {
		if (!isDurationValue(value)) {
			throw new IllegalArgumentException(
					"Duration value expected, but was " + value);
		}
		double base = 1;
		int len = value.length();
		if (value.endsWith("ns")) {
			value = value.substring(0, len - "ns".length());
			base = 1;
		} else if (value.endsWith("ms")) {
			value = value.substring(0, len - "ms".length());
			base = 0.001e9;
		} else if (value.endsWith("sec")) {
			value = value.substring(0, len - "sec".length());
			base = 1e9;
		} else if (value.endsWith("min")) {
			value = value.substring(0, len - "min".length());
			base = 60e9;
		} else if (value.endsWith("hr")) {
			value = value.substring(0, len - "hr".length());
			base = 36000e9;
		} else if (value.endsWith("day")) {
			value = value.substring(0, len - "day".length());
			base = 86400e9;
		}
		double plainValue = Double.parseDouble(value);
		plainValue *= base;
		return 0;
	}

	private boolean isDecimalValue(String value) {
		return value.endsWith("d") || value.endsWith("D");
	}

	private String cutDecimalSuffix(String value) {
		if (isDecimalValue(value)) {
			return value.substring(0, value.length() - 1);
		}
		return value;
	}

	private boolean isFloatValue(String value) {
		return value.endsWith("f") || value.endsWith("F");
	}

	private String cutFloatSuffix(String value) {
		if (isFloatValue(value)) {
			return value.substring(0, value.length() - 1);
		}
		return value;
	}

	private boolean isDurationValue(String value) {
		return value.endsWith("ns") || value.endsWith("ms")
				|| value.endsWith("sec") || value.endsWith("min")
				|| value.endsWith("hr") || value.endsWith("day");
	}

	private String convertDurationIntoInt(String value) {
		if (isDecimalValue(value)) {
			return value.substring(0, value.length() - 1);
		}
		return value;
	}

	public ItReference makeItRef(Token token) {
		Assert.isLegal(token != null);
		int start = startOf(token);
		ItReference ref = new ItReference(start);
		return ref;
	}

	public ThisReference makeThisRef(Token token) {
		Assert.isLegal(token != null);
		int start = startOf(token);
		ThisReference ref = new ThisReference(start);
		return ref;
	}

	public SuperReference makeSuperRef(Token token) {
		Assert.isLegal(token != null);
		int start = startOf(token);
		SuperReference ref = new SuperReference(start);
		return ref;
	}

	public NullLiteral makeNullLiteral(Token token) {
		Assert.isLegal(token != null);
		int start = startOf(token);
		NullLiteral ref = new NullLiteral(start);
		return ref;
	}

	public UriLiteral makeUriLiteral(Token token) {
		Assert.isLegal(token != null);
		int[] bounds = boundsOf(token);
		int start = bounds[0];
		int end = bounds[1];
		UriLiteral literal = new UriLiteral(start, end);
		literal.setValue(token.getText());
		return literal;
	}

	public DslLiteral makeDslLiteral(Token token) {
		Assert.isLegal(token != null);
		int[] bounds = boundsOf(token);
		int start = bounds[0];
		int end = bounds[1];
		DslLiteral literal = new DslLiteral(start, end);
		literal.setValue(token.getText());
		return literal;
	}

	public UnaryExpression makeParenExpr(Token lp, Expression expr, Token rp) {
		Assert.isLegal(lp != null);
		Assert.isLegal(expr != null);
		int start = startOf(lp);
		int end = (rp != null) ? endOf(rp) : expr.sourceEnd();
		UnaryExpression stmt = new UnaryExpression();
		stmt.setStart(start);
		stmt.setEnd(end);
		stmt.setOperand(expr);
		stmt.setKind(FanExpressionConstants.E_PAREN);
		return stmt;
	}

	public Expression handleIdAccess(Expression receiver,
			SimpleReference caller, Closure closure) {
		Assert.isLegal(caller != null);
		if (receiver != null || closure != null) {
			int start = (receiver != null) ? receiver.sourceStart() : caller
					.sourceStart();
			int end = (closure != null) ? closure.sourceEnd() : caller
					.sourceEnd();
			CallExpr expr = new CallExpr();
			expr.setStart(start);
			expr.setEnd(end);
			expr.setReceiver(receiver);
			expr.setCaller(caller);
			expr.setClosure(closure);
			return expr;
		}
		return caller;
	}

	public Expression handleSuperAccess(Expression receiver,
			SuperReference caller) {
		Assert.isLegal(caller != null);
		if (receiver != null) {
			int start = receiver.sourceStart();
			int end = caller.sourceEnd();
			CallExpr expr = new CallExpr();
			expr.setStart(start);
			expr.setEnd(end);
			expr.setReceiver(receiver);
			expr.setCaller(caller);
			return expr;
		}
		return caller;
	}

	public Expression handleCallArgs(Expression base, CallArgumentsList list,
			Closure closure) {
		Assert.isLegal(base != null);
		Assert.isLegal(list != null || closure != null);
		int start = base.sourceStart();
		int end = (closure != null) ? closure.sourceEnd() : list.sourceEnd();
		if (base instanceof SimpleReference) {
			CallExpr expr = new CallExpr();
			expr.setStart(start);
			expr.setEnd(end);
			expr.setCaller((SimpleReference) base);
			expr.setArgs(list);
			expr.setClosure(closure);
			return expr;
		} else if (base instanceof CallExpr) {
			CallExpr expr = (CallExpr) base;
			expr.setEnd(end);
			expr.setArgs(list);
			expr.setClosure(closure);
			return expr;
		}
		Assert.isLegal(false, "Illegal state");
		return null;
	}

	public Reference handlePossibleUnresolved(FanTypeRef ref) {
		Assert.isLegal(ref != null);
		if (ref instanceof SimpleTypeRef) {
			SimpleTypeRef sr = (SimpleTypeRef) ref;
			if (sr.getPod() == null && !sr.isNullable()) {
				return new UnresolvedReference(sr);
			}
		}
		return ref;
	}

	public Closure makeClosure(FuncTypeRef type, Block body) {
		Assert.isLegal(body != null);
		for (FuncTypeRef.Param p : type.getParams()) {
			if (p.getParamName() == null) {
				FanTypeRef typeRef = p.getType();
				Assert.isLegal(typeRef != null);
				if (typeRef instanceof SimpleTypeRef) {
					SimpleTypeRef sr = (SimpleTypeRef) typeRef;
					if (sr.getPod() == null && !sr.isNullable()) {
						SimpleReference ref = sr.getType();
						p.setType(null);
						p.setParamName(ref);
					} else {
						// TODO Report error
					}
				} else {
					// TODO Report error
				}
			}
		}
		int start = (type != null) ? type.sourceStart() : body.sourceStart();
		int end = body.sourceEnd();
		Closure closure = new Closure();
		closure.setStart(start);
		closure.setEnd(end);
		closure.setType(type);
		closure.setBody(body);
		return closure;
	}

	public FieldStorage makeFieldStorage(Expression parent, Token name) {
		Assert.isLegal(name != null);
		int[] bounds = boundsOf(name);
		FieldStorage stmt = new FieldStorage();
		stmt.setStart(bounds[0]);
		stmt.setEnd(bounds[1]);
		stmt.setName(name.getText().substring(1));
		return stmt;
	}

	public CallArgumentsList makeCallArgs(Token lp, List<Expression> args,
			Token rp) {
		Assert.isLegal(lp != null);
		int[] bounds = boundsOf(lp);
		CallArgumentsList list = new CallArgumentsList();
		list.setStart(bounds[0]);
		list.setEnd(bounds[1]);
		if (args != null) {
			for (Expression arg : args) {
				if (arg != null) {
					list.addNode(arg);
					list.setEnd(arg.sourceEnd());
				}
			}
		}
		if (rp != null) {
			list.setEnd(endOf(rp));
		}
		return list;
	}

	public BinaryExpression makeIndexExpr(Expression parent, Token lb,
			Expression index, Token rb) {
		Assert.isLegal(parent != null);
		Assert.isLegal(lb != null);
		Assert.isLegal(index != null);
		int start = parent.sourceStart();
		int end = (rb != null) ? endOf(rb) : index.sourceEnd();
		BinaryExpression stmt = new BinaryExpression();
		stmt.setStart(start);
		stmt.setEnd(end);
		stmt.setFirst(parent);
		stmt.setSecond(index);
		stmt.setKind(FanExpressionConstants.E_INDEX);
		return stmt;
	}

	protected int startOf(Token token) {
		int start = converter.convert(token.getLine(), token
				.getCharPositionInLine());
		return start;
	}

	protected int endOf(Token token) {
		int start = startOf(token);
		int end = start + token.getText().length();
		return end;
	}

	protected int[] boundsOf(Token token) {
		int start = startOf(token);
		int end = start + token.getText().length();
		return new int[] { start, end };
	}
}
