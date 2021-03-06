var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('autoprefixer-core'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    gulpif = require('gulp-if'),
    del = require('del'),
    replace = require('gulp-replace'),
    argv = require('yargs').argv,
    uglify = require('gulp-uglify'),
    reactify = require('reactify'),
    browserSync = require('browser-sync');


// Enable 'production' distribution by adding '--production'
var isProduction = argv.production != null;

// Location of the frontend source files.
const APP = './src';
const DIST = './dist';
const JS = '/js';
const CSS = '/css';
const SCSS = '/scss';
const FONTS = '/fonts';

const MAIN = 'main.js';
const LIBS = 'libs.js';
const STATICS = [
  APP + '/**/*.+(png|jpg|jpeg|ico|json|html|mp3|ttf)',
  '!' + APP + SCSS + '/**/*',
];
const CONFIGS = './config/keycloak.json';


// Any external packages that should be referenced from outside of your 'main.js' file.
// 'expose' is how you want to want to reference that lib from your main. Is optional.
const EXTERNALS = [
  { require: 'react' },
  { require: 'react/lib/keyMirror' },
  { require: 'request' },
  { require: 'flux' },
  { require: 'underscore' },
  { require: './config/ApiSettings.js', expose: 'brews-config' },
  { require: './bower_components/keycloak/dist/keycloak.js', expose: 'keycloak' },
];

const PROD_CONFIG = {
  sass: {
    style: 'compressed'
  },
  browserify: { },
};

const CONFIG = isProduction ? PROD_CONFIG : require('./config/gulp-dev-config.json');


// =============================================
// Gulp tasks


  /* Clean the dist folder */
gulp.task('clean', function() {
  return del([DIST]);
});


  /* Copies fonts from node_modules to the dist folder */
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest(DIST + FONTS));
});


  /* Copy all the statics into the dist folder and if is production, replaces .css, .js with .min.css ir .min.js in html files */
gulp.task('statics', function() {
  // base allows for full path to statics from that directory
  // ex: src/app/fonts/example/Example.ttf -> /dist/fonts/example/Example.ttf
  gulp.src(STATICS, { base: APP })
    .pipe(gulp.dest(DIST));

  gulp.src(CONFIGS).pipe(gulp.dest(DIST));

  if(!isProduction) {
    return;
  }

  // replaces .css and .js with .min prefixed.
  return gulp.src(APP + '/**/*.html')
    .pipe(replace(/(\.(js|css))/g,'.min$1'))
    .pipe(gulp.dest(DIST));
});
gulp.task('statics-watch', ['statics'], browserSync.reload);



  /* Compile the scss files, copy to dist folder, and if not production, auto inject css instead of reload */
gulp.task('styles', function() {
  return sass(APP + SCSS, CONFIG.sass)
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 version']
      }),
    ]))
    .pipe(gulpif(isProduction, rename({ suffix: '.min' })))
    .pipe(gulp.dest(DIST + CSS))
    .pipe(gulpif(!isProduction, browserSync.stream()));
});
gulp.task('styles-watch', ['styles']);



/*
 * Helper function for bundling apps and libs. Pass
 * in the bundle browerserify bundle you want to bundle, the bundled filename,
 * and type of this bundle (libs, main, etc).
 *
 * If this is production, the bundle will be minified and renamed to have a '.min' prefix.
 */
function bundle(b, fileName, type) {
  return b.bundle()
    .on('error', function(err) {
      console.error('[' + type + ' ERROR]', err.message);
      this.emit('end');
    })
    .pipe(source(fileName))
    .pipe(buffer())
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(isProduction, rename({ suffix: '.min' })))
    .pipe(gulp.dest(DIST + JS));
}

  /* Bundle the libs scripts to be used from the main app */
gulp.task('libs-scripts', function() {
  var vendors = browserify();
  EXTERNALS.forEach(function(external) {
    if(external.expose) {
      vendors.require(external.require, { expose: external.expose });
    } else {
      vendors.require(external.require);
    }
  });

  return bundle(vendors, LIBS, 'LIBS');


});
gulp.task('libs-scripts-watch', ['libs-scripts'], browserSync.reload);


  /* Bundles the main script, distributes it, and adds references to the libs */
gulp.task('scripts', function() {
  var b = browserify(CONFIG.browserify);
  b.add(APP + JS + '/' + MAIN);
  b.transform(reactify);

  EXTERNALS.forEach(function(external) {
    if(external.expose) {
      b.external(external.expose);
    } else {
      b.external(external.require);
    }
  });
  
  return bundle(b, MAIN, 'MAIN');
});
gulp.task('scripts-watch', ['scripts'], browserSync.reload);


  /* Distribute the application with all files into the dist folder */
gulp.task('dist', ['scripts', 'libs-scripts', 'styles', 'fonts', 'statics']);


  /* Start up browsersync and start watching files */
gulp.task('serve', ['dist'], function() {
  browserSync({
    server: {
      baseDir: DIST
    }
  });

  gulp.watch(APP + JS + '/**/*.js', ['scripts-watch']);
  gulp.watch(APP + SCSS + '/**/*.scss', ['styles-watch']);
  gulp.watch([STATICS, CONFIGS], ['statics-watch']);
});


gulp.task('default', ['serve']);
