var gulp = require('gulp');

var clientApp = './angular/app';


gulp.task('less', function (){
  var less = require('gulp-less');
  return gulp.src(clientApp+'/less/*.less')
    .pipe(less())
    .pipe(gulp.dest(clientApp+'/css'));
});
gulp.task('minify', function () {
  var minifyCSS = require('gulp-minify-css');
  return gulp.src('./app/less/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./release/css'))
});

gulp.task('autoprefixer',function(){
  var less = require('gulp-less');
  var autoprefixer = require('gulp-autoprefixer');
  return gulp.src('./app/less/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers:['last 2 versions'],
      cascade:false
    }))
    .pipe(gulp.dest('./app/css'))
});

gulp.task('hint',function(){
  var jshint = require('gulp-jshint');
  return gulp.src(clientApp+"/services/**/*.js")
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('concat',function(){
  var concat = require('gulp-concat');
  return gulp.src('./app/directives/chatroom/*.js')
    .pipe(concat('chatroom.js'))
    .pipe(gulp.dest('./release/js'));
});


gulp.task('uglify',function(){
  var rename = require('gulp-rename');
  var uglify = require('gulp-uglify');
  return gulp.src(clientApp+'/*.js')
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify({outSourceMap: false}))
    .pipe(gulp.dest('./release/chatroom'))
});

gulp.task('ngAnnotate',function(){
  var ngAnnotate = require('gulp-ng-annotate');
  return gulp.src('./app/directives/chatroom/*.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./release/chatroom'))
});

gulp.task('images',function(){
  var imagemin = require('gulp-imagemin');
  return gulp.src('app/imag/*')
    .pipe(imagemin({optimizationLevel:3,pregressive:true,interlaced:true}))
    .pipe(gulp.dest('release/img'))
    .pipe(notify({message:'Image task complete'}));
});

gulp.task('html',function(){
  return gulp.src('app/directives/chatroom/*.html')
    .pipe(gulp.dest('release/html'));
});
gulp.task('default', ['less']);
