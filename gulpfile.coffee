gulp = require 'gulp'
util = require 'gulp-util'
ftp = require 'vinyl-ftp'
config = require './.config'
config.ftp.log = util.log

gulp.task 'deploy', ->
  conn = ftp.create(config.ftp)
  gulp.src('dist/**', buffer: false, dot: true)
    .pipe(conn.newerOrDifferentSize(config.ftp.remotePath))
    .pipe(conn.dest(config.ftp.remotePath))


gulp.task 'clear-remote-directory', (cb) ->
  ftp.create(config.ftp).rmdir(config.ftp.remotePath, cb)
  return
