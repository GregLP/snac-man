/**
 * Gulp Packages
 */

// General
const { src, dest, watch, series, parallel } = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');

//Scripts
const terser = require('gulp-terser');
const concat = require('gulp-concat');

//Styles
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

//HTML
const svgmin = require('gulp-svgmin');
const htmlmin = require('gulp-htmlmin');



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
    svgs: {
        src: 'src/img/**/*.svg',
        dest: 'dist/img/'
    },
};

/*function copyHtml() {
    return src(paths.html.src).pipe(dest(paths.html.dest));
}*/

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

// Optimize SVG files
function buildSVGs() {
    // Optimize SVG files
    return src(paths.svgs.src)
        .pipe(svgmin())
        .pipe(dest(paths.svgs.dest));

}

function minifyHtml() {
    return src(paths.html.src)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(paths.html.dest));
}

function watcher() {
    watch(paths.html.src, series(minifyHtml, cacheBust));
    watch(paths.styles.src, parallel(compileStylesMin, cacheBust));
    watch(paths.stylesSrc.src, parallel(compileStyles, cacheBust));
    watch(paths.scripts.src, parallel(minifyScripts, cacheBust));
}

//exports.copyHtml = copyHtml;
exports.minifyHtml = minifyHtml;
exports.compileStyles = compileStyles;
exports.compileStylesMin = compileStylesMin;
exports.minifyScripts = minifyScripts;
exports.buildSVGs = buildSVGs;
exports.cacheBust = cacheBust;
exports.watcher = watcher;

exports.default = series(
    parallel(minifyHtml, compileStyles, compileStylesMin, minifyScripts, buildSVGs),
    cacheBust,
    watcher
);
