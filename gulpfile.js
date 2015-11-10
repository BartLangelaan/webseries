var gulp = require('gulp');
var run = require('gulp-run');
var protractor = require("gulp-protractor").protractor;
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;


/**
 * A wrapper for the meteor command
 * @param {string} args
 * @returns {Promise}
 */
function meteor(args, callback){
    console.log(typeof args);
    if(typeof args == "function"){
        callback = args;
        args = null;
    }
    if(!args) args = "";
    if(!callback) callback = function(){};
    return run('meteor '+args, {cwd: 'src', verbosity: 3}).exec(callback);
}


gulp.task('start', function(){
    meteor();
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

gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('test', ['start'], function(){
    gulp.start("webdriver_standalone");
    gulp.src(["tests/*.test.js"])
        .pipe(protractor({
            configFile: "protractor.config.js"
        }))
        .on('error', function(e) { throw e })
});