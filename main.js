function delete_letter(str, i) {
  return str.slice(0, i) + str.slice(i + 1, str.length);
}

function refill_cards() {
  cards = [];
  alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  for (i = 0; i < 15; i++) {
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

function create_card_element(document, card) {
  const board = document.getElementById("board");
  const card_element = document.createElement("div");
  card_element.innerHTML = card.name;
  board.appendChild(card_element);
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
  for (card of cards) {
    create_card_element(document, card);
  }
}

main();
