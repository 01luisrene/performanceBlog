'use strict';
var gulp = require('gulp');
var	sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var	postcss = require('gulp-postcss');
var	autoprefixer = require('autoprefixer');
var	concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');


var paths = {
  	sass: './sass/*.scss',
		mainsass: './sass/main.scss',
		sassdist: 'C:/Users/LUIS/Documents/GitHub/01luisrene.github.io/assets/css',
		cssdist: 'C:/Users/LUIS/Documents/GitHub/01luisrene.github.io/assets/css',
		jsdist: 'C:/Users/LUIS/Documents/GitHub/01luisrene.github.io/assets/js'
};


/*
Compila los archivos SASS y los agrega los prefijos propietarios
*/
gulp.task("sass", function(){
	var processors = [
	autoprefixer({browsers: ['last 2 versions'] })
	];

	return gulp.src([paths.mainsass])
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.init())
	.pipe(postcss(processors))
	.pipe(cleanCSS())
	.pipe(concat('cerounoluisrene.min.css'))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.sassdist));
});

gulp.task("css", function(){
	return gulp.src('./css/**/*.css')
	.pipe(cleanCSS())
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest(paths.cssdist));
});
//Comprimir imagenes
gulp.task('images', function() {
  gulp.src('./images/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest('./dist/images'))
    .pipe(notify("Ha finalizado la compresión de imágenes!"));;
});

//Comprimir archivos js
gulp.task('compress', function () {
   return gulp.src(['./js/jquery.js', './js/headroom.min.js', './js/jQuery.headroom.js', './js/jquery.ghostHunter.min.js', './js/app.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsdist))
    .pipe(notify("Ha finalizado la tarea compresión  de archivos js!"));
});
//Vuelve a ejecutar la tarea cuando se modifique un archivo
gulp.task('watch', function(){
	gulp.watch(paths.sass, ['sass']);
	gulp.watch('./images/**/*', ['images']);
	gulp.watch('./css/**/*', ['css']);
	gulp.watch('./js/**/*', ['compress']);
});

gulp.task('default',['watch', 'sass', 'images', 'css', 'compress']);