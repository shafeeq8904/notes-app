const express = require("express");
const router = express.Router();
const { authenticateToken } = require('../utilities.js')
const { addNote,editNote,getNotes,deleteNote,isPinned,searchNotes} = require("../controllers/notes.controller.js");


router.post("/add-note", authenticateToken, addNote);
router.put("/edit-note/:nodeId", authenticateToken, editNote);
router.get("/get-notes", authenticateToken, getNotes);
router.delete("/delete-note/:noteId", authenticateToken, deleteNote);
router.put("/update-note-pinned/:noteId",authenticateToken,isPinned);
router.get("/search-notes", authenticateToken, searchNotes);

module.exports = router;