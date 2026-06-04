const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
dotenv.config();
const cookieParser = require('cookie-parser')
const Note = require('./models/Notes');
const User = require('./models/User');
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

// Home route to display all files if already files are present in the directory
app.get('/', (req, res) => {
    try {

        res.render('LandingPage');

        // res.render('index', { Notes: notes });
    }
    catch {
        res.status(500).send('Error rendering page');
    }
    //switching from fs to mongoose to store the data in the database instead of files

    // fs.readdir('./files', (err, files) => {
    //     if (err) {
    //         console.error('Error reading files:', err);
    //         res.status(500).send('Error reading files');
    //     } else {
    //         res.render('index', { files: files });
    //     }
    // });
});

//Registering the new User 
app.get('/register', (req, res) => {
    res.render('Registration');
})

//To Register the new user and save the data in the database
app.post('/register', async (req, res) => {
    let{name,email,password} = req.body;
    let finduser = await User.findOne({email})
    if(finduser) res.send('User Email already exist')
    else{
    bcrypt.hash( password , 10, async (err, hash) => {
        if(err) console.error('Something Went Wrong :', err);
        else{
        let newUser = await User.create({
            name,
            email,
            password:hash
        })
        res.redirect('/loginPage');
    }
    })
}
})

//to redirect to the login page when the user clicks on the login button
app.get('/loginPage', (req, res) => {
    res.render('Login');
})

app.post('/login', async (req, res) => {
     let{email,password} = req.body;
    let findUser = await User.findOne({email});
    if( !findUser) res.send('Something Went Wrong user email not exists');
    else{
        bcrypt.compare(password, findUser.password, async(err, result) => {
            if(result === false) res.send('Something Went Wrong');
            else{
            let token = jwt.sign({email,name:findUser.name},process.env.SECRET_KEY)
            res.cookie('token',token)
            res.redirect(`/indexpage/${findUser._id}`);
            // console.log(findnotes);
            }
        })
    }

    
})

app.get('/logout',(req,res)=>{
    res.cookie('token','')
    res.redirect('/loginPage')
})

app.get('/indexpage/:userid',isLoggedIn ,async (req, res) => {
    let findUser = await User.findOne({_id:req.params.userid});
    let findnotes = await Note.find({user:findUser._id});
    let filternotes = findnotes.filter(note => note.user.toString() == findUser._id.toString());
res.render('index',{ Notes: filternotes, user: findUser._id});
})

//creating a file with the title and description provided by the user
app.post('/create', async (req, res) => {
    try {
        let createnote = await Note.create({
            title: req.body.title,
            description: req.body.description,
            user: req.body.user
        })

        let user = await User.findOne({_id:createnote.user})
        user.notes.push(createnote._id);
        user.save();

        console.log(user._id);
        res.redirect(`/indexpage/${user._id}`);
      
    }
    catch {
        res.status(500).send('Error creating note');
    }


    //    fs.writeFile(`./files/${req.body.title}`, req.body.description, (err) => {
    //         if (err) {
    //             console.error('Error creating file:', err);
    //             res.status(500).send('Error creating file');
    //         } else {

    //             res.redirect('/');
    //         }
    //     });
});

//to view the content of the file when the user clicks on read more button
app.get('/file/:id', async (req, res) => {
    let find = await Note.findOne({
        _id: req.params.id
    })

    res.render('show', { title: find.title, description: find.description })


    // fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, filedata) => {
    //     if (err) {
    //         console.error('Error reading file:', err);
    //         res.status(500).send('Error reading file');
    //     } else {
    //         res.render('show',{filename:req.params.filename, filedata:filedata})
    //     }
    // })
})

//to edit the name of the file when the user clicks on edit button
app.get('/edit/:id', isLoggedIn , async (req, res) => {

    let find = await Note.findOne({
        _id: req.params.id
    })
    res.render('edit', { title: find.title, description: find.description, id: find._id })
})

//to update the name of the file when the user clicks on update name button
app.post('/edit' ,async (req, res) => {
    console.log(req.body.id);
    console.log(req.body.new);
        let find = await Note.findOneAndUpdate({
            _id: req.body.id
        },{title:req.body.new},{ new: true })
        res.redirect('/');
    // fs.rename(`./files/${req.body.prev}`, `./files/${req.body.new}.txt`, (err) => {
    //     if (err) {
    //         console.error('Error renaming file:', err);
    //         res.status(500).send('Error renaming file');
    //     }
    //     else {
    //         res.redirect('/');
    //     }
    // })
})

function isLoggedIn(req,res,next){
    let token = req.cookies.token;
    if(!token) res.send('You must be logged in ')
    else  next();
   
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});