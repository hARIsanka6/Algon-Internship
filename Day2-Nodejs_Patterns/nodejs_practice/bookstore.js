const express = require('express')

const app = express();


app.use(express.json())

const bookstore = [
    {"id":1,"name":"bookthief",'author':"Hari"},
    {"id":2,"name":"golden","author":"meenu"},
    {"id":3,"name":"silver","author":"sree"},
    {"id":4,"name":"ruby","author":"santhosh"}
];


app.get("/book",(req,res)=>{
    console.log(req.query)
    if((req.query.name && req.query.author)=== null){
        res.send(bookstore)
    }
    if (req.query.name){
        const name = req.query.name;
        const Book = bookstore.filter(val => val.name === name);
        res.send(Book);

    }

    if(req.query.author){
        const author = req.query.author;
        const Book = bookstore.filter(val => val.author === author)
        res.send(Book);
        
    }


})

//Get with params

app.get("/book/:id",(req,res)=>{
    console.log(req.params.id);
    const id = parseInt(req.params.id)
    const book = bookstore.find(val=>val.id===id);
    res.send(book);

})

//to send new records of books we use post method

app.post("/book/",(req,res)=>{
    console.log("Data added successfully")
    console.log(req.body)
    bookstore.push(req.body);
    res.send("Records added")
})


app.patch("/book/:id",(req,res)=>{

    const id = parseInt(req.params.id);

    const Book = bookstore.find(value => value.id === id)



    if (req.body.name){
        Book.name = req.body.name;
    }
    if(req.body.author){
        Book.author = req.body.author;
    }

    res.send("Data updated successfully")
})

app.put("/book/:id",(req,res)=>{

    const id = parseInt(req.params.id)
    const Book = bookstore.find(val=> val.id === id);
    Book.name = req.body.name;
    Book.author = req.body.author;
    res.send("Data updated successfully");
})

app.delete("/book/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const index = bookstore.findIndex(val=> val.id === id);
    bookstore.splice(index,1);
    console.log(bookstore)
    res.send("Data deleted successfully")
})



app.listen(5000,()=>{
    console.log("Listening on port 5000");
})