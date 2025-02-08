const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    tags: {type: [String], default: []},
    createdOn: {type: Date, default: Date.now},
    isPinned: {type: Boolean, default: false},
    userId : {type:String, required:true}
})

module.exports = mongoose.model('Note', noteSchema);