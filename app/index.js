import './index.scss';
import ApiToken from './js/api';
import Hangman from './js/Hangman';

window.addEventListener("DOMContentLoaded", () => {
    
    const game = new Hangman(ApiToken);
    window.addEventListener('resize', game.displayWordTiles);
    
});


