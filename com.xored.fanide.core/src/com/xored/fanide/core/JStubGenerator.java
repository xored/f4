package com.xored.fanide.core;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import org.fantom.internal.sys.BundleFile;
import org.fantom.internal.sys.EquinoxEnv;

import fan.sys.ClassType;
import fan.sys.Env;
import fan.sys.Func;
import fan.sys.LocalFile;
import fan.sys.Pod;
import fanx.emit.FPodEmit;
import fanx.emit.FTypeEmit;
import fanx.fcode.FPod;
import fanx.fcode.FStore;
import fanx.util.Box;

public class JStubGenerator {
	public static void generateStubs(String podFileName, String outDir,
			Map allPods) {
		File podFile = new File(podFileName);
		if( !podFile.exists()) {
			return;
		}
		File outDirFile = new File(outDir);
		FStore store;
		String podName = podFile.getName();
		if (podName.endsWith(".pod")) {
			podName = podName.substring(0, podName.length() - 4);
		}
		// Hack fantom to do our stub generation job
		HashMap map = Pod.storePodsCache();
		EquinoxEnv env = (EquinoxEnv) Env.cur();
		try {
			// Clear current pod cache

			store = FStore.makeZip(podFile);
			FPod fpod = new FPod(podName, store);
			fpod.read();
			Pod pod = new Pod(fpod);
			for (Object key : allPods.keySet()) {
				Object value = allPods.get(key);
				if (key instanceof String && value instanceof LocalFile) {
					env.addJStubPod((String) key, (LocalFile) value);
				}
			}
			env.addJStubPod(podName, new BundleFile(podFile));

			ClassType[] types = (ClassType[]) pod.types().toArray(
					new ClassType[pod.types().sz()]);

			try {
				// emit pod - we have to read back the pod here because normal
				// pod loading clears all these tables as soon as Pod$ is
				// emitted
				FPod fpod2 = new FPod(podName, store);
				fpod2.read();
				FPodEmit podEmit = FPodEmit.emit(fpod2);
				add(podEmit.className, podEmit.classFile, outDirFile);

				// write out each type to one or more .class files
				for (int i = 0; i < types.length; ++i) {
					ClassType type = types[i];
					if (type.isNative())
						continue;

					FTypeEmit[] emitted = type.emitToClassFiles();

					// write to jar
					for (int j = 0; j < emitted.length; ++j) {
						FTypeEmit emit = emitted[j];
						add(emit.className, emit.classFile, outDirFile);
					}
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (Throwable e) {
			e.printStackTrace();
		} finally {
			env.removeJStubPod();
			// Remove all loaded pods from cache
			Pod.restorePodsCache(map);
		}
	}

	private static void add(String className, Box classFile, File outDir)
			throws Exception {
		String path = className + ".class";
		File f = new File(outDir, path);
		if (!f.getParentFile().exists())
			f.getParentFile().mkdirs();
		OutputStream fout = new FileOutputStream(f);
		fout.write(classFile.buf, 0, classFile.len);
		fout.close();
	}
}
