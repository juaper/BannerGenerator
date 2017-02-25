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
gulp.task('opt-memes', ['memes-quality-and-resize'], function () {
    //imageResizer();
});

/**
 *
 * reducing size of images
 * this method / task gets called from the 'opt-images' task above.
 * It outputs all the images to the build/images folder int the same folders order as
 * before
 *
 */
gulp.task('memes-quality-and-resize', function () {
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


/**
 *
 * @method IMAGE RESIZER
 * this method is doing couple of things :
 * it takes all the images that in the build folder(after reducing their size and:
 * 1. if the image is bigger than the limit we decided in the 'MAXIMUM_IMAGE_SIZE'
 *    variable it will change its size to the limit height and save it in the same location
 *    in the build folder.
 * 2. It checks if certain folders which we decided upon in the 'shouldImageBeResized'
 *    function exist and if yes it will resize them for mobile version but will only save it as a
 *    copy with the '__xs' added to their name in the same folder in build/images.
 *
 */
const imageResizer = () => {
    //get all the sub directories names from the build/images folder
    const directories = getDirectories('./public/memes/');
    // perform the script on every fie inside the sub directory
    directories.forEach(directory => loopOnDirectoryFiles(directory));

    // return all the sub directories in a certain given path
    function getDirectories(srcPath) {
        return fs.readdirSync(srcPath)
            .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())
    }

    //loop through the files inside the directory and execute the changeDimension Method on each one
    function loopOnDirectoryFiles(directory) {
        recursive(`./build/memes/${directory}/`, function (err, files) {
            // Files is an array of filename
            files.forEach(file => changeDimensions(file))
        });
    }

    function changeDimensions(img) {
        if (!isImage(img))
            return;
        //else

        //updates the image size with to the 'currentImageSize' variable
        sizeOf(img, function (err, dimensions) {
            const currentImageWidth = dimensions.width;
            //images the include 'xs__m' in their name needs to be optimized for mobile size
            // so we will max their width to 400px


                //base allows us to overwrite ana existing file on the dest method
                gulp.src(img, {base: './'})
                    .pipe(imageResize({
                                          width:  200,
                                          crop: true,
                                          upscale: false
                                      }))
                    .pipe(gulp.dest('../build/images'));

        });
    }

};






// Default Task
gulp.task('default', []);