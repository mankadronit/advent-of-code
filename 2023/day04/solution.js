const fs = require("fs");

const content = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

console.log(content);

// Instantiate return answer
const cards_won = {};

// Store all card
const cards = {};

// Iterate through the content, parse card and add to Cards
content.forEach((card) => {
    if (card) {
        win_map = {};

        const card_id = Number(card.split(":")[0].split(" ")[1]);
        let winning_numbers = new Set(
            card
                .split(":")[1]
                .split("|")[0]
                .trim()
                .split(" ")
                .map((n) => Number(n.trim())),
        );

        let card_numbers = card
            .split(":")[1]
            .split("|")[1]
            .trim()
            .split(" ")
            .filter((n) => n.trim() !== "")
            .map((n) => Number(n.trim()));

        cards[card_id] = [winning_numbers, card_numbers];
    }
});

// Add the default card ids with count 1
for (const card_id in cards) {
    cards_won[card_id] = 1;
}

function getMatchedCards(card_id) {
    if (!(card_id in cards)) {
        cards[card_id] = [new Set(), []];
    }
    const winning_numbers = cards[card_id][0];
    const card_numbers = cards[card_id][1];

    const matched_cards = Array.from(card_numbers).filter((num) =>
        winning_numbers.has(Number(num)),
    );

    return matched_cards.length;
}

function collectCards(card_id, matched_cards) {
    if (matched_cards > 0) {
        const cardsToCollect = Array.from(
            { length: matched_cards },
            (_, i) => Number(card_id) + i + 1,
        );

        cardsToCollect.forEach((card) => {
            cards_won[card] = cards_won[card] || 0;
            cards_won[card] += 1;
        });

        cardsToCollect.forEach((card) =>
            collectCards(card, getMatchedCards(card)),
        );
    }
}

for (const card in cards) {
    collectCards(card, getMatchedCards(card));
}

let ans = 0;

for (let card in cards_won) {
    ans += cards_won[card];
}

console.log(ans);
