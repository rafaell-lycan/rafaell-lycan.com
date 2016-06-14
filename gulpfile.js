'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    cp = require('child_process');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', 'Explorer >= 9', 'Firefox ESR', 'Opera 12.1', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7'],
    cascade: true
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  return cp.spawn('jekyll', ['build', '-D', '-I', '-q'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'scripts', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_publish'
    },
    host: 'localhost',
    open: false
  });
});

gulp.task('sass', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(['last 2 versions', '> 5%', 'Firefox ESR'], {cascade: true}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('_publish/assets/css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

/**
 * Compile files from assets/js into both _publish/js (for live injecting) and assets (for future jekyll builds)
 */
gulp.task('scripts', function() {
  return gulp.src([
      'src/js/vendors/jquery/dist/jquery.js',
      'src/js/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('_publish/assets/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/js'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch(['**/*.{html,md}', '!assets/**', '!_publish/**'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the Sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
