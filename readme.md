# F4 Fantom IDE

## Overview

F4 is Eclipse-based IDE for the [Fantom programming language](http://fantom-lang.org/), which is has been (mostly) written in Fantom using F4 itself.

F4 is based on [Eclipse v4.9 2018-09](https://www.eclipse.org/downloads/packages/release/2018-09/r) with [Dynamic Languages Toolkit (DLTK) v5.10](https://eclipse.org/dltk/).

Pre-compiled installations of F4 may be downloaded from the [GitHub Releases Tab](https://github.com/xored/f4/releases) or (older versions) from the [Xored website](http://www.xored.com/products/f4/).



## Dark Mode

The default eclipse colours for Dark Mode are pretty poor, but are easy enough to change.

[![Doom Vibrant Theme](https://user-images.githubusercontent.com/3326741/126035333-7bdb1d3b-fe2d-454a-9dec-28e7615137a3.png)](https://gist.github.com/SlimerDude/82ba1a11ac57740dd8816409219f29e9)

[Doom Vibrant Theme (Dark)](https://gist.github.com/SlimerDude/82ba1a11ac57740dd8816409219f29e9)


[![Darkula Theme](https://user-images.githubusercontent.com/3326741/138551475-d15ac0ed-9f39-478b-bddb-21794a62f93e.png)](https://gist.github.com/SlimerDude/b75f87284d879ae1d56023bae57e70bd)

[Darkula Theme (Dark)](https://gist.github.com/SlimerDude/b75f87284d879ae1d56023bae57e70bd)



## Contributing / Building F4

Most eclipse plugins are compiled Fantom pods so, interestingly, F4 can only be developed and built with F4!

To setup a development environment to build and run F4:

 - Install [eclipse v4.9 2018-09](https://www.eclipse.org/downloads/packages/release/2018-09/r) -  choose the RCP package so you have eclipse SDK source
 - Install DLTK 5.10 in eclipse using the [Update Site](http://download.eclipse.org/technology/dltk/updates-dev/5.10/)
 - Install F4 features from the Update Respository - see `f4-1.1.4-repository.zip` in releases
 - Clone the [Fantom Runtime](http://github.com/xored/fantom-runtime) repository and import all projects
 - Clone this [F4 IDE](https://github.com/xored/f4) repository and import all projects

Now you can now modify the F4 source code and launch a new verison of F4 by running `com.xored.f4.platform.ide` as an eclipse application.

The dev environment often needs some love to ensure success, I find these hints help:

 - Use an Open JDK / Java 1.8 to run and compile eclipse / F4.
 - Update `eclipse.ini` to point to your JDK of choice and increase the max memory usage:
   ```
   -vm
   C:/Apps/Java/openjdk-1.8.0.161/bin
   -startup
   plugins/org.eclipse.equinox.launcher_1.5.100.v20180827-1352.jar
   --launcher.library
   plugins/org.eclipse.equinox.launcher.win32.win32.x86_64_1.1.800.v20180827-1352
   -showsplash
   com.xored.f4.platform
   -vmargs
   -Xms512m
   -Xmx16384m
   -XX:MaxPermSize=4096m
   ```
 - Eclipse Oomh likes to savage your clean vanilla system with unwanted updates to your preferences. Disable it by going to `Window -> Preferences -> Oomph -> Setup tasks` and ticking `Skip automatic task execution at startup time`. Then reset your preferences, then restart eclipse.
 
 - **Important:** Delete `f4launch.pod` from the default Fantom interpreter - hunt it down in the file system. You're likely to get cyclic project dependency errors if you don't.



## Packaging

Maven is used to package F4, and has been tested with [Maven 3.3.9](http://archive.apache.org/dist/maven/maven-3/3.3.9/binaries/).

Eclipse is used to build all the pods and jars. The Maven build just assembles it all into a executables and Eclipse update repositories. 

 1. Run `mvn clean package` in the root directory of the `Fantom Runtime` project.
 2. Modify `pom.xml` in the F4 project to point to the newly built runtime.
 3. Run `mvn clean package` in the root directory of the `F4` project.
 
Steps 1 & 2 only need to be done the once.

Step 3 builds F4 as standalone product.

An eclipse update site `.zip` will be assembled the `/repository/target/` folder and full installation products may be found under `/product/target/products/`.

Tip - use `mvn -o clean package` to run offline builds.



## Testing

Run `mvn clean verify` in the project root to run [RCPTT](http://rcptt.xored.com/) tests.
