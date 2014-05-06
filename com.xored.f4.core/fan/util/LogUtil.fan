using [java] com.xored.fanide.core::FanCore
using [java] org.eclipse.core.runtime::Status
using [java] org.eclipse.core.runtime::IStatus


class LogUtil
{
  public static Void logErr(Str pluginId, Str? message, Err? e := null)
  {
    FanCore.getDefault.getLog.log(Status(IStatus.ERROR, pluginId, message, e?->toJava))
  }

  public static Void logWarn(Str pluginId, Str? message, Err? e := null)
  {
    FanCore.getDefault.getLog.log(Status(IStatus.WARNING, pluginId, message, e?->toJava))
  }

}
