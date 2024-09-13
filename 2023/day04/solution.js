const fs = require("fs");

const content = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

console.log(content);

let total_points = 0;

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

        win_map[card_id] = winning_numbers;

        let card_numbers = card
            .split(":")[1]
            .split("|")[1]
            .trim()
            .split(" ")
            .filter((n) => n.trim() !== "")
            .map((n) => Number(n.trim()));

        let matched_cards = 0;
        let points = 0;

        console.log("CARD NUMBERS:", card_numbers);
        card_numbers.forEach((num) => {
            if (win_map[card_id].has(num)) {
                matched_cards += 1;
                if (matched_cards === 1) {
                    points = 1;
                } else if (matched_cards === 2) {
                    points = 2;
                } else {
                    points *= 2;
                }
            }
        });

        console.log("CARD ", card_id, " Points: ", points);

        total_points += points;
    }
});

console.log(total_points);
