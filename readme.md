# F4 Fantom IDE

## Overview

F4 is Eclipse-based IDE for the [Fantom programming language](http://fantom-lang.org/), which is has been (mostly) written in Fantom using F4 itself.

F4 is based on [Eclipse v4.6 Neon](https://www.eclipse.org/downloads/eclipse-packages/) with [Dynamic Languages Toolkit (DLTK) v5.5](https://eclipse.org/dltk/).



## Compiling from Source

Most eclipse plugins are compiled Fantom pods so, interestingly, F4 can onlt be built with F4!

Currently compiled pods are stored in plug-ins, as F4 can be built only using F4. Therefore, to work on F4 sources use the following workflow:

 - Install the latest F4 IDE from [F4 Nightly Downloads](http://download.xored.com/f4/nightly/)
 - Clone the [Fantom Runtime](http://github.com/xored/fantom-runtime) repository and import all projects
 - Clone this F4 repository and import all projects

Now you can modify the F4 source code and launch a new verison of F4 by running `com.xored.f4.product` as an eclipse application.

An alternative to installing F4 is installing [eclipse v4.6 Neon](https://www.eclipse.org/downloads/eclipse-packages/) (choose the RCP package so you have eclipse SDK source) and then installing F4 features from the [F4 Stable Update Site](http://download.xored.com/f4/updates/stable/) or from the [F4 Nightly Downloads](http://download.xored.com/f4/nightly/).

Tip: Install the [DLTK v5.5 SDK](http://download.eclipse.org/technology/dltk/updates-dev/5.5/) for DLTK source.



## Packaging

Maven is used to package F4, and has been tested with [Maven 3.2.1](http://archive.apache.org/dist/maven/maven-3/3.2.1/binaries/).

Run `mvn clean package` in the project root to build F4 as standalone product. An eclipse update site will be assembled the `/repository/target/repository/` folder, and full installation products may be found under `/product/target/products/`.



## Testing

Run `mvn clean verify` in the project root to F4 and run [RCPTT](http://rcptt.xored.com/) tests.
