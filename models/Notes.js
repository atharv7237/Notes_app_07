const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/notesDB`);

const noteSchema = mongoose.Schema({
    title: String,
    description: String
})

module.exports = mongoose.model('Note', noteSchema);