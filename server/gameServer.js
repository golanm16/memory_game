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
const players = [];
const generatedIds = [];
let currPlayer = 0;
const cardsVault = [
    "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A"
];



class Card {
    constructor(value, symbol = 'leaf') {
        this.value = value;
        this.symbol = symbol;
        this.id = generateId();
    }
}

class Player {
    constructor(playerName) {
        this.playerName = playerName;
        this.score = 0;
        this.id = generateId();
    }
}

function generateId() {
    const minSn = 100000000;
    const maxSn = 999999999;
    let snExists = false;
    let randSn;
    do {
        randSn = Math.floor(randNum(minSn, maxSn));
        snExists = generatedIds.includes(randSn);
    } while (snExists);
    generatedIds.push(randSn);
    return randSn;
}

function deleteEntry(arr, i) {
    return arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
}

function randNum(a, b) {
    return a + Math.floor(Math.random() * b);
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function refillCards(cardsToEnter = cardsVault.length) {
    let tempCardsVault = [...cardsVault];
    for (i = 0; i < cardsToEnter; i++) {
        letter_index = getRand(0, tempCardsVault.length);
        cards.push({ name: tempCardsVault[letter_index] });
        cards.push({ name: tempCardsVault[letter_index] });
        tempCardsVault = deleteEntry(tempCardsVault, letter_index);
    }
    return cards;
}

function shuffleCards(arr) {
    for (i in arr) {
        rand_index = getRand(0, arr.length);
        swap(arr, i, rand_index);
    }
    return arr;
}

function getPlayerIndex(playerId) {
    players.findIndex(p => p.id == playerId);
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
    player = new Player(req.body.fullName);
    players.push(player);
    res.send(JSON.stringify(player))
})

app.get('/players', (req, res) => {
    res.send(JSON.stringify(players));
})

app.get('/players/clear', (req, res) => {
    players.splice(0, players.length);
    // log action
    console.log('players cleared');
    res.send(JSON.stringify('players cleared'));
})

app.post('/player/raisescore', (req, res) => {
    try {
        if (isNaN(getPlayerIndex(playerId))) {
            throw `tried raising score to NaN player index: ${req.body.playerIndex}`;
        }
        if (req.body.playerId >= players.length || req.body.playerIndex < 0) {
            throw `tried raising score to non-existant player ${req.body.playerIndex}`;
        }
        players[getPlayerIndex(getPlayerIndex(playerId))].score++;
    }
    catch (e) {
        res.send(JSON.stringify(e));
        return;
    }

    // log action
    console.log(`raised ${players[playerIndex].playerName} score by 1`);
    res.send(JSON.stringify(`raised score to player ${req.body.playerIndex}`));
})

app.post('/card/reveal', (req, res) => {

    const respObj = { isCardRevealed: false, msg: '' };

    console.log(`attempt revealing card: ${req.body.cardId}`);
    if (chosenCards.length > 1) {
        respObj.msg = "can't reveal more cards";
    }
    else if (chosenCards.includes(req.body.card)) {
        respObj.msg = "card already revealed";
    }
    else {
        chosenCards.push(req.body.card);
        respObj.isCardRevealed = true;
        respObj.msg = `revealed card ${req.body.card}`;
    }
    // log action
    console.log(respObj.msg);
    res.send(JSON.stringify(respObj));
})



app.get('/cards/mix/:numOfCards', (req, res) => {
    shuffleCards(refillCards(req.params.numOfCards));
    res.send(JSON.stringify(cards));
})

app.get('/cards/checkchosen', (req, res) => {
    if
})

app.get('/cards/current', (req, res) => {
    res.send(JSON.stringify(cards));
})

app.listen(port, () => {
    console.log(`memory game listening at port ${port}`);
})