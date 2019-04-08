var game = document.querySelector('.game');
var emoji = ['🐶', '🐼', '🐱', '🐯', '🐵', '🐼', '🐱', '🐨', '🐶', '🐯', '🐨', '🐵'];
var cards = document.querySelectorAll('.game__card');

for(let i = 0; i < emoji.length; i++) {
    cards[i].dataset.em = emoji[i];
}

game.addEventListener('click', function(event) {
    if(event.target.tagName === 'LI') {
        if(event.target.classList.contains('card-open')){
            event.target.classList.remove('card-open');
            event.target.classList.add('card-close');
        } else if(event.target.classList.contains('card-close')) {
            event.target.classList.remove('card-close');
            event.target.classList.add('card-open');
        } else {
            event.target.classList.add('card-open');
        }
    }
})
