const fs = require("fs");

function findNumber(line, reverse = false) {
    if (reverse) {
        line = line.split("").reverse().join("");
    }

    for (let i = 0; i < line.length; i++) {
        let curr = Number.parseInt(line[i]);

        if (!isNaN(curr)) {
            return `${curr}`;
        }
    }
}

function readFile(filePath, encoding = "utf-8") {
    fs.readFile(filePath, encoding, function(err, data) {
        if (err) {
            console.log(err);
        }

        let sum = 0;

        data.split("\n").forEach(function(line) {
            if (!line) {
                return;
            }

            let first = line[0];
            let last = line[line.length - 1];

            let val = first + last;

            if (isNaN(val)) {
                let a = findNumber(line);
                let b = findNumber(line, (reverse = true));

                val = a + b;
            }

            sum += Number(val);
        });

        console.log(sum);
    });
}

readFile("input.txt");
