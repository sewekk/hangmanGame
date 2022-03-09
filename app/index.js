import './index.scss';
import Hangman from './js/Hangman';

window.addEventListener("DOMContentLoaded", () => {
    const game = new Hangman();
    window.addEventListener('resize', game.displayWordTiles);
});


