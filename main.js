let cards = [
    { name: 'A' },
    { name: 'B' },
    { name: 'B' },
    { name: 'C' },
    { name: 'A' },
    { name: 'C' },
    { name: 'J' },
    { name: 'J' }
];

function get_rand_letter(alphabet) {

    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function refill_cards() {
    cards = [];
    alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    for (i = 0; i < 15; i++) {
        letter = {name:get_rand_letter(alphabet)};
        cards.push(letter);
        cards.push(letter);
    }
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

    return arr[i].name == arr[j].name;
}

function remove_cards(i, j) {
    cards.splice(i, 1);
    cards.splice(j, 1);
}

function main() {
    refill_cards()
    console.log(JSON.stringify(cards));
    shuffle_cards(cards);
    console.log(cards);

}

main();