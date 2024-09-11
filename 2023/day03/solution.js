const fs = require("fs");
const os = require("os");

const content = fs.readFileSync("input.txt", "utf-8").trim().split(os.EOL);

// Parse the input as a matrix
function getContentMatrix(content) {
    const contentMatrix = [];

    content.forEach((row) => {
        if (!row) {
            return;
        }
        contentMatrix.push(row.split(""));
    });

    return contentMatrix;
}

const matrix = getContentMatrix(content);
const TOTAL_ROWS = matrix.length;
const TOTAL_COLUMNS = matrix[0].length;

// Loop a row of the matrix until the current character is non-integer
function loopUntilNotNumber(matrix, row, col) {
    while (isNaN(Number.parseInt(matrix[row][col])) & (col <= TOTAL_COLUMNS)) {
        col += 1;
    }

    return col;
}

// Loop a row of the matrix until the current character is an integer
function loopUntilNumber(matrix, row, col) {
    let c = col;
    while (!isNaN(Number.parseInt(matrix[row][c])) & (c <= TOTAL_COLUMNS)) {
        c += 1;
    }

    return c;
}

// Check if the current number is valid by checking all surrounding cells for a special
// character.
function checkValidity(matrix, row, start_col, end_col) {
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = start_col - 1; c < end_col + 1; c++) {
            if (
                (r >= 0) &
                (r <= TOTAL_ROWS - 1) &
                (c >= 0) &
                (c <= TOTAL_COLUMNS - 1)
            ) {
                if (isNaN(Number(matrix[r][c])) & (matrix[r][c] !== ".")) {
                    if (matrix[r][c] === "*") {
                        // [isValid, isGearAdjacent, gearId]
                        return [true, true, `${r}.${c}`];
                    } else {
                        return [true, false, ""];
                    }
                }
            }
        }
    }

    return [false, false, ""];
}

// Loop through the matrix and get all valid parts
function getValidParts(matrix) {
    let row = 0;
    let col = 0;

    let validParts = [];
    let gearConnections = {};

    // Loop through entire matrix
    while (row <= TOTAL_ROWS - 1) {
        while (col <= TOTAL_COLUMNS - 1) {
            // Loop Through Row until Number is discovered
            let start_col = loopUntilNotNumber(matrix, row, col);
            let end_col;
            if (start_col <= TOTAL_COLUMNS - 1) {
                // Now that first number is found, loop until a non-number is discovered
                end_col = loopUntilNumber(matrix, row, start_col + 1);
            } else {
                end_col = start_col;
            }

            // Conver to number
            let num = Number(matrix[row].slice(start_col, end_col).join(""));

            // Check Validity
            if (!isNaN(num)) {
                let [isValid, isGearAdjacent, gearId] = checkValidity(
                    matrix,
                    row,
                    start_col,
                    end_col,
                );

                if (isValid) {
                    validParts.push(num);
                }

                // If number is adjacent to a gear, add it to the gearConnections map
                if (isGearAdjacent) {
                    gearConnections[gearId] = gearConnections[gearId] || [];

                    gearConnections[gearId].push(num);
                }
            }

            col = end_col + 1;
        }

        row += 1;
        col = 0;
    }

    return [validParts, gearConnections];
}

const [validParts, gearConnections] = getValidParts(matrix);

const ans1 = validParts.reduce((previous, current) => {
    return previous + current;
}, 0);

let gear_ratio = 0;

for (const gearId in gearConnections) {
    if (gearConnections[gearId].length <= 1) {
        continue;
    } else {
        gear_ratio += gearConnections[gearId].reduce((previous, current) => {
            return previous * current;
        }, 1);
    }
}

console.log("Part One Answer: ", ans1);
console.log("Part Two Answer: ", gear_ratio);
