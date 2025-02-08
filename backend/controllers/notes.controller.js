const Note = require('../models/note.model.js');

exports.addNote = async(req,res)=>{
    const {title,content,tags} = req.body;
    const {user} = req.user;
    
    if(!title){
        res.status(400).json({message:'Title is required'})
    }
    if(!content){
        res.status(400).json({message:'Content is required'})
    }

    try {
        const note = await Note.create({
            title,
            content,
            tags: tags || [],
            userId:user._id
        });
        res.json({note, message: 'Note created successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error',error})
    }

}


exports.editNote = async(req,res)=>{
    const {title, content, tags,isPinned} = req.body;
    const {user} = req.user;
    const {nodeId} = req.params;

    if(!title && !content && !tags){
        return res.status(400).json({message:'No changes Provided'})
    }

    try {
        const note = await Note.findOne({_id:nodeId,userId:user._id});
        
        if(!note){
            return res.status(404).json({message:'Note not found'})
        }
        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();
        res.json({note, message: 'Note updated successfully'});

    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }

}

exports.getNotes = async(req,res)=>{
    const {user} = req.user;

    try {
        const notes = await Note.find({userId:user._id}).sort({isPinned:-1,createdOn:-1});
        
        return res.json({
            notes,
            message: 'Notes fetched successfully'
        })

    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}


exports.deleteNote = async(req,res)=>{
    const {user} = req.user;
    const {noteId} = req.params;
    try{
        const note = await Note.findOne({_id:noteId,userId:user._id});
        if(!note){
            return res.status(404).json({message:'Note not found'})
        }
        await note.deleteOne({
            _id:noteId,
            userId:user._id
        })
        res.json({error:false,message: 'Note deleted successfully'});
    }catch(error){
        res.status(500).json({error: true,message: 'Internal server error'})
    }
}

exports.isPinned = async(req,res)=>{
    const {isPinned} = req.body;
    const {user} = req.user;
    const noteId = req.params.noteId;

    try {
        const note = await Note.findOne({_id:noteId,userId:user._id});
        
        if(!note){
            return res.status(404).json({message:'Note not found'})
        }
        
        note.isPinned = isPinned; 


        await note.save();
        res.json({note, message: 'Note updated successfully'});

    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }

}

exports.searchNotes = async(req,res)=>{
    const {user}= req.user;
    const {query} = req.query;

    if(!query){
        return res.status(400).json({message:'Search query is required'})
    }

    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or:[
                {title: {$regex: new RegExp(query, "i")}},
                {content: {$regex:new RegExp(query, "i")}},
            ]
        })

        return res.json({
            notes:matchingNotes,
            message: 'Notes fetched successfully'
        })

    } catch (error) {
        return res.status(500).json({
            message: `Internal server error`,
            
        })
    }
}