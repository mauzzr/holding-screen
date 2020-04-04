const FONT_SIZE = 16;
const DAMPING = 0.85;
const CHARSET = "*$%#@";
const DROP_STRENGTH = 255;
let charWidth;
let textRows, textCols;
let font;
let container;
let buf1, buf2;
let nextDrop = -1;

function preload() {
    font = loadFont("assets/Hack-Regular.ttf");
    container = document.getElementById("ripple");
}

function setup() {
    let canvas = createCanvas(container.clientWidth, container.clientHeight);
    canvas.parent(container);
    textFont(font);
    textSize(FONT_SIZE);
    textAlign(LEFT, TOP);
    fill(240);
    charWidth = textWidth("0");
    textRows = Math.floor(height / FONT_SIZE);
    textCols = Math.floor(width / charWidth);
    buf1 = new Array(textRows * textCols);
    buf2 = new Array(textRows * textCols);
    buf1.fill(0, 0, buf1.length);
    buf2.fill(0, 0, buf2.length);
}

function draw() {
    background("#292a2b");
    if (performance.now() > nextDrop) {
        console.log("drop");
        let row = Math.floor(1 + Math.random() * (textRows - 2));
        let col = Math.floor(1 + Math.random() * (textCols - 2));
        buf1[row * textCols + col] = DROP_STRENGTH;

        nextDrop = performance.now() + Math.floor(Math.random() * 5000);
    }
    for (let row = 1; row < textRows - 1; row++) {
        let outputLine = "";
        for (let col = 1; col < textCols - 1; col++) {
            let idx = row * textCols + col;
            buf2[idx] = (
                buf1[idx - 1] +
                buf1[idx + 1] +
                buf1[idx - textCols] +
                buf1[idx + textCols]
            ) / 2 - buf2[idx];
            buf2[idx] *= DAMPING;
            outputLine += mapToChar(buf2[idx]);
        }
        text(outputLine, 0, row * FONT_SIZE);
    }
    let tmp = buf1;
    buf1 = buf2;
    buf2 = tmp;
}

function mapToChar(num) {
    // m[num/4 % 5]

    const CHARSET = "*$%#@";
    let charIndex = Math.floor(num * CHARSET.length / DROP_STRENGTH);

    if (num < 0.1 && num > -0.1) {
        return " ";
    }
    if (charIndex < 0) {
        return ".";
    }
    if (charIndex > CHARSET.length) {
        return CHARSET[CHARSET.length - 1];
    }
    return CHARSET[charIndex];
}
