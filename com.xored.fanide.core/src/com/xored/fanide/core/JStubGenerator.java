package com.xored.fanide.core;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import org.fantom.internal.sys.BundleFile;
import org.fantom.internal.sys.EquinoxEnv;

import fan.sys.ClassType;
import fan.sys.Env;
import fan.sys.List;
import fan.sys.LocalFile;
import fan.sys.Pod;
import fanx.emit.FPodEmit;
import fanx.fcode.FStore;
import fanx.emit.FTypeEmit;
import fanx.fcode.FPod;
import fanx.util.Box;

// Note this only seems to be used by com.xored.f4.builder::InternalBuilder
public class JStubGenerator {
	public static void generateStubs(String podFileName, String outDir, Map allPods) throws Exception {
		File podFile = new File(podFileName);
		if (!podFile.exists())
			return;

		File outDirFile = new File(outDir);
		FStore store = null;
		String podName = podFile.getName();
		if (podName.endsWith(".pod")) {
			podName = podName.substring(0, podName.length() - 4);
		}

		// Hack fantom to do our stub generation job
		HashMap map = Pod.storePodsCache();
		EquinoxEnv env = (EquinoxEnv) Env.cur();
		try {
			for (Object key : allPods.keySet()) {
				Object value = allPods.get(key);
				if (key instanceof String && value instanceof LocalFile) {
					env.addJStubPod((String) key, (LocalFile) value);
				}
			}
			env.addJStubPod(podName, new BundleFile(podFile));

			store = FStore.makeZip(podFile);
			FPod fpod = new FPod(podName, store);
			fpod.read();

			Pod pod = new Pod(fpod, new Pod[] {});
			List types = pod.types();

			// write out each type to one or more .class files
			for (int i = 0; i < types.size(); ++i) {
				ClassType type = (ClassType) types.get(i);
				if (type.isNative())
					continue;

				FTypeEmit[] emitted = type.emitToClassFiles();

				// write to file system
				for (int j = 0; j < emitted.length; ++j) {
					FTypeEmit emit = emitted[j];
					add(emit.className, emit.classFile, outDirFile);
				}
			}

			FPodEmit podEmit = FPodEmit.emit(fpod);
			add(podEmit.className, podEmit.classFile, outDirFile);

		} finally {
			if (store != null) try { store.close(); } catch (IOException e) { /* meh */ }
			env.removeJStubPod();
			// Remove all loaded pods from cache
			Pod.restorePodsCache(map);
		}
	}

	private static void add(String className, Box classFile, File outDir) throws Exception {
		String path = className + ".class";
		File f = new File(outDir, path);
		if (!f.getParentFile().exists())
			f.getParentFile().mkdirs();
		OutputStream fout = new FileOutputStream(f);
		fout.write(classFile.buf, 0, classFile.len);
		fout.close();
	}
}
