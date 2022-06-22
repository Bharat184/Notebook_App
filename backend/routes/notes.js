const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the Notes using get request

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//Route 2. to add a note
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Write Something ").isLength({ min: 1 })
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //If there are errors return bad request..
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      });
      const savednote = await note.save();
      res.json(savednote);
      // res.json(req.user.id);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: to Update Note
router.put('/updatenote/:id',fetchUser,async (req,res)=>{
  try {
    const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
  
    //Find the note to be updated
  
    let note=await Note.findById(req.params.id);
    if(!note)
    {
      return res.status(404).send("Not Found");
    }
  
    if(note.user.toString() !== req.user.id)
    {
      return res.status(401).send("Not Allowed");
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
    res.json({note});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }


})

//Route 4: Delete a Existing Note 
router.delete('/deletenote/:id',fetchUser,async (req,res)=>{
  try {
      const {title,description,tag}=req.body;
      //Find the note to be updated
      let note=await Note.findById(req.params.id);
      if(!note)
      {
        return res.status(404).send({"Result":"Not Found."});
      }
    
      if(note.user.toString() !== req.user.id)
      {
        return res.status(401).send({"Result":"Not Allowed"});
      }
      note=await Note.findByIdAndDelete(req.params.id);
      res.json({"Result":"Success"});
  
  } catch(error) {
    res.status(500).send("Internal Server Error");
  }

})

module.exports = router;
