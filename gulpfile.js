var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var autopref = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var babel = require('gulp-babel');



gulp.task('less', function () {
  return gulp.src('app/less/less.less') // Выборка исходных файлов для обработки плагином
    .pipe(less()) 
    .pipe(autopref())
    .pipe(csso())
    .pipe(gulp.dest('dest/css')) // Вывод результирующего файла в папку назначения (dest - пункт назначения)
    .pipe(browserSync.reload({stream: true}))
})
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'dest' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('html', function(){
    gulp.src('dest/index.html')
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
  return gulp.src('app/js/js.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dest/js'))
})



gulp.task('watch', ['browser-sync', 'html', 'less', 'js'],  function() {
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('dest/*.html', ['html']);
  gulp.watch('app/js/*.js', ['js']);
})