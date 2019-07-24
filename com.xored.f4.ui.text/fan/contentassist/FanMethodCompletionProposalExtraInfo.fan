using f4model

const class FanMethodCompletionProposalExtraInfo {
	const IFanMethod method
	const IFanParam[] params

	new make(IFanMethod method, IFanParam[] params) {
		this.method = method
		this.params = params
	}
}
