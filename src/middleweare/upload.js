const multer = require('multer');

const uploadAvatar = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callBacak) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/) ){
            return callBacak(new Error("please upload image file"));
        }
        callBacak(undefined, true)

        // callBacak(new Error('File must be a PDF'));
        // callBacak(undefined, true);
        // callBacak(undefined, false);
    }
});

module.exports = uploadAvatar;