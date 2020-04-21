# F4 Fantom IDE

## Overview

F4 is Eclipse-based IDE for the [Fantom programming language](http://fantom-lang.org/), which is has been (mostly) written in Fantom using F4 itself.

F4 is based on [Eclipse v4.9 2018-09](https://www.eclipse.org/downloads/eclipse-packages/) with [Dynamic Languages Toolkit (DLTK) v5.10](https://eclipse.org/dltk/).

Pre-compiled installations of F4 may be downloaded from the [GitHub Releases Tab](https://github.com/xored/f4/releases) or (older versions) from the [Xored website](http://www.xored.com/products/f4/).



## Developing

Most eclipse plugins are compiled Fantom pods so, interestingly, F4 can only be developed and built with F4!

To setup a development environment to contribute to F4:

 - Install a recent version of [F4](https://github.com/xored/f4/releases)
 - Install the DLTK v5.9 SDK from the [eclipse Update Website](http://download.eclipse.org/technology/dltk/updates-dev/5.9/) for access to the DLTK source. (Note only the `core` plugins need to be installed.)
 - Clone the [Fantom Runtime](http://github.com/xored/fantom-runtime) repository and import all projects
 - Clone this F4 repository and import all projects

Now you can modify the F4 source code and launch a new verison of F4 by running `com.xored.f4.platform.ide` as an eclipse application.

An alternative is to:
 - Maven build the Fantom Runtime project and then this F4 project
 - Install [eclipse v4.9 2018-09](https://www.eclipse.org/downloads/eclipse-packages/) (choose the RCP package so you have eclipse SDK source)
 - Install [DLTK 5.10](http://download.eclipse.org/technology/dltk/updates-dev/5.10/)
 - Install F4 features from the [local F4 update site](file:/C:/path-to-f4-repo/f4/repository/target/repository/)

Eclipse is used to build all the pods and jars. The Maven build then assembles it all into a executables and Eclipse update sites in `/repository/target/`.



## Packaging

Maven is used to package F4, and has been tested with [Maven 3.3.9](http://archive.apache.org/dist/maven/maven-3/3.3.9/binaries/).

Run `mvn clean package` in the project root to build F4 as standalone product. An eclipse update site will be assembled the `/repository/target/repository/` folder, and full installation products may be found under `/product/target/products/`.



## Testing

Run `mvn clean verify` in the project root to run [RCPTT](http://rcptt.xored.com/) tests.
