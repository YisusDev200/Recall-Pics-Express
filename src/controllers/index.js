const imageSchema = require("../models/image.model");
const { unlink } = require("fs-extra");
const path = require("path");

exports.getIndex = async (req, res) => {
  try {
    const images = await imageSchema.find();
    res.render("index", { images });
  } catch (error) {
    console.error("Error in getIndex:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getUpload = (req, res) => {
  try {
    res.render("upload");
  } catch (error) {
    console.error("Error in getUpload:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.postUpload = async (req, res) => {
  try {
    const image = new imageSchema();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = "/img/uploads/" + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    await image.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error in postUpload:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imageSchema.findOne({ uuid: id });
    if (!image) {
      res.status(404).send("Image not found");
      return;
    }
    res.render("profile", { image });
  } catch (error) {
    console.error("Error in getImage:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imageSchema.findOneAndDelete({ uuid: id });
    if (!image) {
      res.status(404).send("Image not found");
      return;
    }
    await unlink(path.resolve("./src/public/" + image.path));
    res.redirect("/");
  } catch (error) {
    console.error("Error in deleteImage:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const image = await imageSchema.findOneAndUpdate(
      { uuid: id },
      { title, description },
      { new: true }
    );

    if (!image) {
      return res.status(404).send("The image was not found.");
    }

    res.redirect(`/image/${id}`);
  } catch (error) {
    console.error("Error in updateImage:", error);
    res.status(500).send("There was an error processing the request.");
  }
};

exports.getEditImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imageSchema.findOne({ uuid: id });

    if (!image) {
      return res.status(404).send("The image was not found.");
    }

    res.render("update", { image });
  } catch (error) {
    console.error("Error in getEditImage:", error);
    res.status(500).send("There was an error processing the request.");
  }
};
