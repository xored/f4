## Overview
A branch of the [Xored F4 IDE](https://github.com/xored/f4) for the [Fantom](http://fantom.org) programming language, which was mostly written in Fantom using F4 itself.

## Building 
Maven is used to compile F4. [Maven 3.2.1](http://archive.apache.org/dist/maven/maven-3/3.2.1/binaries/) is known to work.

From the command line, use the following command:

    C:\f4> mvn package

Check the `C:\f4\product\target\products\com.xored.f4.ide\` directory for the newly built F4.

Note the build may fail due to tests not running, but F4 is still built.
