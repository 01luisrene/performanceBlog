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


var paths = {
  	sass: './sass/*.scss',
		mainsass: './sass/main.scss',
		sassdist: 'C:/Users/LUIS/Documents/GitHub/01luisrene.github.io/assets/css',
		cssdist: 'C:/Users/LUIS/Documents/GitHub/01luisrene.github.io/assets/css'
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
    .pipe(gulp.dest('./dist/images'));
});

//Vuelve a ejecutar la tarea cuando se modifique un archivo
gulp.task('watch', function(){
	gulp.watch(paths.sass, ['sass']);
	gulp.watch('./images/**/*', ['images']);
	gulp.watch('./css/**/*', ['css']);
});

gulp.task('default',['watch', 'sass', 'images', 'css']);