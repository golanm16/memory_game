let cards = [];
let chosen_cards = [];
const card_image = 'https://opengameart.org/sites/default/files/card%20back%20red_0.png';

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
  //https://opengameart.org/sites/default/files/card%20back%20red_0.png
  // >> the same as card_element.addEventListener('click', revealCard)
  board.appendChild(card_element);
}

function revealCard(evn) {
  const idx = evn.target.id
  console.log(idx, cards[idx].name);
  if (chosen_cards.includes(evn.target)) {
    return;
  }
  // console.log(chosen_cards);
  evn.target.innerHTML = cards[idx].name;
  chosen_cards.push(evn.target)
  if (chosen_cards.length == 2) {
    if (chosen_cards[0].innerHTML == chosen_cards[1].innerHTML) {
      console.log('success!');
      chosen_cards.forEach(v => v.remove());
    } else {
      chosen_cards.forEach(v => v.innerHTML = '');
      // setTimeout(()=> chosen_cards.forEach(v => v.innerHTML = ''), 3000);
    }
    chosen_cards = [];
  }
}

function main() {
  cards = refill_cards();
  console.log(JSON.stringify(cards));
  shuffle_cards(cards);
  console.log(cards);
  // const board = document.getElementById("board");
  // const card_element = document.createElement("div");
  // card_element.innerHTML = cards[0];
  // console.log(board);
  // board.appendChild(card_element);
  for (i in cards) {
    create_card_element(document, cards[i], i);
  }
}
window.onload = () => {
  main();
}
