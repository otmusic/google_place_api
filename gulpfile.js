/**
 * Created by djex on 13.08.16.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var minify = require('gulp-minify');

gulp.task('default', ['build-js-dev', 'build-js-prod', 'build-css', 'watch']);

gulp.task('build-js-dev', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/underscore/underscore.js',
        'node_modules/backbone/backbone.js',
        'node_modules/requirejs/require.js',
        'js/app/**/*.js',
        'js/main.js'
    ])
        .pipe(concat('build.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('build-js-prod', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/underscore/underscore.js',
        'node_modules/backbone/backbone.js',
        'node_modules/requirejs/require.js',
        'js/app/**/*.js',
        'js/main.js'
    ])
        .pipe(concat('build.js'))
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('build-css', function () {
    return gulp.src([
        'scss/main.scss'
    ])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concatCss("main.css"))
        .pipe(gulp.dest('css/'));
});

gulp.task('watch', function(){
    gulp.watch('js/**/*.js', ['build-js-dev']);
    gulp.watch('scss/**/*.scss', ['build-css']);
});
