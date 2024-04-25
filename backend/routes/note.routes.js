const express = require("express");
const { NoteModel } = require("../model/note.model");
const { auth } = require("../middleware/auth.middleware");

const noteRouter = express.Router();

noteRouter.post("/", auth, async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).json({ msg: "A new note has been added" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

noteRouter.get("/", auth, async (req, res) => {
  try {
    const notes = await NoteModel.find({ userID: req.body.userID });
    res.status(200).json({ notes });
  } catch (err) {
    res.status(400).json({ err });
  }
});

noteRouter.patch("/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (note.userID === req.body.userID) {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.status(200).json({ msg: `Note with ID: ${noteID} has been updated` });
    } else {
      res.status(200).json({ msg: "You cannot update someone else's note" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

noteRouter.delete("/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (note.userID === req.body.userID) {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.status(200).json({ msg: `Note with ID: ${noteID} has been deleted` });
    } else {
      res.status(200).json({ msg: "You cannot update someone else's note" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = {
  noteRouter,
};
