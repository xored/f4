using [java] com.xored.fanide.core::FanCore
using [java] org.eclipse.core.runtime::Status
using [java] org.eclipse.core.runtime::IStatus
using [java] fanx.interop::Interop

class LogUtil {

	public static Void logErr(Str pluginId, Str? message, Err? e := null) {
		FanCore.getDefault.getLog.log(Status(IStatus.ERROR, pluginId, message, e == null ? null : Interop.toJava(e)))
	}

	public static Void logWarn(Str pluginId, Str? message, Err? e := null) {
		FanCore.getDefault.getLog.log(Status(IStatus.WARNING, pluginId, message, e == null ? null : Interop.toJava(e)))
	}

}
