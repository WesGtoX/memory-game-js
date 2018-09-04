/** Renderização HTML */
const cardBoard = document.querySelector("#cardboard");
const images = [
    'python.svg',
    'django.svg',
    'react.svg',
    'archlinux.svg',
    'css-3.svg',
    'html-5.svg',
];

let cardHTML = "";

images.forEach(img => {
    cardHTML += `
    <div class="memory-card" data-card="${img}">
        <img class="front-face" src="img/${img}"/>
        <img class="back-face" src="img/js-badge.svg">
    </div>
    `;
});

cardBoard.innerHTML = cardHTML + cardHTML;

/** Fim da Renderização HTML */


const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;       // bloqueia as 'cards' quando estiver desabilitando as 'cards'.

function flipCard() {
    if (lockCards) return false;
    this.classList.add("flip");

    if (!firstCard) {        // verifica se a firstCard foi definica.
        firstCard = this;   // caso foi definida, ele declara ela como this.

        return false;       // sai da função.
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;       // verifica se o card do primeiro, é o mesmo do segundo.

    !isMatch ? disableCards() : resetCards(isMatch);
}

function disableCards() {
    lockCards = true;
    setTimeout(() => {          // delay de um segundo para remover os flips.
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetCards();
    },1000)
}

(function shuffle() {       // randomiza a posição das 'cards'.
    cards.forEach( card => {
        let rand = Math.floor(Math.random() * 12);
        card.style.order = rand;
    })
})()

function resetCards(isMatch = false) {      // reseta as variáveis.
    if (isMatch) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }
    [firstCard, secondCard, lockCards] = [null, null, false];     // sintaxe do ES6
}

cards.forEach(card => card.addEventListener("click",flipCard));