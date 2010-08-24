package com.xored.fanide.internal.core.parser;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import org.antlr.runtime.EarlyExitException;
import org.antlr.runtime.FailedPredicateException;
import org.antlr.runtime.MismatchedNotSetException;
import org.antlr.runtime.MismatchedSetException;
import org.antlr.runtime.MismatchedTokenException;
import org.antlr.runtime.MismatchedTreeNodeException;
import org.antlr.runtime.NoViableAltException;
import org.antlr.runtime.RecognitionException;
import org.antlr.runtime.Token;
import org.antlr.runtime.TokenStream;
import org.eclipse.core.runtime.Assert;
import org.eclipse.dltk.compiler.problem.DefaultProblem;
import org.eclipse.dltk.compiler.problem.IProblem;
import org.eclipse.dltk.compiler.problem.IProblemReporter;
import org.eclipse.dltk.compiler.problem.ProblemSeverities;

import com.xored.fanide.core.FanCore;

public class FanErrorReporter {
	IProblemReporter reporter;
	TokenConverter converter;
	Fan_v1_0_Parser parser;
	List<IProblem> problems = new ArrayList<IProblem>();

	public FanErrorReporter(TokenConverter converter,
			IProblemReporter reporter, Fan_v1_0_Parser parser) {
		Assert.isLegal(reporter != null);
		this.converter = converter;
		this.reporter = reporter;
		this.parser = parser;
	}

	private String[] tokenNames = null;

	public void reportError(RecognitionException re) {
		if (tokenNames == null) {
			tokenNames = parser.getTokenNames();
		}
		String msg = null;
		if (re instanceof MismatchedTokenException) {
			MismatchedTokenException mte = (MismatchedTokenException) re;
			String tokenName = "<unknown>"; //$NON-NLS-1$
			String tokenErrorDisplay = parser.getTokenErrorDisplay(re.token);
			if (mte.expecting == Token.EOF) {
				msg = "invalid input " + parser.getTokenErrorDisplay(re.token); //$NON-NLS-1$
			} else {
				tokenName = tokenNames[mte.expecting];
				if ("'\\r\\n'".equals(tokenErrorDisplay)) { //$NON-NLS-1$
					msg = "expecting " + tokenName; //$NON-NLS-1$
					Token prev = getPrevAfterErrToken(re);
					if (prev != null) {
						re.token = prev;
					}
					prev = getPrevAfterErrToken(re);
					if (prev != null) {
						re.token = prev;
					}
				} else if (re.token.getType() == Token.EOF) {
					msg = "expecting " + tokenName; //$NON-NLS-1$
				} else {
					msg = "expecting " + tokenName + " but found " //$NON-NLS-1$ //$NON-NLS-2$
							+ parser.getTokenErrorDisplay(re.token);
				}
			}

		} else if (re instanceof MismatchedTreeNodeException) {
			MismatchedTreeNodeException mtne = (MismatchedTreeNodeException) re;
			String tokenName = "<unknown>"; //$NON-NLS-1$
			if (mtne.expecting == Token.EOF) {
				tokenName = "EOF"; //$NON-NLS-1$
			} else {
				tokenName = tokenNames[mtne.expecting];
			}
			msg = "mismatched tree node: " + mtne.node + " expecting " //$NON-NLS-1$ //$NON-NLS-2$
					+ tokenName;
		} else if (re instanceof NoViableAltException) {
			// NoViableAltException nvae = (NoViableAltException) e;
			// for development, can add
			// "decision=<<"+nvae.grammarDecisionDescription+">>"
			// and "(decision="+nvae.decisionNumber+") and
			// "state "+nvae.stateNumber
			msg = "unexpected "// "no viable alternative at input " //$NON-NLS-1$
					+ parser.getTokenErrorDisplay(re.token);
		} else if (re instanceof EarlyExitException) {
			// EarlyExitException eee = (EarlyExitException) e;
			// for development, can add "(decision="+eee.decisionNumber+")"
			msg = "required (...)+ loop did not match anything at input " //$NON-NLS-1$
					+ parser.getTokenErrorDisplay(re.token);
		} else if (re instanceof MismatchedSetException) {
			MismatchedSetException mse = (MismatchedSetException) re;
			msg = "mismatched input " + parser.getTokenErrorDisplay(re.token) //$NON-NLS-1$
					+ " expecting set " + mse.expecting; //$NON-NLS-1$
		} else if (re instanceof MismatchedNotSetException) {
			MismatchedNotSetException mse = (MismatchedNotSetException) re;
			msg = "mismatched input " + parser.getTokenErrorDisplay(re.token) //$NON-NLS-1$
					+ " expecting set " + mse.expecting; //$NON-NLS-1$
		} else if (re instanceof FailedPredicateException) {
			FailedPredicateException fpe = (FailedPredicateException) re;
			msg = "rule " + fpe.ruleName + " failed predicate: {" //$NON-NLS-1$ //$NON-NLS-2$
					+ fpe.predicateText + "}?"; //$NON-NLS-1$
		}
		if (re.token.getType() == Token.EOF) {
			Token prev = getPrevAfterErrToken(re);
			if (prev != null) {
				re.token = prev;
			}
		}
		int[] errorBounds = getTokenBounds(parser.converter, re.token);
		int start = errorBounds[0];
		int end = start + errorBounds[1];
		String head = "Syntax error, "; //$NON-NLS-1$
		// MessageFormat.format("Syntax error at [{0},{1}], ",
		// start, start + length);
		DefaultProblem defaultProblem = new DefaultProblem("", head + msg, 0,
				new String[] {}, ProblemSeverities.Error, start, end, re.token
						.getLine());
		if (!problems.contains(defaultProblem)) {
			reporter.reportProblem(defaultProblem);
			problems.add(defaultProblem);
		}
	}

	private static Token getPrevAfterErrToken(RecognitionException e) {
		Token errToken = e.token;
		TokenStream stream = (TokenStream) e.input;
		int index = errToken.getTokenIndex();
		if (index == -1) {
			return stream.LT(-1);
		} else if (index - 1 < stream.size()) {
			return stream.get(index - 1);
		}
		return null;
	}

	public static int[] getTokenBounds(TokenConverter converter, Token token) {
		if (converter == null || token == null || token.getType() == Token.EOF) {
			return new int[] { 0, 0 };
		}
		int start = converter.convert(token.getLine(), token
				.getCharPositionInLine());
		int length = token.getText().length();
		return new int[] { start, length };
	}

	public void reportThrowable(Throwable th) {
		FanCore.log("Fan source parser", th);
	}

	public void reportMessage(String msg) {
		FanCore.log("Fan source parser" + msg);
	}
}
