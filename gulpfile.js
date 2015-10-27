var gulp = require("gulp"),
    sass = require("gulp-sass"),
    htmlmin = require("gulp-htmlmin"),
    watch = require("gulp-watch"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    bower = require("gulp-bower"),
    minifyCss = require("gulp-minify-css"),
    // sourcemaps = require("gulp-sourcemaps"),
    uncss = require('gulp-uncss'),
    rename = require("gulp-rename");

var paths = {
  unCSS: {
    ignore: [
      ".main__icon .rain .drops path:nth-child(1)", ".main__icon .rain .drops path:nth-child(2)", ".main__icon .rain .drops path:nth-child(3)",".fadeInUp",
      ".fadeOutDown",".default-gradient", ".default-splash", ".night-gradient", ".night-splash", ".day-gradient", "day-splash", ".rain-gradient", 
      ".rain-splash", ".sunny-gradient", ".sunny-splash", ".forecast__day:nth-child(1)",".forecast__day:nth-child(2)",".forecast__day:nth-child(3)", 
      ".forecast__day:nth-child(4)", ".forecast__day:nth-child(5)", ".animated", ".bounceIn", ".bounceOut", ".fadeOutUp", ".flash", ".fadeInDown", ".active", ".climacon", 
      ".climacon.thermometer", ".climacon.thermometer.low", ".climacon.thermometer.medium-low", ".climacon.thermometer.medium-high", ".climacon.thermometer.high", 
      ".climacon.thermometer.full", ".climacon.clear-day", ".climacon.clear-night", ".climacon.cloudy", ".climacon.fog", ".climacon.partly-cloudy-day", 
      ".climacon.partly-cloudy-night", ".climacon.sleet", ".climacon.hail", ".climacon.rain", ".climacon.snow", ".climacon.thunderstorm", ".climacon.tornado", ".climacon.wind", 
      ".climacon.umbrella"
    ],
    src: {
      html: ["./assets/**/*.html","./src/*.html"],
      css: "./www/css/style.css"
    },
    dest: "./www/css/"
  },
  moveAssets: {
    src: "./assets/**/*",
    dest: "www"
  },
  sassToCSS: {
    src: "./src/scss/style.scss",
    dest: "./www/css"
  },
  minifyCSS: {
    src: "./www/css/style.css",
    new: "style.min.css"
  },
  concatJS: {
    concat: "script.js"
  },
  uglifyJS: {
    src: "./www/js/script.js",
    new: "script.min.js"
  },
  bower: {
    dest: "src/lib"
  },
  html: {
    src: "./src/*.html",
    dest: "www"
  },
  scss: {
    src: "./src/scss/style.scss", 
    dest: "./www/css",
    watch: [
      "./src/scss/*.scss", 
      "./src/scss/**/_*.scss"
    ]
  },
  js: {
    src: [
      "./src/lib/angular/angular.js",
      "./src/lib/angular-local-storage/dist/angular-local-storage.js",
      "./src/js/app.js",
      "./src/js/modules/*.js",
      "./src/js/controllers/*.js",
      "./src/js/factories/*.js",
      "./src/js/directives/*.js",
      "./src/js/filters/*.js"
    ],
    dest: "./www/js/"
  }
};

// move contents of assets folder to www
gulp.task("moveAssets", function(){
  return gulp.src(paths.moveAssets.src)
    .pipe(gulp.dest(paths.moveAssets.dest));
});

// move html to www folder (not minified)
gulp.task("moveHTML", function(){
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
});

// put bower components in lib folder
gulp.task("bower", function() {
  return bower()
    .pipe(gulp.dest(paths.bower.dest));
});

// minify html 
gulp.task("minifyHTML", function() {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.html.dest));
});

// sass => css
gulp.task("sassToCSS", function() {
  return gulp.src(paths.sassToCSS.src)
    // .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.sassToCSS.dest));
});

// removed unused css rules
gulp.task("unCSS", ["sassToCSS"], function() {
  return gulp.src(paths.unCSS.src.css)
    .pipe(uncss({html:paths.unCSS.src.html,ignore:paths.unCSS.ignore}))
    .pipe(gulp.dest(paths.scss.dest));
});

// minify css
gulp.task("minifyCSS", ["sassToCSS", "unCSS"], function() {
  return gulp.src(paths.minifyCSS.src)
    .pipe(minifyCss())
    .pipe(rename(paths.minifyCSS.new))
    .pipe(gulp.dest(paths.scss.dest));
});

// concat javascript
gulp.task("concatJS", function() {
  return gulp.src(paths.js.src)
    // .pipe(sourcemaps.init())
    .pipe(concat(paths.concatJS.concat))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js.dest));
});

// uglify javascript and rename
gulp.task("uglifyJS", ["concatJS"], function() {
  return gulp.src(paths.uglifyJS.src)
    .pipe(uglify())
    .pipe(rename(paths.uglifyJS.new))
    .pipe(gulp.dest(paths.js.dest));
});

// watch for changes
gulp.task("watch", function() {
  gulp.watch(paths.moveAssets.src, ["moveAssets"]);
  gulp.watch(paths.html.src, ["minifyHTML"]);
  gulp.watch(paths.scss.watch, ["minifyCSS"]);
  gulp.watch(paths.js.src, ["concatJS"]);
});

// The default task (called when you run `gulp` from cli)
gulp.task("build", ["moveAssets", "bower", "minifyHTML", "sassToCSS", "unCSS", "minifyCSS", "concatJS", "uglifyJS"]); /*compresses html, css, js*/
gulp.task("default", ["moveAssets", "bower", "moveHTML", "sassToCSS", "unCSS", "concatJS", "watch"]);