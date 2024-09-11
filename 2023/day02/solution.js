const fs = require("fs");

const COLOR_BUDGET = {
    red: 12,
    green: 13,
    blue: 14,
};

// Function to filter and return valid game IDs based on color cube count limits
function getValidGames(lines) {
    let games = [];

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

    return games;
}

// Function to find the maximum count of red, green, and blue cubes across all sets
function getMinSet(sets) {
    let min_set = { red: 0, green: 0, blue: 0 };
    sets.forEach((s) => {
        let cubes = s.split(",");

        cubes.forEach((cube) => {
            let color = cube.trim().split(" ")[1].trim();
            let count = Number.parseInt(cube.trim().split(" ")[0].trim());

            min_set[color] = Math.max(count, min_set[color]);
        });
    });

    return min_set;
}

// Function to calculate the total power of all valid games based on cube counts
function getGamePowers(games) {
    let power = 0;

    games.forEach((game) => {
        if (game) {
            let sets = game.split(":")[1].split(";");

            let min_set = getMinSet(sets);

            let game_power =
                Number(min_set["red"]) *
                Number(min_set["green"]) *
                Number(min_set["blue"]);

            power += game_power;
        }
    });

    return power;
}

// Function to read a file and pass its contents (lines) to a callback function
function readFile(filePath, encoding = "utf-8", callback) {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        let lines = data.split("\n");

        callback(lines);
    });
}

// Part 1: Read file and calculate the sum of valid game IDs
readFile("./input.txt", "utf-8", (lines) => {
    let games = getValidGames(lines);
    let sum = games.reduce((acc, gameId) => acc + gameId, 0);
    console.log("SUM: ", sum);
});

// Part 2: Read file and calculate the total game power
readFile("./input.txt", "utf-8", (lines) => {
    let power = getGamePowers(lines);
    console.log("POWER: ", power);
});
