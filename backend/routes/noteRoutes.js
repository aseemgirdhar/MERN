const express = require('express')
const {getNotes , createNote , getNoteById , UpdateNote , deleteNote} = require("../controllers/noteController");
const {protect} = require("../middlewares/authmiddleware");
const router = express.Router();

router.route('/').get(protect , getNotes);
router.route('/create').post(protect ,createNote);
router.route('/:id').get( getNoteById).put(protect , UpdateNote).delete(protect , deleteNote);
module.exports =router;