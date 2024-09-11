const fs = require("fs");

const COLOR_BUDGET = {
    red: 12,
    green: 13,
    blue: 14,
};

function readFile(filePath, encoding = "utf-8", callback) {
    let games = [];

    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        let lines = data.split("\n");

        lines.forEach((line) => {
            if (line) {
                let game_id = Number.parseInt(line.split(":")[0].substring(4));
                let sets = line.split(":")[1].split(";");

                let valid_game = true;
                sets.forEach((s) => {
                    let cubes = s.split(",");
                    cubes.forEach((cube) => {
                        let color = cube.trim().split(" ")[1].trim();
                        let count = Number.parseInt(
                            cube.trim().split(" ")[0].trim(),
                        );

                        if (count > COLOR_BUDGET[color]) {
                            valid_game = false;
                        }
                    });
                });

                if (valid_game) {
                    games.push(Number(game_id));
                }
            }
        });

        callback(games);
    });
}

function getValidGames() {
    readFile("./input.txt", "utf-8", (games) => {
        let sum = games.reduce((acc, gameId) => acc + gameId, 0);
        console.log(sum);
    });
}

getValidGames();
