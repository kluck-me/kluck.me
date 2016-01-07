gulp = require 'gulp'
$ = require('gulp-load-plugins')(
  pattern: ['gulp-*', '*']
  rename:
    'imagemin-pngquant': 'pngquant'
)

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

gulp.task 'build:dist', ['build'], ->
  gulp.src('.tmp/**/*.{html,js,css,json,png,jpg,gif}')
    .pipe(htmlFilter = $.filter('**/*.html', restore: true))
    .pipe($.htmlmin(
      removeComments: true
      collapseWhitespace: true
      collapseBooleanAttributes: true
      useShortDoctype: true
      removeScriptTypeAttributes: true
      removeStyleLinkTypeAttributes: true
    ))
    .pipe(htmlFilter.restore)
    .pipe(cssFilter = $.filter('**/*.css', restore: true))
    .pipe($.csso())
    .pipe(cssFilter.restore)
    .pipe(jsFilter = $.filter('**/*.js', restore: true))
    .pipe($.uglify(preserveComments: 'license'))
    .pipe(jsFilter.restore)
    .pipe(imgFilter = $.filter('**/*.{png,jpg,gif}', restore: true))
    .pipe($.imagemin(
      progressive: true,
      svgoPlugins: [removeViewBox: false],
      use: [$.pngquant()]
    ))
    .pipe(imgFilter.restore)
    .pipe(gulp.dest('dist'))
