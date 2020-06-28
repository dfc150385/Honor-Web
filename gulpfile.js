const gulp = require("gulp");
// const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
//html
gulp.task("copy-html", function(){
    return gulp.src("html/*.html")
    .pipe(gulp.dest("dist/html"))
})
//图片
gulp.task("images", function(){
    return gulp.src("images/*/**")
    .pipe(gulp.dest("dist/images"))
})
//数据
gulp.task("data", function(){
    //有多个源路径，只能写数组
    return gulp.src("data.json")
    .pipe(gulp.dest("dist/data"))
})
//js代码处理
gulp.task("scripts", function(){
    return gulp.src("jQ/*.js")
    .pipe(gulp.dest("dist/js"))
})
// css
gulp.task("css", function(){
    return gulp.src("css/*.css")
    .pipe(gulp.dest("dist/css"))
})














