const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// GET a random quote
app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote})
});

// GET all quotes if request has no query params. If query has person attribute then GET all from that person
app.get('/api/quotes', (req, res) => {
    const filterQuotes = quotes.filter(author => {
        return author.person === req.query.person
    })
    if (req.query.person) {
        res.send({ quotes: filterQuotes})
    } else {
        res.send({ quotes: quotes})
    }
})

//Add new quotes w. POST
app.post('/api/quotes', (req, res) => {
    const newQuote = req.query.quote
    const newPerson = req.query.person
    if (newQuote != '' && newPerson != '') {
        quotes.push({ quote: newQuote, person: newPerson})
        res.send({quote: {quote: newQuote, person: newPerson} })
    }  else {
        res.sendStatus(400)
    }
})

app.listen(4001)