var gulp = require('gulp');
var url = require('url');
var path = require('path');
var fs = require('fs');
var server = require('gulp-webserver');
var uglify = require('gulp-uglify');
var scss = require('gulp-clean-css');
var babel = require('gulp-babel');
var proData = require('./data/procuct.json');
var html = require('gulp-htmlmin');
var rev = require('gulp-rev');
var colle = require('gulp-rev-collector');
// 起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    return false;
                }

                if (pathname === '/api/product') {
                    res.end(JSON.stringify({ code: 1, data: proData }))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))
});
//js
gulp.task('uglify', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(`build/js`))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
});
// 压缩css
gulp.task('scss', function() {
    gulp.src('./src/css/*.css')
        .pipe(scss())
        .pipe(rev())
        .pipe(gulp.dest('./build/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
});
// 压缩html
gulp.task('html', function() {
    gulp.src('./src/**/*.html')
        .pipe(html({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(rev())
        .pipe(gulp.dest('./build'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/html'))
});
gulp.task('all', ['uglify', 'scss', 'html'])