import './index.scss';

const letters = document.querySelectorAll('.word__letter');
const lettersContainerWidth = document.querySelector('.word').offsetWidth;

const widthOfLetter = (lettersContainerWidth / letters.length) - 10;

console.log(widthOfLetter);
letters.forEach(item => {
    item.style.width = `${widthOfLetter}px`;
    item.style.height = `${widthOfLetter}px`;
})

