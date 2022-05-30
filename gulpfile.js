const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
//const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const terser = require('gulp-terser');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const paths = {
    html: {
        src: ['./src/**/*.html'],
        dest: './dist/',
    },
    images: {
        src: ['./src/img/**/*'],
        dest: './dist/img/',
    },
    styles: {
        src: ['./src/css/scss/**/*.scss'],
        dest: './dist/css/',
    },
    stylesSrc: {
        src: ['./src/css/scss/**/*.scss'],
        dest: './src/css/',
    },
    scripts: {
        src: ['./src/js/**/*.js'],
        dest: './dist/js/',
    },
    cachebust: {
        src: ['./dist/**/*.html'],
        dest: './dist/',
    },
};

function copyHtml() {
    return src(paths.html.src).pipe(dest(paths.html.dest));
}

function compileStyles() {
    return src(paths.stylesSrc.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.stylesSrc.dest));
}

function compileStylesMin() {
    return src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.styles.dest));
}


function minifyScripts() {
    return src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(terser().on('error', (error) => console.log(error)))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.scripts.dest));
}

function cacheBust() {
    return src(paths.cachebust.src)
        .pipe(replace(/cache_bust=\d+/g, 'cache_bust=' + new Date().getTime()))
        .pipe(dest(paths.cachebust.dest));
}

function watcher() {
    watch(paths.html.src, series(copyHtml, cacheBust));
    watch(paths.styles.src, parallel(compileStylesMin, cacheBust));
    watch(paths.stylesSrc.src, parallel(compileStyles, cacheBust));
    watch(paths.scripts.src, parallel(minifyScripts, cacheBust));
}

exports.copyHtml = copyHtml;
exports.compileStyles = compileStyles;
exports.compileStylesMin = compileStylesMin;
exports.minifyScripts = minifyScripts;
exports.cacheBust = cacheBust;
exports.watcher = watcher;

exports.default = series(
    parallel(copyHtml, compileStyles, compileStylesMin, minifyScripts),
    cacheBust,
    watcher
);
