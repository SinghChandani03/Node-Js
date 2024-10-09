//******NODE JS PRACTICE*******/


//-------------node basic ( import module )----------------------

// const app=require('./app')

// let arr=[4,1,6,3,4,89,0];
// console.log(app.xyz())
// const result =arr.filter((item)=>{
//     return item>4
// });
// console.warn(result);

//-------------create server----------------------

// const http = require('http');

// http.createServer((req,resp) =>
// {
// resp.write("<h1>Code Step by step</h1>");
// resp.end();
// }).listen(4500);

//-------------http----------------------

// const http = require('http');

// http.createServer((req, resp) => {
//     resp.write("<p>Chandani Singh</p>");
//     resp.end();
// }).listen(4500);


//----------------nodemon test-------------------
//console.log("JSON package file");


//----------------http - create api-------------------
// const http= require('http');
// const data = require('./data');
// http.createServer((req,resp)=>{
// resp.writeHead(500,{'Content-Type':'application\json'});
// resp.write(JSON.stringify(data));
// resp.end();
// }).listen(5000);


//----------------take input by command-------------------
// const fs = require('fs');

// const input = process.argv;

// if(input[2]=='add')
// {
//     fs.writeFileSync(input[3],input[4])
// }
// else if(input[2]=='remove')
// {
//     fs.unlinkSync(input[3])
// }
// else
// {
//     console.log("invalid input ")
// }


//----------------create files through loop-------------------
// const fs= require('fs');
// const path=require('path');
// const dirPath= path.join(__dirname,'files');
// console.log(dirPath)
// for(i=0;i<5;i++)
// {
//     fs.writeFileSync(`${dirPath}/hello${i}.txt`,"some simple text in file")

// }
// fs.readdir(dirPath,(err,files)=>{
//     files.forEach((item)=>{
//         console.warn("file name is : ",item)
//     });
// }
// )


//----------------crud on files-------------------
// const fs = require('fs');
// const path = require('path');
// const dirPath= path.join(__dirname,'files');
// const filePath = `${dirPath}/apple.txt`;
// fs.writeFileSync(filePath,'this is a simple file');
// fs.readFile(filePath,'utf8',(err,item)=>{
// console.log(item);
// })
// fs.appendFile(filePath,' for fruits',(err)=>{
// if(!err) console.log("file is updated")
// })
// fs.rename(filePath, `${dirPath}/fruit.txt`,(err)=>{
// if(!err) console.log("file name is updated")
// })

// fs.unlinkSync(`${dirPath}/fruit.txt`);


//--------------async issue---------------------
// let a=20;
// let b=0;

// setTimeout(()=>{
//    b=30;
// },2000)

// console.log(a+b)


//--------------async issue solved by promise---------------------
// let a=20;
// let b=0;


// let waitingData= new Promise((resolve,reject)=>{
//    setTimeout(()=>{
//       resolve(30);
//    },2000)
// })

// waitingData.then((data)=>{
//    b=data;
//    console.log(a+b)
// })


//--------------express---------------------

// const express = require('express');
// const app = express();

// app.get("", (req, resp) => {
//        console.log(req.query.name)
//        resp.send("Welcome," + req.query.name);
// });

// app.get("/about", (req, resp) => {
//     resp.send("Welcome, This is a About Page");
// });

// app.get("/help", (req, resp) => {
//     resp.send("Welcome, This is a Help Page");
// });

// app.listen(5000);


//--------------create html pages---------------------
// const express = require('express');
// const path = require('path');

// const app = express();
// const publicPath=path.join(__dirname,'public')
// app.get('',(_,resp)=>{
//     resp.sendFile(`${publicPath}/index.html`);
// })
// app.get('/about',(_,resp)=>{
//     resp.sendFile(`${publicPath}/about.html`);
// })
// app.get('/help',(_,resp)=>{
//     resp.sendFile(`${publicPath}/help.html`);
// })
// app.get('*',(_,resp)=>{
//     resp.sendFile(`${publicPath}/pagenotfound.html`);
// })
// // //app.use(express.static(publicPath));

// app.listen(5000);


//--------------ejs template---------------------
// const express = require('express');
// const path = require('path');

// const app = express();
// const publicPath=path.join(__dirname,'public')

// app.set('view engine','ejs');

// app.get('',(_,resp)=>{
//     resp.sendFile(`${publicPath}/index.html`);
// })
// app.get('/profile',(_,resp)=>{
//     const user={
//         name:"chandani",
//         email:"chandani123@gmail.com",
//         city:"surat"
//     }
//     resp.render('profile',{user});
// })
// app.get('/about',(_,resp)=>{
//     resp.sendFile(`${publicPath}/about.html`);
// })
// app.get('/help',(_,resp)=>{
//     resp.sendFile(`${publicPath}/help.html`);
// })
// app.get('*',(_,resp)=>{
//     resp.sendFile(`${publicPath}/pagenotfound.html`);
// })

// app.listen(5000);


//--------------middleware---------------------
// const express = require('express');
// const app = express();
// const reqFilter = (req, resp, next) => {
//     if (!req.query.age) {
//         resp.send("Please provide your age")
//     }
//     else if (req.query.age<18) {
//         resp.send("You are under aged")
//     }
//     else {
//         next();
//     }
// }

// app.use(reqFilter);

// app.get('/', (res, resp) => {
//     resp.send('Welcome to Home page')
// });

// app.get('/users', (res, resp) => {
//     resp.send('Welcome to Users page')
// });
// app.listen(5000)


//--------------different level middleware---------------------
// const express = require('express');
// const reqFilter= require('./middleware');
// const app = express();
// const route= express.Router();

// // app.use(reqFilter);
// route.use(reqFilter)
// app.get('/', (res, resp) => {
//     resp.send('Welcome to Home page')
// });

// app.get('/users', (res, resp) => {
//     resp.send('Welcome to Users page')
// });

// route.get('/about', (res, resp) => {
//     resp.send('Welcome to About page')
// });
// route.get('/contact', (res, resp) => {
//     resp.send('Welcome to contact page')
// });

// app.use('/',route);

// app.listen(5000)

const mysql = require("mysql2");

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Chandani12345",
  database: "node_task",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  else{
    console.log('Database connection established.');
  }
});

module.exports = connection;
