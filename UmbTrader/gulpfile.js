var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    gUtil = require('gulp-util'),
    nano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    del = require('del');

var paths = {
    sass: {
        src: './sitefiles/styles/sass/**/*.scss',
        dest: './sitefiles/dist/styles'
    },
    js: {
        src: './sitefiles/scripts/js/**/*.js',
        dest: './sitefiles/dist/scripts'
    }
}

gulp.task('sass', function () {
    return gulp.src(paths.sass.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.sass.dest));        
});

gulp.task('uglify', function () {
    return gulp.src(paths.js.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('watch', ['sass', 'uglify'], function () {
    gulp.watch(paths.sass.src, ['sass']);
    gulp.waych(paths.js.src, ['uglify']);
});

gulp.task('default', ['watch']);