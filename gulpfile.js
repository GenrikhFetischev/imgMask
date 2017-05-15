var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var autopref = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var htmlmin  = require('gulp-htmlmin');




gulp.task('imgmin', function() { 
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dest/img'))
});










gulp.task('less', function () {
  return gulp.src('app/less/less.less') 
    .pipe(less()) 
    .on('error', function(err) {
            const type = err.type || '';
            const message = err.message || '';
            const extract = err.extract || [];
            const line = err.line || '';
            const column = err.column || '';
            gutil.log(gutil.colors.red.bold('[Less error]') +' '+ gutil.colors.bgRed(type) +' ('+ line +':'+ column +')');
            gutil.log(gutil.colors.bold('message:') +' '+ message);
            gutil.log(gutil.colors.bold('codeframe:') +'\n'+ extract.join('\n'));
            this.emit('end');
        })
    .pipe(autopref())
    .pipe(gulp.dest('app/css')) 
    .pipe(csso())
    .pipe(gulp.dest('dest/css')) 
    .pipe(browserSync.reload({stream: true}))
})
gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false 
    });
});
gulp.task('html', function(){
    gulp.src('app/index.html')
      .pipe(htmlmin())
      .pipe(gulp.dest('dest'))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
  return gulp.src('app/js/js.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js'))
})



gulp.task('watch', ['browser-sync', 'html', 'less', 'js', ],  function() {
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/js/*.js', ['js']);

})



