var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    gUtil = require('gulp-util'),
    nano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    del = require('del'),
    runSequence = require('run-sequence');

var paths = {
    sass: {
        src: './sitefiles/src/styles/sass/**/*.scss',
        dest: './sitefiles/dist/styles'
    },
    js: {
        src: './sitefiles/src/scripts/js/**/*.js',
        dest: './sitefiles/dist/scripts'
    },
    vendor: {
        scripts: {
            src: './sitefiles/src/scripts/vendor/**/*.js',
            dest: './sitefiles/dist/vendor/scripts'
        },
        styles: {
            css: {
                src: './sitefiles/src/styles/vendor/**/*.css',
                srcMin: './sitefiles/src/styles/vendor/**/*.min.css',
                dest: './sitefiles/dist/vendor/styles'
            },
            sass: {
                src: './sitefiles/src/styles/vendor/**/*.sass',
                dest: './sitefiles/src/styles/vendor/css'
            }
        }
    }
}

gulp.task('clean', function () {
    return del(['./sitefiles/dist']);
});

gulp.task('sass', function () {
    return gulp.src(paths.sass.src)
        .pipe(sass())
        .pipe(nano())
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(browserSync.stream());
});
gulp.task('sass:vendor', function () {
    gulp.src(paths.vendor.styles.sass.src)
        .pipe(sass())
        .pipe(nano())
        .pipe(gulp.dest(paths.vendor.styles.sass.dest));
});

gulp.task('uglify', function () {
    return gulp.src(paths.js.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
});

gulp.task('move:vendor', function () {
    gulp.src(paths.vendor.scripts.src)
        .pipe(gulp.dest(paths.vendor.scripts.dest));
    gulp.src(paths.vendor.styles.css.src)
        .pipe(nano())
        .pipe(gulp.dest(paths.vendor.styles.css.dest));
    gulp.src(paths.vendor.styles.css.srcMin)
        .pipe(gulp.dest(paths.vendor.styles.css.dest));
    return;
});

gulp.task('build', function (callback) {
    runSequence('clean', ['sass', 'sass:vendor', 'uglify'], 'move:vendor', callback);
});

gulp.task('serve', ['build'], function () {

    browserSync.init({
        proxy: "http://localhost"
    });

    gulp.watch(paths.sass.src, ['sass']);
    gulp.watch(paths.js.src, ['uglify']);
    gulp.watch("./Views/**/*.cshtml").on('change', browserSync.reload);
});


gulp.task('default', ['build']);