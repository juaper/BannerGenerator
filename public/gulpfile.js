/** IMPORTS **/

/** gulp packages via NPM **/

const gulp = require('gulp');
const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const sizeOf = require('image-size');
const imageResize = require('gulp-image-resize-ar');
/** Import data files **/

/** production environment **/
const IMAGE_SIZE_TO_CHANGE_FROM = 1400;
const MAXIMUM_IMAGE_SIZE = 1300;
const MOBILE_IMAGE_MAX_SIZE = 400;
const PNG_QUALITY = '50'; // 1 - 100
const JPG_QUALITY = 'veryhigh'; //low, medium, high , veryhigh
//the folders in which we want to make a copy of the image and resize it for mobile use.
/*** TASKS ***/


/**
 *
 * activates the images optimization task (img-quality-opt), and when its done
 * its activating the imageResizer() function which will handle the resize of
 * large images, and images that needs to be adapted for mobile
 *
 */
//this task activates the quality optimization ('img-quality-opt')
// and when its finished its calling the resize function "imageResizer()"
gulp.task('opt-memes', function () {
    return gulp.src('./public/memes/**/*')
        .pipe(imagemin([
                           imageminJpegRecompress({quality: JPG_QUALITY}),
                           imageminPngquant({quality: PNG_QUALITY}),

                       ]))
        .pipe(imageResize({
                              width:  500,
                              crop: false,
                              upscale: false
                          }))
        .pipe(gulp.dest('./public/build-memes/memes'))
        .pipe(imageResize({
                              width:  200,
                              crop: false,
                              upscale: false
                          }))
        .pipe(gulp.dest('./public/build-memes/meme-thumbs'))
});



// Default Task
gulp.task('default', []);