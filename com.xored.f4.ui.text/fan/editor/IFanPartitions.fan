using [java] org.eclipse.jface.text::IDocument
using [java] com.xored.fanide.core::FanConstants

mixin IFanPartitions {
	static const Str partitioning := FanConstants.FAN_PARTITIONING
	static const Str multiLineComment := "__fan_multi_line_comment"
	static const Str singleLineComment := "__fan_single_line_comment"
	static const Str interpreterString := "__fan_interpreter_string"
	static const Str fandoc := "__fan_doc"
	static const Str string := "__fan_string"
	static const Str dsl := "__fan_dsl"

	static const Str[] partitionTypes := [string, multiLineComment,
		interpreterString, singleLineComment, fandoc, dsl,
    IDocument.DEFAULT_CONTENT_TYPE ]
}

