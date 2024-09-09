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

function isDigit(char) {
    return !isNaN(Number.parseInt(char));
}

function findNumberWords(line) {
    ans = {};
    for (let i = 0; i < line.length - 1; i++) {
        for (let j = i + 1; j < line.length; j++) {
            let word = line.substring(i, j + 1);
            if (word in dic) {
                if (!("first" in ans)) {
                    ans["first"] = [dic[word], i];
                } else {
                    ans["last"] = [dic[word], line.length - i];
                }
            }
        }
    }

    if (!("last" in ans) & ("first" in ans)) {
        ans["last"] = [ans["first"][0], line.length - ans["first"][1]];
    }

    return ans;
}

function findNumber(line, reverse = false) {
    if (reverse) {
        line = line.split("").reverse().join("");
    }

    for (let i = 0; i < line.length; i++) {
        if (isDigit(line[i])) {
            return [line[i], i];
        }
    }
}

function readFile(filePath, encoding = "utf-8") {
    fs.readFile(filePath, encoding, function (err, data) {
        if (err) {
            console.log(err);
        }

        let sum = 0;

        data.split("\n").forEach(function (line) {
            if (!line) {
                return;
            }

            let first = line[0];
            let last = line[line.length - 1];

            let val = first + last;

            if (isNaN(val)) {
                let a = findNumber(line) || Infinity;
                let b = findNumber(line, (reverse = true)) || -Infinity;

                let w = findNumberWords(line);
                let x, y;

                if ("first" in w === true) {
                    if (a[1] < w["first"][1]) {
                        x = a[0];
                    } else {
                        x = w["first"][0];
                    }
                } else {
                    x = a[0];
                }

                if ("last" in w === true) {
                    if (b[1] < w["last"][1]) {
                        y = b[0];
                    } else {
                        y = w["last"][0];
                    }
                } else {
                    y = b[0];
                }

                val = String(x) + String(y);
            }

            sum += Number(val);
        });

        console.log(sum);
    });
}

readFile("input.txt");
