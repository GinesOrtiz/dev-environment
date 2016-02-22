'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var modRewrite = require('connect-modrewrite');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');

/*
 Gulp will run a server in the port 8080 with ./app folder on it
 */
gulp.task('connect', function () {
    browserSync.init({
        notify: false,
        port: 8080,                         // localhost:8080
        timestamps: true,                         // localhost:8080
        server: {
            baseDir: 'app',               // Main app folder
            middleware: [                   // if HTML5 enabled this is required
                modRewrite([
                    '/assets/(.*) /assets/$1 [L]',
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });
});

/*
 NodeSASS compiler
 */

gulp.task('sass', function () {
    gulp.src([
            'app/src/sass/style.scss',
            'app/src/sass/**/*.scss'
        ])
        .pipe(concat('style.css'))
        .pipe(sass())
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    gulp.src('app/**/*.html')
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src([
            'app/src/js/_router.js',
            'app/src/js/app.js',
            'app/src/js/**/*.js'
        ])
        .pipe(concat('app.js'))                     // Name of concat file
        .pipe(gulp.dest('./app/assets/js/'))        // Folder to save the file
        .pipe(browserSync.stream());                  // Force the reload to see the changes
});

/*
 All the watchers we need to reload our page as soon as we save the file
 */
gulp.task('watch', function () {
    gulp.watch(['app/**/*.html'], ['html']);
    gulp.watch(['app/src/**/*.js'], ['js']);
    gulp.watch(['app/src/**/*.scss'], ['sass']);
});


/*
 This two functions will compress the bower dependences. In those cases we need to specify the entire path of the files
 because we only want specific files. The order is important because is a hierarchy
 */
gulp.task('vendors:css', function () {
    return gulp.src([
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/font-awesome/css/font-awesome.min.css'
        ])
        .pipe(concat('vendors.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('vendors:js', function () {
    return gulp.src([
            'bower_components/bootstrap/dist/bootstrap.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery/dist/jquery.min.js'
        ])
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/assets/js/'));
});

/*
 Main Gulp process to start all development mode. This task will not minify the app.js result in order to make it
 simple to debuggate
 */
gulp.task('start', ['connect', 'watch', 'sass', 'vendors:css', 'vendors:js', 'js']);