// Karma configuration
// Generated on Sun Jun 25 2017 18:55:49 GMT+0200 (Mitteleuropäische Sommerzeit)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'karma-typescript'],

        // plugins used
        plugins: [
            require('karma-jasmine'),
            require('karma-typescript'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter')
        ],

        // list of files / patterns to load in the browser
        files: [
            './src/test.ts',
            'src/**/*.spec.ts',
            'src/**/*.ts'
        ],


        // list of files to exclude
        exclude: [
            'example/*'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.ts': ['karma-typescript']
        },

        // config for the karma-typescript framework
        // https://www.npmjs.com/package/karma-typescript
        karmaTypescriptConfig: {
            bundlerOptions: {

                transforms: [
                    require('karma-typescript-angular2-transform')
                ]
            },
            include: ["src/**/*.ts"],
            exclude: ["node_modules", "example"],
            compilerOptions: {
                lib: ['ES2015', 'DOM']
            }
        },
        coverageIstanbulReporter: {
            reports: [ 'html', 'lcovonly' ],
            fixWebpackSourcePaths: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'kjhtml','karma-typescript'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // PhantomJS
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: 1
    })
}
