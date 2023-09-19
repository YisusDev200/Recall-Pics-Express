const router = require("express").Router();
const imageController = require("../controllers/index");

// Main route to display all images
router.get("/", imageController.getIndex);

// Route to display the image upload form
router.get("/upload", imageController.getUpload);

// Route to process the upload of a new image
router.post("/upload", imageController.postUpload);

// Route to display details of a specific image
router.get("/image/:id", imageController.getImage);

// Route to delete an image
router.get("/image/:id/delete", imageController.deleteImage);

// Route to display the edit form for an image
router.get("/image/:id/update", imageController.getEditImage);

// Route to process the update of an image
router.post("/image/:id/update", imageController.updateImage);

module.exports = router;
