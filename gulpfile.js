var gulp = require('gulp');
var run = require('gulp-run');


/**
 * A wrapper for the meteor command
 * @param {string} args
 * @returns {Promise}
 */
function meteor(args){
    if(!args) args = "";
    return run('meteor '+args, {cwd: 'src', verbosity: 3}).exec();
}

/**
 * Building a tarball to build/src.tar.gz
 */
gulp.task('build', function(){
    return meteor('build ../build');
});

/**
 * Start the meteor app
 */
gulp.task('default', function(){
    return meteor();
});