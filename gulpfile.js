// 定义依赖项和插件
var gulp=require('gulp'),
    gutil=require('gulp-util'),
    uglify=require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    minifyHtml = require("gulp-minify-html"),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');
    livereload = require('gulp-livereload');

// 定义名为 "js" 的任务
gulp.task('uglifyjs', function(){
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());

});
gulp.task('testCssmin', function () {
    gulp.src('css/*.css')
        .pipe(cssmin())
        
        .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());

});
gulp.task('minify-html', function () {
    gulp.src('*.html') // 要压缩的html文件
        .pipe(minifyHtml()) //压缩
        .pipe(gulp.dest('dist/html'))
    .pipe(connect.reload());

});
//自动监听
gulp.task('watch', function () {
    gulp.watch('*.html', ['minify-html']);
    gulp.watch('js/*.js', ['uglifyjs']);
    gulp.watch('css/*.css', ['testCssmin']);
});
//设置刷新服务
gulp.task('connect', function () {
    connect.server({
        host: 'localhost', //地址，可不写，不写的话，默认localhost
        port: 8020, //端口号，可不写，默认8000
        root: './', //当前项目主目录
        livereload: true //自动刷新
    });
});
// 定义默认任务
gulp.task('default', ['uglifyjs','testCssmin','minify-html','watch','connect']);