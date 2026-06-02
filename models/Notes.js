const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)//used to connect to the database using the connection string stored in the .env file for security reasons
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// mongoose.connect(`mongodb://localhost:27017/notesDB`);

const noteSchema = mongoose.Schema({
    title: String,
    description: String
})

module.exports = mongoose.model('Note', noteSchema);