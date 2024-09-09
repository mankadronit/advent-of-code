const fs = require("fs");

const dic = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

// Check if a character is a digit
function isDigit(char) {
    return !isNaN(Number.parseInt(char));
}

// Find number words within a line and return their positions
function findNumberWords(line) {
    const ans = {};
    for (let i = 0; i < line.length; i++) {
        for (let j = i + 1; j <= line.length; j++) {
            const word = line.substring(i, j);
            if (word in dic) {
                if (!ans.first) {
                    ans.first = [dic[word], i];
                } else {
                    ans.last = [dic[word], line.length - i];
                }
            }
        }
    }
    if (!ans.last && ans.first) {
        ans.last = [ans.first[0], line.length - ans.first[1]];
    }
    return ans;
}

// Find the first numeric character in a line
function findNumber(line, reverse = false) {
    const searchLine = reverse ? line.split("").reverse().join("") : line;
    for (let i = 0; i < searchLine.length; i++) {
        if (isDigit(searchLine[i])) {
            return [searchLine[i], i];
        }
    }
    return null;
}

// Read the file and process each line
function readFile(filePath, encoding = "utf-8") {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        let sum = 0;

        data.split("\n").forEach((line) => {
            if (!line) return;

            let first = line[0];
            let last = line[line.length - 1];
            let val = first + last;

            if (isNaN(val)) {
                const firstNumber = findNumber(line) || [Infinity, 0];
                const lastNumber = findNumber(line, true) || [-Infinity, 0];

                const words = findNumberWords(line);
                let firstWordNumber = firstNumber[0],
                    lastWordNumber = lastNumber[0];

                if (words.first && firstNumber[1] >= words.first[1]) {
                    firstWordNumber = words.first[0];
                }
                if (words.last && lastNumber[1] >= words.last[1]) {
                    lastWordNumber = words.last[0];
                }

                val = `${firstWordNumber}${lastWordNumber}`;
            }

            sum += Number(val);
        });

        console.log("Sum:", sum);
    });
}

readFile("input.txt");
