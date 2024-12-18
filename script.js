// Global Variables
let score = 0;
let level = 1;
let currentColor = null;
let bottles = [];
let redirectTimer = null;

// Initialize Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Get UI Elements
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const nextLevelButton = document.getElementById('next-level');
const colorButtons = document.querySelectorAll('.color-btn');
const adContainer = document.getElementById('ad-container');

// Bottle Class
class Bottle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 120;
        this.color = null; // Color inside bottle
        this.filled = false;
    }

    draw() {
        ctx.fillStyle = this.color || '#fff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    fill(color) {
        if (!this.filled) {
            this.color = color;
            this.filled = true;
            updateScore(10); // Score increment for filling bottle
        }
    }
}

// Create bottles
function createBottles() {
    bottles = [];
    for (let i = 0; i < 4; i++) {
        bottles.push(new Bottle(80 + i * 100, 100));
    }
    drawBottles();
}

// Draw all bottles
function drawBottles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bottles.forEach(bottle => bottle.draw());
}

// Update Score
function updateScore(points) {
    score += points;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Update Level
function updateLevel() {
    level++;
    levelDisplay.textContent = `Level: ${level}`;
}

// Handle Color Click
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentColor = button.getAttribute('data-color');
    });
});

// Handle Bottle Click
canvas.addEventListener('click', (e) => {
    if (!currentColor) return;

    const x = e.offsetX;
    const y = e.offsetY;

    bottles.forEach(bottle => {
        if (x >= bottle.x && x <= bottle.x + bottle.width &&
            y >= bottle.y && y <= bottle.y + bottle.height) {
            bottle.fill(currentColor);
            drawBottles();
        }
    });
});

// Next Level Button
nextLevelButton.addEventListener('click', () => {
    updateLevel();
    createBottles();
    nextLevelButton.style.display = 'none';
    setTimeout(() => {
        nextLevelButton.style.display = 'inline-block';
    }, 1000);
});

// Redirection Timer
function startRedirectionTimer() {
    redirectTimer = setInterval(() => {
        window.open('https://www.example.com', '_blank');
    }, 15000); // Every 15 seconds
}

// Show Ads (Example)
function showAd() {
    adContainer.style.display = 'block';
}

// Initialize Game
function initGame() {
    createBottles();
    startRedirectionTimer();
    showAd();
}

// Start the Game
initGame();
