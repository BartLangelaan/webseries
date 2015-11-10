var gulp = require('gulp');
var run = require('gulp-run');
var protractor = require("gulp-protractor").protractor;


/**
 * A wrapper for the meteor command
 * @param {string} args
 * @returns {Promise}
 */
function meteor(args, callback){
    if(!args) args = "";
    if(!callback) callback = function(){};
    return run('meteor '+args, {cwd: 'src', verbosity: 3}).exec(callback);
}


gulp.task('start', function(callback){
    meteor();
    setTimeout(function(){
        callback();
    }, 20000);
});

/**
 * Building a tarball to build/src.tar.gz
 */
gulp.task('build', function(){
    return meteor('build ../build');
});

/**
 * Start the meteor app
 */
gulp.task('default', ['start'], function(callback){

});

gulp.task('selenium:start', function(callback){
    run('webdriver-manager update').exec(function() {
        var webdriverStart = run('webdriver-manager start', {verbosity: 3}).exec();
        setTimeout(function(){
            callback();
        }, 1000);
    });
});

gulp.task('test', ['selenium:start', 'start'], function(){
    gulp.src(["tests/*.test.js"])
        .pipe(protractor({
            configFile: "protractor.config.js"
        }))
        .on('error', function(e) { throw e })
});