const cards = document.querySelectorAll('.mem-card');

let isBoardLocked = false;
let isCardRevealed = false;
let firstPick, secondPick;

// Shuffle cards
(function() {
    cards.forEach(card => card.style.order = Math.floor(Math.random() * 12));
}());

// Reveal card
function reveal() {
    if (isBoardLocked) return;
    if (this === firstPick) return;

    this.classList.add('reveal');

    if (!isCardRevealed) {
        isCardRevealed = true;
        firstPick = this;
        return;
    }

    secondPick = this;

    checkForPair();
};

// Check for pair
function checkForPair() {
    firstPick.dataset.card === secondPick.dataset.card
    ? disableCards()
    : coverCards();
};

// Cover cards
function coverCards() {
    isBoardLocked = true;
    
    setTimeout(() => {
        firstPick.classList.remove('reveal');
        secondPick.classList.remove('reveal');

        resetBoard();
    }, 800);
};

// Disable card
function disableCards() {
    firstPick.removeEventListener('click', reveal);
    secondPick.removeEventListener('click', reveal);

    resetBoard();
};

// Reset board
function resetBoard() {
    [isCardRevealed, isBoardLocked] = [false, false];
    [firstPick, secondPick] = [null, null];
};

cards.forEach(card => card.addEventListener('click', reveal));