let dino = document.getElementById('dino');
let scoreDisplay = document.getElementById('score');
let jumpSound = document.getElementById('jump-sound');
let landSound = document.getElementById('land-sound');
let startBtn = document.getElementById('start-btn');
let stopBtn = document.getElementById('stop-btn');
let score = 0;
let isJumping = false;
let obstacleInterval;
let obstacleSpeed = 2;
let obstacleCounter = 0;
let gameInterval;

// Jump function
function jump() {
    if (isJumping) return;
    isJumping = true;
    jumpSound.play();

    dino.style.bottom = '100px'; // Jump height
    setTimeout(() => {
        dino.style.bottom = '20px'; // Back to ground
        isJumping = false;
        landSound.play();
    }, 600); // Jump duration
}

// Create a cactus obstacle
function createCactus() {
    const cactus = document.createElement('div');
    cactus.classList.add('cactus');
    cactus.style.right = '-40px'; // Start off-screen
    document.querySelector('.game-container').appendChild(cactus);

    // Move cactus across the screen
    const interval = setInterval(() => {
        cactus.style.right = (parseInt(cactus.style.right) + obstacleSpeed) + 'px';

        if (parseInt(cactus.style.right) > 600) {
            clearInterval(interval);
            cactus.remove();
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        }

        detectCollision(cactus, interval);
    }, 100);
}

// Create a bird obstacle
function createBird() {
    const bird = document.createElement('div');
    bird.classList.add('bird');
    bird.style.right = '-40px'; // Start off-screen
    document.querySelector('.game-container').appendChild(bird);

    // Move bird across the screen
    const interval = setInterval(() => {
        bird.style.right = (parseInt(bird.style.right) + obstacleSpeed) + 'px';

        if (parseInt(bird.style.right) > 600) {
            clearInterval(interval);
            bird.remove();
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        }

        detectCollision(bird, interval);
    }, 100);
}

// Collision detection
function detectCollision(obstacle, interval) {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        dinoRect.x < obstacleRect.x + obstacleRect.width &&
        dinoRect.x + dinoRect.width > obstacleRect.x &&
        dinoRect.y < obstacleRect.y + obstacleRect.height &&
        dinoRect.height + dinoRect.y > obstacleRect.y
    ) {
        alert
