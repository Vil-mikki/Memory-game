class EmojiSet {
    constructor(array) {
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
    constructor(gameName) {
        var newGame = document.querySelector(gameName);
        newGame.clickCounter = 0;
        return newGame;
    }
}

class Cards {
    cardsArr = [];
    constructor(game, number) {
        for (let i = 0; i < number; i++) {
            var card = document.createElement('li');
            card.className = 'game__card';
            game.appendChild(card);
            this.cardsArr.push(card);
        }
    }
    getAnimal(em) {
        for (let i = 0; i < emoji.length; i++) {
            this.cardsArr[i].dataset.em = em[i];
        }
    }
}

//создаем игру
var game = new Game('.game');

//присваиваем эмоджи
var emoji = new EmojiSet(['🐶', '🐼', '🐱', '🐯', '🐵', '🐼', '🐱', '🐨', '🐶', '🐯', '🐨', '🐵']);

//отрисовываем карточки
var cards = new Cards(game, 12);
cards.getAnimal(emoji);

//сравниваем карточки
var matchingArr = [];

game.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        matchingArr.push(event.target);
        if (!event.target.classList.contains('card-open')) {
            this.clickCounter += 1;
            event.target.classList.add('card-open');
        }
    }
    if (game.clickCounter === 1) {
        setTimer();
    }
    if (game.clickCounter % 3 === 2 && matchingArr[0].dataset.em === matchingArr[1].dataset.em) {
        matchingArr[0].classList.add('match');
        matchingArr[1].classList.add('match');
    }
    if (game.clickCounter % 3 === 2 && matchingArr[0].dataset.em !== matchingArr[1].dataset.em) {
        matchingArr[0].classList.add('nomatch');
        matchingArr[1].classList.add('nomatch');
    }
    if (game.clickCounter % 3 === 0) {
        var thirdClick = matchingArr[2];
        if (matchingArr[0].classList.contains('nomatch')) {
            matchingArr[0].classList.remove('card-open');
            matchingArr[1].classList.remove('card-open');
            matchingArr[0].classList.remove('nomatch');
            matchingArr[1].classList.remove('nomatch');
        }
        this.clickCounter++;
        matchingArr = [];
        matchingArr.push(thirdClick);
    }
})


//статус игры
var winStatus = ['W', 'i', 'n'];
var loseStatus = ['L', 'o', 's', 'e'];
var statusWindow = document.querySelector(".modal");
var statusTitle = document.querySelector(".pop-up__title");
var playAgain = document.querySelector(".pop-up__button");

//установка таймера и вывод окна с результатом игры
function setTimer() {
    var i = 59;
    var winArr = [];
    var interval = setInterval(function () {
        document.querySelector(".timer").innerHTML = "00:" + i;
        if (i < 10) {
            document.querySelector(".timer").innerHTML = "00:0" + i;
        };
        cards.cardsArr.forEach(function (card) {
            if (card.classList.contains("match") && winArr.indexOf(card) === -1) {
                winArr.push(card);
            }
        });
        if (winArr.length === 12) {
            clearInterval(interval);
            statusWindow.style.display = "flex";
            winStatus.forEach(function (letter) {
                var span = document.createElement('span');
                statusTitle.appendChild(span);
                span.innerHTML = letter;
            })
            playAgain.innerHTML = "Play again";
        };
        if (i === 0) {
            clearInterval(interval);
            statusWindow.style.display = "flex";
            loseStatus.forEach(function (letter) {
                var span = document.createElement('span');
                statusTitle.appendChild(span);
                span.innerHTML = letter;
            })
            playAgain.innerHTML = "Try again";
        };
        i = i - 1;
    }, 1000);
}

function resetTimer() {
    document.querySelector(".timer").innerHTML = "01:00";
}


//начинаем новую игру по клику на кнопку
playAgain.addEventListener("click", function (event) {
    statusWindow.style.display = "none";
    resetTimer();
    cards.cardsArr.forEach(function(card) {
        card.classList.remove("card-open");
        card.classList.remove("match");
        card.classList.remove("nomatch");
    });
    //когда новая игра начинается нужно очищать статус игры в поп-апе
    var spansForRemove = [...document.querySelectorAll("span")];
    spansForRemove.forEach(function(span) {
        statusTitle.removeChild(span);
    });
    game.clickCounter = 0;
    matchingArr = [];
    var newEmoji = new EmojiSet(['🐶', '🐼', '🐱', '🐯', '🐵', '🐼', '🐱', '🐨', '🐶', '🐯', '🐨', '🐵']);
    cards.getAnimal(newEmoji);
})