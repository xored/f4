using f4builder
using [java] org.eclipse.ui.console

class ConsoleFactory : IConsoleFactory {
	override Void openConsole() {
		CompileFan.console.activate
	}
}
