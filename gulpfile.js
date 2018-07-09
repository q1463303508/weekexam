var gulp = require('gulp');
var url = require('url');
var path = require('path');
var fs = require('fs');
var server = require('gulp-webserver');
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

                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
})