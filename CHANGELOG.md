# CHANGELOG

## 0.4.0

* Merged `dispatch:mocha-browser` into this package. To replicate that package, run in watch mode without setting the `TEST_BROWSER_DRIVER` environment variable.

## 0.3.0

* To run all tests with names that match a pattern, add the environment variable `MOCHA_GREP=your_string`. This will apply to both client and server tests. To run all tests EXCEPT those that match the pattern, additionally set `MOCHA_INVERT=1`.
* You can now skip running client tests with `TEST_CLIENT=0` or skip running server tests with `TEST_SERVER=0`
* Support for XUnit output to file

## 0.2.0

* Bump aldeed:browser-tests to fix PhantomJS testing and add support for showing Electron window
* Run tests in series by default with TEST_PARALLEL=1 option to start running client tests while server tests are still running (previous behavior). This is kind of a breaking change, but we decided that a minor version bump was sufficient since it does not break anything.

## 0.1.0

* Added support for running client tests in various browsers
