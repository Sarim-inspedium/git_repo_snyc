const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();

const crypto = require('crypto');
const { exec } = require("child_process");

const secret = "cbsgywedguwjbcweuiwui85245678csdmcy";

app.use(express.json());
 
const books = [
{title: 'Harry Potter', id: 1},
{title: 'Twilight', id: 2},
{title: 'Lorien Legacies', id: 3}
]
 
//READ Request Handlers
app.get('/api', (req, res) => {
res.send('Welcome to Inspedium Corp.');
});
 
app.get('/api/books', (req,res)=> {
res.send(books);
});
 
app.get('/api/books/:id', (req, res) => {
const book = books.find(c => c.id === parseInt(req.params.id));
 
if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
res.send(book);
});
 
//CREATE Request Handler
app.post('/api/:name', (req, res)=> {
 
const dir_name = req.params.name;
const payload = req.body;

if (dir_name=='front'){
    //let sig = "sha1=" + crypto.createHmac('sha1', secret).update(payload).digest('hex');
   
    //const sig = '';
    if (req.headers['x-hub-signature']) {
        exec("./front.sh", (error, stdout, stderr) => {
            if (error) {
                //res.statusCode = 200;
                //res.setHeader('Content-Type', 'text/plain');
                //res.end(`error:  ${error.message}`);
                res.send(`error:  ${error.message}`)
                return;
            }
            if (stderr) {
                //res.statusCode = 200;
                //res.setHeader('Content-Type', 'text/plain');
                //res.end(`stderr: ${stderr}`);
                res.send(`stderr: ${stderr}`)
                return;
            }
            //res.statusCode = 200;
            //res.setHeader('Content-Type', 'text/plain');
            //res.end(`stdout: ${stdout}`);
            res.send(`stdout: ${stdout}`)
        });
        
    } else {
        res.send('front end api');
    }
}

else if (dir_name=='admin'){
    if (req.headers['x-hub-signature']) {
        exec("./admin.sh", (error, stdout, stderr) => {
            if (error) {
                //res.statusCode = 200;
                //res.setHeader('Content-Type', 'text/plain');
                //res.end(`error:  ${error.message}`);
                res.send(`error:  ${error.message}`)
                return;
            }
            if (stderr) {
                //res.statusCode = 200;
                //res.setHeader('Content-Type', 'text/plain');
                //res.end(`stderr: ${stderr}`);
                res.send(`stderr: ${stderr}`)
                return;
            }
            //res.statusCode = 200;
            //res.setHeader('Content-Type', 'text/plain');
            //res.end(`stdout: ${stdout}`);
            res.send(`stdout: ${stdout}`)
        });
        
    } else {
        res.send('back end api');
    }

}else{
res.status(404).send('Invalid URL')
return;
}


});
 


//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
