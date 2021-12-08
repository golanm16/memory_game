let cards = [];
let chosen_cards = [];
const card_image = 'https://opengameart.org/sites/default/files/card%20back%20red_0.png';
let freeze_cards = false;
let players = []
let currPlayer = 0;
const cardBack = 'https://i.pinimg.com/originals/4d/40/95/4d4095cc1994dfda327e2856d0a8c203.jpg';



class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.score = 0;
  }
}


function delete_letter(str, i) {
  return str.slice(0, i) + str.slice(i + 1, str.length);
}

function refill_cards() {
  // cards = [];
  alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  for (i = 0; i < 4; i++) {
    letter_index = get_rand(0, alphabet.length);
    cards.push({ name: alphabet[letter_index] });
    cards.push({ name: alphabet[letter_index] });
    alphabet = delete_letter(alphabet, letter_index);
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

function are_equal(arr, i, j) {
  return i != j && arr[i].name === arr[j].name;
}

function remove_cards(cards, i, j) {
  cards.splice(i, 1);
  cards.splice(j, 1);
}

function create_card_element(document, card, index) {
  const board = document.getElementById("board");
  // >> the same as document.querySelector('board')
  const card_element = document.createElement("div");
  card_element.id = index;
  // card_element.value = card.name;
  card_element.className = 'card';
  card_element.onclick = revealCard;
  const card_background = document.createElement('img');
  card_background.src = card_image;
  // card_element.appendChild(card_background)
  board.appendChild(card_element);
}

function raiseScore(playerIndex){
  const playerElem = document.getElementById('playerList').children[playerIndex];
  players[playerIndex].score++;
  playerElem.children[1].innerText = players[playerIndex].score;
}

function remove_or_hide() {
  if (chosen_cards[0].innerHTML == chosen_cards[1].innerHTML) {
    console.log('success!');
    chosen_cards.forEach(v => v.onclick = '');
    raiseScore(currPlayer);
  } else {
    chosen_cards.forEach(v => v.innerHTML = '');
    chooseNextPlayer(currPlayer)
    // setTimeout(()=> chosen_cards.forEach(v => v.innerHTML = ''), 3000);
  }
  // choose next player
  chosen_cards = [];
  freeze_cards = false;
}

function revealCard(evn) {
  if (freeze_cards) {
    return;
  }
  const idx = evn.target.id
  if (chosen_cards.length == 1 && chosen_cards[0].id == idx) {
    return;
  }
  freeze_cards = true;
  // console.log(chosen_cards);
  evn.target.innerHTML = cards[idx].name;
  chosen_cards.push(evn.target);
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
  console.log(playerName);
  this.remove();
  console.log(document.getElementById('inputPlayerField'));
  document.getElementById('inputPlayerField').remove();
  document.getElementById('addPlyrBtn').onclick = evAddPlayer;
  ev.stopPropagation();
}

function chooseNextPlayer(playerIndex){
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
  console.log('generating');
  this.appendChild(inputField);
  this.appendChild(inputBtn);
}

function initGame() {
  choosePlayer(0);
  document.getElementById('addPlyrBtn').remove()
  document.getElementById('board').innerText = '';
  document.getElementById('board').onclick = '';
  cards = refill_cards();
  console.log(JSON.stringify(cards));
  shuffle_cards(cards);
  console.log(cards);
  for (i in cards) {
    create_card_element(document, cards[i], i);
  }
}

function main() {
  const addPlayerButton = document.getElementById('addPlyrBtn');
  addPlayerButton.onclick = evAddPlayer;
  const board = document.getElementById("board");
  board.innerText = 'click me to start game';
  board.onclick = initGame;
}
window.onload = () => {
  main();
}
