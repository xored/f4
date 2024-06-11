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
import fan.sys.Err;
import fan.sys.List;
import fan.sys.FanObj;
import fan.sys.LocalFile;
import fan.sys.Pod;
import fanx.fcode.FStore;
import fanx.fcode.FPod;
import fanx.emit.FPodEmit;
import fanx.emit.FTypeEmit;
import fanx.util.Box;

// Note this only seems to be used by com.xored.f4.builder::InternalBuilder
// This class exists here so it has access to EquinoxEnv 
public class JStubGenerator {
	
	// Creates a pod file without *loading* it into the current Env
	public static Pod makePod(String podName, fan.sys.File file) {
		// largely copied from fan.sys.Pod.load()
		FStore fstore = null;
		try {
				   fstore = FStore.makeZip(new File(file.osPath()));
			FPod   fpod   = new FPod(podName, fstore);

			// compilerEs only cares for pod.meta and any depends for writing "require" statements
			fpod.read(); 
			
			// delete the pod's 'types' to prevent Pod.load() from loading yet moar pods! [called from Pod.ctor] 
			fpod.types	= null;
			
			// now construct a basic Pod obj - all we care for is the meta depends list!!! 
			Pod    pod	= new Pod(fpod, new Pod[]{});
			return pod;
		}
		catch (Exception e) {
			throw Err.make(e);
		} finally {
			if (fstore != null) try { fstore.close(); } catch (IOException e) { /* meh */ }
		}
	}

	public static void generateStubs(String podName, String podPath, String outDirPath, Map resolvedPodFiles) throws Exception {
		File podFile = new File(podPath);
		if (podFile.exists() == false)
			return;
		
		File		outDirFile	= new File(outDirPath);
		FStore		store		= null;
		HashMap		podsByName	= Pod.getCopyOfPodsByName();
		EquinoxEnv	env			= (EquinoxEnv) Env.cur();
		try {
			for (Object key : resolvedPodFiles.keySet()) {
				Object value = resolvedPodFiles.get(key);
				if (key instanceof String && value instanceof LocalFile)
					env.addJStubPod((String) key, (LocalFile) value);
				else
					FanObj.echo(key.toString() + " not a LocalFile but is " + value.getClass().toString());
			}
			// do last to overwrite existing val
			env.addJStubPod(podName, new BundleFile(podFile));

			// create a new in-memory pod to read from
			store = FStore.makeZip(podFile);
			FPod fpod = new FPod(podName, store);
			fpod.read();

			// this ctor will indirectly try to load other referenced pods from Env.cur()
			// which is why we stub them about above
			Pod	 pod  = new Pod(fpod, new Pod[] {});

			// this code is now as per the original Jstub.java
			FPodEmit podEmit = FPodEmit.emit(fpod);
			add(podEmit.className, podEmit.classFile, outDirFile);

			// write out each type to one or more .class files
			List types = pod.types();
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

		} finally {
			if (store != null) try { store.close(); } catch (IOException e) { /* meh */ }

			// Remove all loaded pods from cache
			// alleviate future "File locked" exceptions by closing ALL new pod files
			Pod.setPodsByName(podsByName);
			env.removeJStubPod();
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
