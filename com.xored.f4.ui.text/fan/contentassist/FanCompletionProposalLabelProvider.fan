using [java] org.eclipse.dltk.ui.text.completion::CompletionProposalLabelProvider
using [java] org.eclipse.dltk.core::CompletionProposal

using f4core
using f4model

class FanCompletionProposalLabelProvider : CompletionProposalLabelProvider {
	
	override protected Str? createMethodProposalLabel(CompletionProposal? methodProposal) {
		extraInfo := methodProposal.getExtraInfo as FanMethodCompletionProposalExtraInfo
		params := extraInfo.params
		method := extraInfo.method

		buffer := StrBuf()

		// method name
		buffer.add(methodProposal.getName);

		// parameters
		buffer.addChar('(')
		buffer.add(params.map { "${prettyType(it.of)} $it.name" }.join(", "))
		buffer.addChar(')')

		// return type
		buffer.add(" : ")
		buffer.add(prettyType(method.of))

		// element name
		buffer.add(" - ")
		buffer.add(prettyType(method.parent))

		return buffer.toStr
	}

	private static Str prettyType(Str type) {
		ParseUtil.splitByQnames(type).map |e -> Str| {
			// add spaces after commas
			if (e.endsWith(",")) { return "$e "}
			
			// add spaces around arrows
			if (e.endsWith("->")) { return e[0..-3] + " -> " }
			
			// remove sys:: pod from typenames
			if (e.startsWith("sys::")) { return e[5..-1] }

			return e
		}.join
	}
}
