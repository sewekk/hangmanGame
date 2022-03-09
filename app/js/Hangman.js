class Hangman {
	constructor() {
		this.word = 'siemaa';
		this.missed = [];
		this.apiKey = 'hello';
		this.apiUrl = 'world';
		this.letterContainer = document.querySelector('.word');
		this.letters;

		this.getWord(this.apiKey, this.apiUrl);
	}

	getWord(apiKey, apiUrl) {
		this.createWordTiles(this.word.length);
	}

	createWordTiles(wordLenght) {
		for (let i = 0; i < wordLenght; i++) {
			const tile = document.createElement('div');
			tile.classList.add('word__letter');
			this.letterContainer.appendChild(tile);
		}

		this.displayWordTiles();
	}

	displayWordTiles = () => {
		this.letters = document.querySelectorAll('.word__letter');
		const lettersContainerWidth = this.letterContainer.offsetWidth;
		let widthOfLetter = (lettersContainerWidth / this.letters.length) - 10;

		if (widthOfLetter > 105) {
			widthOfLetter = 105;
		};

		this.letterContainer.style.fontSize = `${widthOfLetter / 2}px`

		this.letters.forEach(item => {
			item.style.width = `${widthOfLetter}px`;
			item.style.height = `${widthOfLetter}px`;
		});
	};

}
export default Hangman;