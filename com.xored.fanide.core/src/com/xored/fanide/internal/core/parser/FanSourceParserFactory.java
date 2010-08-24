package com.xored.fanide.internal.core.parser;

import org.eclipse.dltk.ast.parser.ISourceParser;
import org.eclipse.dltk.ast.parser.ISourceParserFactory;

/**
 * Returns instances of the Fan source parser
 */
public class FanSourceParserFactory implements ISourceParserFactory {

	/*
	 * @see org.eclipse.dltk.ast.parser.ISourceParserFactory#createSourceParser()
	 */
	public ISourceParser createSourceParser() {
		return new FanSourceParser();
	}
}
