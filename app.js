const express = require('express');
const app = express(); // initialize an instance of express - used to configure routes, handle Http request etc.
app.use(express.json()); // used to parse incoming request with JSON payloads
const port = 3000;
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

app.get('/', (req, res) => {
//   res.send('Hello World!');
  res.render('index', { title: 'My Express App', message: 'Student' });
});

app.get('/api/home', (req, res) => {
    res.sendStatus(200);
    res.send('Home page');
});

const books = [
    { id: 1, name: 'book1' },
    { id: 2, name: 'book2' },
    { id: 3, name: 'book3' }
];

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.post('/api/books/add', (req, res) => {
    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book);
    res.json(book);
});

app.put('/api/books/update/:id', (req, res) => {
    //lookup the book
    const book = books.find(b => b.id === parseInt(req.params.id));
    //if(!book) return res.status(404).send('The book with the given ID was not found');
    const updatedBook = {
        id: book.id,
        name: req.body.name
    };
    books[books.indexOf(book)] = updatedBook;
    res.json(books);
});

app.delete('/api/books/delete/:id', (req, res) => {
    //look up the book
    const book = books.find(b => b.id === parseInt(req.params.id));
    // if not exist, return 404
    if(!book) return res.status(404).send('The book with the given ID was not found');
    const index = books.indexOf(book);    
    //delete
    books.splice(index, 1);
    //return the book
    res.json(books);
});