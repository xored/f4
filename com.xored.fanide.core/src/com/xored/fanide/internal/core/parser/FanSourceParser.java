package com.xored.fanide.internal.core.parser;

import org.antlr.runtime.ANTLRStringStream;
import org.antlr.runtime.CharStream;
import org.antlr.runtime.CommonTokenStream;
import org.antlr.runtime.TokenStream;
import org.eclipse.dltk.ast.declarations.ModuleDeclaration;
import org.eclipse.dltk.ast.parser.AbstractSourceParser;
import org.eclipse.dltk.compiler.env.IModuleSource;
import org.eclipse.dltk.compiler.problem.IProblemReporter;

import com.xored.fanide.core.FanCore;

public class FanSourceParser extends AbstractSourceParser {

	/**
	 * Parses selected context to module declaration using Fan parser.
	 */
	public ModuleDeclaration parse(IModuleSource input,
			IProblemReporter reporter) {// throws
		String content0 = input.getSourceContents();
		ModuleDeclaration module = new ModuleDeclaration(content0.length(),
				true);
		CharStream st = new ANTLRStringStream(content0);
		Fan_v1_0_Lexer lexer = new Fan_v1_0_Lexer(st);
		TokenStream stream = new CommonTokenStream(lexer);

		Fan_v1_0_Parser parser = new Fan_v1_0_Parser(stream);
		parser.module = module;
		parser.converter = new TokenConverter(content0.toCharArray());
		parser.factory = new ASTFactory(parser.converter);
		// if (reporter != null) {
		// parser.reporter = new FanErrorReporter(parser.converter, reporter,
		// parser);
		// }
		try {
			parser.compilationUnit();
		} catch (Throwable e) {
			FanCore.log(e);
		}
		module.rebuild();
		return module;
	}

}