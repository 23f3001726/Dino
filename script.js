let dino = document.getElementById('dino');
let cactus = document.getElementById('cactus');
let scoreDisplay = document.getElementById('score');
let jumpSound = document.getElementById('jump-sound');
let landSound = document.getElementById('land-sound');
let score = 0;
let isJumping = false;

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

// Collision detection
function detectCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.x < cactusRect.x + cactusRect.width &&
        dinoRect.x + dinoRect.width > cactusRect.x &&
        dinoRect.y < cactusRect.y + cactusRect.height &&
        dinoRect.height + dinoRect.y > cactusRect.y
    ) {
        alert('Game Over! Your score: ' + score);
        score = 0; // Reset score
    } else {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    }
}

// Keydown event listener
document.addEventListener('keydown', jump);

// Update the game every 100ms
setInterval(detectCollision, 100);
