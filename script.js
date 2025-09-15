// Global variables to track game state
let score = 0;
let selectedCards = [];
let matchedCards = [];

// Function to update score display
function updateScore(increment) {
    score += increment;
    document.getElementById('score').textContent = score;
    return score; // Return updated score
}

// Function to check if two cards match
function checkMatch(card1, card2) {
    return card1.dataset.value === card2.dataset.value;
}

// Function to handle card flip
function flipCard(card) {
    if (selectedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            if (checkMatch(selectedCards[0], selectedCards[1])) {
                matchedCards.push(...selectedCards);
                updateScore(10);
                selectedCards = [];
            } else {
                selectedCards.forEach(c => c.classList.add('shake'));
                setTimeout(() => {
                    selectedCards.forEach(c => {
                        c.classList.remove('flipped', 'shake');
                    });
                    selectedCards = [];
                    updateScore(-2);
                }, 1000);
            }
        }
    }
}

// Function to reset the game
function resetGame() {
    score = 0;
    selectedCards = [];
    matchedCards = [];
    updateScore(0);
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped', 'shake');
    });
    // Shuffle cards
    const grid = document.querySelector('.card-grid');
    const cards = Array.from(grid.children);
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        grid.appendChild(cards[j]);
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add click listeners to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => flipCard(card));
    });

    // Add click listener to reset button
    document.getElementById('resetButton').addEventListener('click', resetGame);
});