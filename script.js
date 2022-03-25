let score = 0;
let genSequence = [];
let clickedSequence = [];
let playersTurn = false;

const scoreText = document.querySelector('h1');
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const button = document.querySelector('button');

let updateScoreText = () => {
    if(clickedSequence.length)
        score = clickedSequence.length;
    scoreText.innerHTML = `Score: ${score}`;
}

let toggleOpacity = async (element) => {
    element.classList.toggle('selected');
    await sleep(400);
    element.classList.toggle('selected');
}

let newLevel = async () => {
    playersTurn = false;
    updateScoreText();
    genSequence[genSequence.length] = Math.floor(Math.random() * 4);
    clickedSequence = [];

    await sleep(800);
    for (let color of genSequence) {
            toggleOpacity(testColor(color));
            await sleep(800);
    }
    waitForPlayer();
}

let testColor = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}

let checkSequence = async () => {
    for (let color in clickedSequence) {
        if(clickedSequence[color] != genSequence[color]){
            gameOver();
            break;
        }
    }
    if(clickedSequence.length == genSequence.length) {
        await sleep(800);
        newLevel();
    }
}

let waitForPlayer = () => {
    playersTurn = true;
}

let playerClick = (color) => {
    clickedSequence[clickedSequence.length] = color;
    toggleOpacity(testColor(color));
    checkSequence();
}

let gameOver = () => {
    alert(`Congratulations, you lost!\nYour score was ${score}`);
}

let restart = async () => {
    await alert('Wait a moment! Restarting...');
    await sleep(400);
    clickedSequence = 0;
    genSequence = [];
    playersTurn = false;
    score = 0;
    updateScoreText();
    start();
}

let start = async () => {
    button.innerHTML = 'Restart';
    await sleep(400);
    newLevel();
}

let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

green.onclick = () => {
    if(playersTurn)
        playerClick(0);
};

red.onclick = () => {
    if(playersTurn)
        playerClick(1);
};

yellow.onclick = () => {
    if(playersTurn)
        playerClick(2);
};

blue.onclick = () => {
    if(playersTurn)
        playerClick(3);
};

button.onclick = () => {
    if(button.innerHTML === 'Start')
        start();
    else
        restart();
};
