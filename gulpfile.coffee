gulp = require 'gulp'
$ = require('gulp-load-plugins')(pattern: ['gulp-*', '*'], rename: { 'vinyl-ftp': 'ftp' })
config = require './.config'
config.ftp.log = $.util.log

gulp.task 'copy:files', ->
  gulp.src('src/**/*.{html,js,css,json,png,jpg,gif}')
    .pipe(gulp.dest('.tmp'))

gulp.task 'build:jade', ->
  gulp.src('src/**/*.jade')
    .pipe($.plumber())
    .pipe($.jade(pretty: true))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('.tmp'))

gulp.task 'build:coffee', ->
  gulp.src('src/**/*.coffee')
    .pipe($.plumber())
    .pipe($.coffee(bare: true))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('.tmp'))

gulp.task 'build:stylus', ->
  gulp.src('src/**/*.styl')
    .pipe($.plumber())
    .pipe($.stylus())
    .pipe($.autoprefixer())
    .pipe($.plumber.stop())
    .pipe(gulp.dest('.tmp'))

gulp.task 'build', [
  'copy:files'
  'build:jade'
  'build:coffee'
  'build:stylus'
]

gulp.task 'watch', ['build'], ->
  gulp.watch 'src/**/*.{html,js,css,json}', ['copy:files']
  gulp.watch 'src/**/*.jade', ['build:jade']
  gulp.watch 'src/**/*.coffee', ['build:coffee']
  gulp.watch 'src/**/*.styl', ['build:stylus']
  return

gulp.task 'serve', ['watch'], ->
  gulp.src('.tmp')
    .pipe($.webserver(
      livereload: true
    ))
  return

gulp.task 'deploy', ->
  conn = $.ftp.create(config.ftp)
  gulp.src('dist/**', buffer: false, dot: true)
    .pipe(conn.newerOrDifferentSize(config.ftp.remotePath))
    .pipe(conn.dest(config.ftp.remotePath))

gulp.task 'clear-remote-directory', (cb) ->
  $.ftp.create(config.ftp).rmdir(config.ftp.remotePath, cb)
  return
