import gulp from 'gulp';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import terser from 'gulp-terser';
import pimport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import sync from 'browser-sync';
import gcmq from 'gulp-group-css-media-queries';
import rename from 'gulp-rename';

const PROJECT_FOLDER = 'dist';
const SOURCE_FOLDER = 'src';
const PATH_LIST = {
  SRC: {
    HTML: `${SOURCE_FOLDER}/*.html`,
    STYLES: `${SOURCE_FOLDER}/styles/index.css`,
    SCRIPTS: `${SOURCE_FOLDER}/scripts/**/*.js`,
    IMAGES: `${SOURCE_FOLDER}/images/**/*.{jpeg,jpg,png,svg,webp,avif}`,
    FONTS: `${SOURCE_FOLDER}/fonts/**/*.{ttf,woff,woff2}`,
  },
  WATCH: {
    HTML: `${SOURCE_FOLDER}/**/*.html`,
    STYLES: `${SOURCE_FOLDER}/styles/**/*.css`,
    SCRIPTS: `${SOURCE_FOLDER}/scripts/**/*.js`,
    IMAGES: `${SOURCE_FOLDER}/images/**/*.{jpeg,jpg,png,svg,webp,avif}`,
    FONTS: `${SOURCE_FOLDER}/fonts/**/*.{ttf,woff,woff2}`,
  },
};

// ===  HTML ===
export const html = () => {
  return gulp.src(PATH_LIST.SRC.HTML, { base: SOURCE_FOLDER }).pipe(gulp.dest(PROJECT_FOLDER)).pipe(sync.stream());
};

// === Styles ===
export const styles = () => {
  return gulp
    .src(PATH_LIST.SRC.STYLES, { base: SOURCE_FOLDER })
    .pipe(postcss([pimport]))
    .pipe(gcmq())
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ['last 5 versions'],
          cascade: true,
        }),
      ])
    )
    .pipe(gulp.dest(PROJECT_FOLDER))
    .pipe(postcss([csso]))
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(gulp.dest(PROJECT_FOLDER))
    .pipe(sync.stream());
};

// === Scripts ===
export const scripts = () => {
  return gulp
    .src(PATH_LIST.SRC.SCRIPTS, { base: SOURCE_FOLDER })
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(gulp.dest(PROJECT_FOLDER))
    .pipe(terser())
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    .pipe(gulp.dest(PROJECT_FOLDER))
    .pipe(sync.stream());
};

// === Move Images ===
export const moveImages = () => {
  return gulp
    .src(PATH_LIST.SRC.IMAGES, { base: SOURCE_FOLDER })
    .pipe(gulp.dest(PROJECT_FOLDER))
    .pipe(
      sync.stream({
        once: true,
      })
    );
};

// === Move Fonts ===
export const moveFonts = () => {
  return gulp
    .src(PATH_LIST.SRC.FONTS, { base: SOURCE_FOLDER })
    .pipe(gulp.dest(PROJECT_FOLDER))
    .pipe(
      sync.stream({
        once: true,
      })
    );
};

// === Server ===
export const server = () => {
  sync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: PROJECT_FOLDER,
    },
  });
};

// === Watch ===
export const watch = () => {
  gulp.watch(PATH_LIST.WATCH.HTML, gulp.series(html));
  gulp.watch(PATH_LIST.WATCH.STYLES, gulp.series(styles));
  gulp.watch(PATH_LIST.WATCH.SCRIPTS, gulp.series(scripts));
  gulp.watch(PATH_LIST.WATCH.IMAGES, gulp.series(moveImages));
  gulp.watch(PATH_LIST.WATCH.FONTS, gulp.series(moveFonts));
};

// === Default ===
export default gulp.series(gulp.parallel(html, styles, scripts, moveImages, moveFonts, watch, server));
