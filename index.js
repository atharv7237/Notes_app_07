const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Home route to display all files if already files are present in the directory
app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            console.error('Error reading files:', err);
            res.status(500).send('Error reading files');
        } else {
            res.render('index', { files: files });
        }
    });
});

//creating a file with the title and description provided by the user
app.post('/create',(req,res)=>{
   fs.writeFile(`./files/${req.body.title}.txt`, req.body.description, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            res.status(500).send('Error creating file');
        } else {
            
            res.redirect('/');
        }
    });
});

//to view the content of the file when the user clicks on read more button
app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, filedata) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
        } else {
            res.render('show',{filename:req.params.filename, filedata:filedata})
        }
    })
})

//to edit the name of the file when the user clicks on edit button
app.get('/edit/:filename', (req, res) => {
            res.render('edit',{filename:req.params.filename})
})

//to update the name of the file when the user clicks on update name button
app.post('/edit', (req, res) => {
    fs.rename(`./files/${req.body.prev}`,`./files/${req.body.new}.txt`, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
            res.status(500).send('Error renaming file');
        }
            else {
                res.redirect('/');
            }
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});