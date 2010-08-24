package com.xored.fanide.internal.core.parser;

public class TokenConverter {
	String content;
	CodeModel model;

	private static class CodeModel {
		private String[] codeLines;

		private int[] codeLineLengths;

		public CodeModel(String code) {
			boolean fakeLastLine = code.endsWith("\n");
			if (fakeLastLine) {
				this.codeLines = (code + " ").split("\n");
				this.codeLines[this.codeLines.length - 1] = "";
			} else {
				this.codeLines = code.split("\n");
			}

			int count = this.codeLines.length;
			this.codeLineLengths = new int[count];

			int sum = 0;
			for (int i = 0; i < count; ++i) {
				this.codeLineLengths[i] = sum;
				sum += this.codeLines[i].length() + 1;
			}
		}

		public int[] getBounds(int lineNumber) {
			if (lineNumber < 0)
				lineNumber = 0;
			String codeLine = codeLines[lineNumber];

			int start = codeLineLengths[lineNumber];
			int end = start + codeLine.length();

			return new int[] { start, end };
		}
	}

	public TokenConverter(char[] content0) {
		this.content = new String(content0);
		this.model = new CodeModel(content);
	}

	public int convert(int line, int offset) {
		int[] bounds = this.model.getBounds(line - 1);
		return bounds[0] + offset;
	}

	public int length() {
		return this.content.length();
	}

	public String get(int start, int end) {
		return content.substring(start, end);
	}
}
