class EmojiSet {
    constructor (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
}

class Game {
    constructor (gameName) {
        var newGame = document.querySelector(gameName);
        newGame.clickCounter = 0;
        return newGame;
    }
}

class Cards {
    cardsArr = [];
    constructor (game, number) {
        for(let i = 0; i < number; i++) {
            var card = document.createElement('li');
            card.className = 'game__card';
            game.appendChild(card);
            this.cardsArr.push(card);
        }
    }
    getAnimal() {
        for(let i = 0; i < emoji.length; i++) {
            this.cardsArr[i].dataset.em = emoji[i];
        }
    }
}

//создаем игру
var game = new Game('.game');

//присваиваем эмоджи
var emoji = new EmojiSet(['🐶', '🐼', '🐱', '🐯', '🐵', '🐼', '🐱', '🐨', '🐶', '🐯', '🐨', '🐵']);

//отрисовываем карточки
var cards = new Cards(game, 12);
cards.getAnimal();


var matchingArr = [];

game.addEventListener('click', function(event) {
    if(event.target.tagName === 'LI') {
        matchingArr.push(event.target);
        if(!event.target.classList.contains('card-open')){
            this.clickCounter += 1;
            event.target.classList.add('card-open');
        }
    }

    if(game.clickCounter < 3) {
        var firstClick = matchingArr[0];
        var secondClick = matchingArr[1];
        if(game.clickCounter === 2 && firstClick.dataset.em === secondClick.dataset.em) {
            firstClick.classList.add('match');
            secondClick.classList.add('match');
        }
        if(game.clickCounter === 2 && firstClick.dataset.em !== secondClick.dataset.em) {
            firstClick.classList.add('nomatch');
            secondClick.classList.add('nomatch');
        }
    } else if (game.clickCounter === 3) {
        var thirdClick = matchingArr[2];
        if(matchingArr[0].classList.contains('nomatch')) {
            matchingArr[0].classList.remove('card-open');
            matchingArr[1].classList.remove('card-open');
            matchingArr[0].classList.remove('nomatch');
            matchingArr[1].classList.remove('nomatch');
        }
        this.clickCounter = 1;
        matchingArr = [];
        matchingArr.push(thirdClick);
    }
})
