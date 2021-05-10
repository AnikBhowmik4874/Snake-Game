let inputdir = { x: 0, y: 0 };

const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let speed = 8;
let score = 0;
let lastpointtime = 0;

let snakeArr = [{ x: 15, y: 15 }];
let food = { x: 12, y: 10 };
//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpointtime) / 1000 < 1 / speed) {
        return;
    }
    lastpointtime = ctime;
    gameEngine();
}

function iscolide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            musicSound.pause();
            musicSound.currentTime = 0;
            inputdir = { x: 0, y: 0 };
            alert("GAME OVER!");
            snakeArr = [{ x: 15, y: 15 }];
            score = 0;

        }
    }
    //if it bump into wall
    if (snake[0].x >= 22 || snake[0].x <= 0 || snake[0].y >= 22 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    //updating snakeArr and Food
    if (iscolide(snakeArr)) {
        musicSound.pause();
        musicSound.currentTime = 0;
        inputdir = { x: 0, y: 0 };
        gameOverSound.play();
        alert("GAME OVER!");
        snakeArr = [{ x: 15, y: 15 }];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;

    }
    //if you have eaten the food then increment the score and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y });
        let a = 2;
        let b = 20;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;


    //displaying snake and food
    //display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    });

    // display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//main logic function
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 0 };
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            musicSound.play();
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case 'ArrowDown':
            musicSound.play();
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case 'ArrowLeft':
            musicSound.play();
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case 'ArrowRight':
            musicSound.play();
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
});