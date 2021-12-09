let cards = [];
let chosen_cards = [];
let freeze_cards = false;
let players = []
let currPlayer = 0;
const cardsVault = [
  "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A"
]



class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.score = 0;
  }
}


function deleteEntry(arr, i) {
  return arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
}

function refill_cards(cardsToEnter = cardsVault.length) {
  let tempCardsVault = [...cardsVault];
  for (i = 0; i < cardsToEnter; i++) {
    letter_index = get_rand(0, tempCardsVault.length);
    cards.push({ name: tempCardsVault[letter_index] });
    cards.push({ name: tempCardsVault[letter_index] });
    tempCardsVault = deleteEntry(tempCardsVault, letter_index);
  }
  return cards;
}

function get_rand(a, b) {
  return a + Math.floor(Math.random() * b);
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function shuffle_cards(arr) {
  for (i in arr) {
    rand_index = get_rand(0, arr.length);
    swap(arr, i, rand_index);
  }
  return arr;
}

function areEqual(i, j, arr = cards) {
  return i != j && arr[i].name === arr[j].name;
}

function remove_cards(cards, i, j) {
  cards.splice(i, 1);
  cards.splice(j, 1);
}

function createCardBackElement() {
  const cardImage = './assets/cardBackRed.png';

  cardBackElement = document.createElement('img');
  cardBackElement.src = cardImage;
  return cardBackElement;
}

function createCardFaceElement(cardIndex) {
  const cardFaceElement = document.createElement('div');
  cardFaceElement.dataset.value = cards[cardIndex].name;
  cardFaceElement.className = 'cardFace';
  return cardFaceElement;
}

function create_card_element(document, cardIndex) {
  const board = document.getElementById("board");

  const card_element = document.createElement("div");
  card_element.id = cardIndex;
  card_element.className = 'card';
  card_element.onclick = revealCard;
  card_element.appendChild(createCardBackElement());
  const cardFace = createCardFaceElement(cardIndex);
  cardFace.hidden = true;
  card_element.appendChild(cardFace);

  board.appendChild(card_element);
}

function raiseScore(playerIndex) {
  const playerElem = document.getElementById('playerList').children[playerIndex];
  players[playerIndex].score++;
  playerElem.children[1].innerText = players[playerIndex].score;
}

function remove_or_hide() {
  if (areEqual(chosen_cards[0].id, chosen_cards[1].id)) {
    chosen_cards.forEach(v => v.onclick = '');
    raiseScore(currPlayer);
  } else {
    chosen_cards.forEach(v => {
      v.children[1].hidden = true;
      v.children[0].hidden = false;
    });
    chooseNextPlayer(currPlayer)
    // setTimeout(()=> chosen_cards.forEach(v => v.innerHTML = ''), 3000);
  }
  // choose next player
  chosen_cards = [];
  freeze_cards = false;
}

function revealCard(evn) {
  // activate only for card class
  if (this.className === 'card') {
    evn.stopPropagation();
  }
  else {
    return;
  }
  // check if two cards a re already revealed
  if (freeze_cards) {
    return;
  }
  const idx = this.id
  // check if pressed twice on the same card
  if (chosen_cards.length == 1 && chosen_cards[0].id == idx) {
    return;
  }
  
  freeze_cards = true;
  this.children[0].hidden = true;
  this.children[1].hidden = false;
  chosen_cards.push(this);
  if (chosen_cards.length == 2) {
    setTimeout(() => { remove_or_hide() }, 1000);
  } else {
    freeze_cards = false;
  }
}

function addPlayer(playerName) {
  player = new Player(playerName)
  players.push(player)
  playerLi = document.createElement('li');
  const playerNameDiv = document.createElement('div');
  const playerScoreDiv = document.createElement('div');
  playerNameDiv.innerText = playerName;
  playerScoreDiv.innerText = player.score;
  playerLi.appendChild(playerNameDiv);
  playerLi.appendChild(playerScoreDiv);
  document.getElementById('playerList').append(playerLi);
}

function submitPlayer(ev) {
  let playerName = document.getElementById('inputPlayerField').value;
  addPlayer(playerName);
  this.remove();
  document.getElementById('inputPlayerField').remove();
  document.getElementById('addPlyrBtn').onclick = evAddPlayer;
  ev.stopPropagation();
}

function chooseNextPlayer(playerIndex) {
  const playerElem = document.getElementById('playerList').children[playerIndex];
  playerElem.setAttribute('style', '');
  currPlayer = currPlayer == players.length - 1 ? 0 : currPlayer + 1;
  choosePlayer(currPlayer)
}

function choosePlayer(playerIndex) {
  const playerElem = document.getElementById('playerList').children[playerIndex];
  playerElem.setAttribute('style', 'border-color: white; background-color: lightgrey');
}

function evAddPlayer() {
  const inputField = document.createElement('input');
  document.getElementById('addPlyrBtn').onclick = 'evAddPlayer';

  inputField.type = 'text';
  inputField.id = 'inputPlayerField';
  inputField.placeholder = 'player name';
  const inputBtn = document.createElement('button');
  inputBtn.innerText = 'enter player'
  inputBtn.id = 'inputPlayerBtn'
  inputBtn.onclick = submitPlayer;
  this.appendChild(inputField);
  this.appendChild(inputBtn);
}

function initGame(ev) {
  if(players.length < 1){
    this.innerHTML = 'click me to start.<br> please add a player.';
    console.log('must add atleast 1 player to play');
    return;
  }
  choosePlayer(0);
  document.getElementById('addPlyrBtn').remove()
  const board = document.getElementById('board').innerText = '';
  board.onclick = '';
  board.className = 'board';
  cards = refill_cards();
  shuffle_cards(cards);
  for (i in cards) {
    create_card_element(document, i);
  }
}

function main() {
  const addPlayerButton = document.getElementById('addPlyrBtn');
  addPlayerButton.onclick = evAddPlayer;
  const board = document.getElementById("board");
  board.innerHTML = 'click me to start.<br> must have at least one player added.';
  board.onclick = initGame;
}
window.onload = () => {
  main();
}
