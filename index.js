const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const Note = require('./models/Notes');

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Home route to display all files if already files are present in the directory
app.get('/', async (req, res) => {
    let notes = await Note.find();
    try {
        res.render('index', { Notes: notes });
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

//creating a file with the title and description provided by the user
app.post('/create', async (req, res) => {
    try {
        await Note.create({
            title: req.body.title,
            description: req.body.description
        })

        res.redirect('/');
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
app.get('/edit/:id', async (req, res) => {

    let find = await Note.findOne({
        _id: req.params.id
    })
    res.render('edit', { title: find.title, description: find.description, id: find._id })
})

//to update the name of the file when the user clicks on update name button
app.post('/edit', async (req, res) => {
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});