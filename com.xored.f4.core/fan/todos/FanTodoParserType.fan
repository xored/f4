
using [java]com.xored.fanide.core
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.builder
using [java]org.eclipse.dltk.compiler.task

class FanTodoParserType : AbstractTodoTaskBuildParticipantType {
	
	override IBuildParticipant? getBuildParticipant(ITodoTaskPreferences? preferences) {
		return FanTodoTaskBuildParticipant(preferences)
	}

	override ITodoTaskPreferences? getPreferences(IScriptProject? project) {
		return TodoTaskPreferencesOnPreferenceLookupDelegate(FanCore.PLUGIN_ID, project)
	}
}
