var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');






gulp.task('less', function () {
  return gulp.src('app/less/less.less') // Выборка исходных файлов для обработки плагином
    .pipe(less()) // Вызов Gulp плагина для обработки файла
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
    console.log('watch');
    gulp.src('dest/index.html')
      .pipe(browserSync.reload({stream: true}))
});





gulp.task('watch', ['browser-sync', 'html', 'less',],  function() {
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('dest/*.html', ['html']);
})