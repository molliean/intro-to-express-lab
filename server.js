const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Listening on port 3000')
  })

app.get('/greetings/:username', (req, res) => {
    res.send(`Hello there, ${req.params.username}!`);
})

app.get('/roll/:number', (req, res) => {
    const numberParam = parseInt(req.params.number, 10);
    if(!isNaN(numberParam)){
        console.log(`${req.params.number} is a number.`)
        const enteredNum = Math.floor(Math.random() * req.params.number);
        res.send(`<p>You rolled a ${enteredNum}.</p>`);
    } else {
        res.send('<p>You must specify a number.</p>');
    }
})

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {
    const indexParam = parseInt(req.params.index, 10);
    if(!isNaN(indexParam) && indexParam >= 0 && indexParam < collectibles.length){
        const formattedPrice = collectibles[indexParam].price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        res.send(`<p>Looks like you want the ${collectibles[indexParam].name}. That'll cost you ${formattedPrice}.</p>`)
    } else {
        res.send('<p>This item is not yet in stock. Check back soon.</p>')
    }
})

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const minPrice = parseInt(req.query['min-price'], 10);
    const maxPrice = parseInt(req.query['max-price'], 10);
    const type = req.query.type;
    let filteredShoes = shoes;
    if(!isNaN(minPrice)){
        filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
    }
    if(!isNaN(maxPrice)){
        filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
    }
    if(type){
        filteredShoes = filteredShoes.filter((shoe) => shoe.type === type)
    }
    if (filteredShoes.length > 0) {
        const shoesList = filteredShoes.map(shoe => `<li>${shoe.name}: $${shoe.price} (${shoe.type})</li>`).join('');
        res.send(`<ul>${shoesList}</ul>`);
    } else {
        res.send('<p>No shoes match your criteria.</p>');
    }
});