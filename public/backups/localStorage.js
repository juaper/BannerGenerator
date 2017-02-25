/*else {
 // Closure to capture the file information.
 reader.onload = (function (theFile) {
 return function (e) {
 // Render thumbnail.
 localStorage.setItem('singleImage', e.target.result);
 activeImage([localStorage.singleImage])
 };
 })(f);
 }*/
// Read in the image file as a data URL.