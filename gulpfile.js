var gulp = require('gulp');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');
var iconfont = require('gulp-iconfont');

var fontName = 'fotocasa-iconset-web';

gulp.task('Iconfont', function(){
  gulp.src(['icons/*.svg'])
    .pipe(iconfont({
      normalize: true,
      fontName: fontName,
      appendCodepoints: true
    }))

    // automáticamente le asigno un unicode al icono
    .on('codepoints', function(codepoints, options) {
      codepoints.forEach(function(glyph, idx, arr) {
        arr[idx].codepoint = glyph.codepoint.toString(16)
      });

      // -------------------------------
      // A CONTINUACÓN GENERO EL CSS
      // -------------------------------
      gulp.src('css/template/fotocasa_template.scss') // utilizo un template
      .pipe(consolidate('lodash', {
        glyphs: codepoints,
        fontName: options.fontName,
        fontPath: '../fonts/',
        className: 'fc-icon'
      }))
      .pipe(rename('fotocasa_icons.scss'))
      .pipe(gulp.dest('css/'));
    })
    .pipe(gulp.dest('fonts/'));
});
