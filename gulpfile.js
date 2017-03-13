var 
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    gnf = require('gulp-npm-files'),
    exec = require('child_process').exec;

gulp.task('clean', function () {
    return gulp.src('dist/*', {read: false}).pipe(clean());
});

gulp.task('resolve-src', function() {
    return gulp.src('src/*').pipe(gulp.dest('dist'));
});

gulp.task('resolve-node-modules', function() {
    return gulp.src(gnf(), {base:'./'}).pipe(gulp.dest('./dist'));
});

gulp.task('run', function() {
    exec('node server.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });  
});

gulp.task('dev', function () {
    exec('node server.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });  

    gulp.watch('src/**/*', 
        gulp.series(
            'clean', 
            'resolve-src', 
            'resolve-node-modules'
        )
    );
});

