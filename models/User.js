const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)//used to connect to the database using the connection
//  string stored in the .env file for security reasons

let userSchema = mongoose.Schema({
    name:{ 
    String
    },
    email: {type:String},
    password: {type: String},
    notes : [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}]
})

module.exports = mongoose.model('User', userSchema);