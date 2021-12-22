const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();
const port = 5215;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let cards = [];
let chosenCards = [];
let freezeCards = false;
let players = [];
let currPlayer = 0;
const cardsVault = [
    "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A"
];

class Player {
    constructor(playerName) {
        this.playerName = playerName;
        this.score = 0;
    }
}

function deleteEntry(arr, i) {
    return arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
}

function get_rand(a, b) {
    return a + Math.floor(Math.random() * b);
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}


function refillCards(cardsToEnter = cardsVault.length) {
    let tempCardsVault = [...cardsVault];
    for (i = 0; i < cardsToEnter; i++) {
        letter_index = get_rand(0, tempCardsVault.length);
        cards.push({ name: tempCardsVault[letter_index] });
        cards.push({ name: tempCardsVault[letter_index] });
        tempCardsVault = deleteEntry(tempCardsVault, letter_index);
    }
    return cards;
}

function shuffleCards(arr) {
    for (i in arr) {
        rand_index = get_rand(0, arr.length);
        swap(arr, i, rand_index);
    }
    return arr;
}

app.get('/nextplayer', (req, res) => {
    currPlayer = currPlayer == players.length - 1 ? 0 : currPlayer + 1;
    res.send(currPlayer);
})

app.get('/currentplayer', (req, res) => {
    res.send(currPlayer);
})

app.post('/addplayer', (req, res) => {
    console.log(`adding player: ${req.body.fullName}`);
    players.push(new Player(req.body.fullName));
    res.send(JSON.stringify(`added player ${req.body.fullName}`))
})

app.get('/players', (req, res) => {
    res.send(JSON.stringify(players));
})

app.post('/flipcard', (req, res) => {
    console.log(`flipping card: ${req.body.card}`);
    if (!chosenCards.includes(req.body.card))
        chosenCards.push(req.body.card);
    res.send(JSON.stringify(`flipped card ${req.body.card}`))
})

app.post('/newmixeddeck', (req, res) => {
    shuffleCards(refillCards(req.body.numOfCards));
    res.send(JSON.stringify(cards));
})

app.get('/currentdeck', (req, res) => {
    res.send(JSON.stringify(cards));
})

app.listen(port, () => {
    console.log(`memory game listening at port ${port}`);
})