const gulp = require('gulp')
const minifyCSS = require('gulp-minify-css')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

gulp.task('css', (done) => {                                  //压缩css
  gulp.src('./src/public/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/public/css'))
  done()
})

gulp.task('htmlmin', (done) => {                            //压缩html
  gulp.src('./src/views/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/views'));
  gulp.src('./src/views/common/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/views/common'))
  done()
})




gulp.task('js', (done) => {               //压缩js

  gulp.src('./src/public/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/public/js/'))

  // gulp.src('./src/common/*.js')
  //   .pipe(babel({
  //     presets: ['@babel/env']
  //   }))
  //   .pipe(uglify())
  //   .pipe(gulp.dest('dist/common/'))

  // gulp.src('./src/middleware/*.js')
  //   .pipe(babel({
  //     presets: ['@babel/env']
  //   }))
  //   .pipe(uglify())
  //   .pipe(gulp.dest('dist/middleware/'))


  // gulp.src('./src/model/*.js')
  //   .pipe(babel({
  //     presets: ['@babel/env']
  //   }))
  //   .pipe(uglify())
  //   .pipe(gulp.dest('dist/model/'))


  // gulp.src('./src/router/*.js')
  //   .pipe(babel({
  //     presets: ['@babel/env']
  //   }))
  //   .pipe(uglify())
  //   .pipe(gulp.dest('dist/router/'))
  done()
});

gulp.task('default', gulp.series(gulp.parallel('css', 'htmlmin', 'js')));








