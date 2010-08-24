package com.xored.fanide.internal.core.parser;

import org.eclipse.dltk.compiler.SourceElementRequestVisitor;
import org.eclipse.dltk.core.AbstractSourceElementParser;

import com.xored.fanide.core.FanNature;

public class FanSourceElementParser extends AbstractSourceElementParser {

	@Override
	protected String getNatureId() {
		return FanNature.NATURE_ID;
	}

	@Override
	protected SourceElementRequestVisitor createVisitor() {
		return new FanSourceElementRequestVisitor(getRequestor());
	}
}
