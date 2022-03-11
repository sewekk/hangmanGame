class Hangman {
	constructor() {
		this.word = 'siemaa';
		this.guessedWord = [];
		this.missed = [];
		this.apiKey = 'hello';
		this.apiUrl = 'world';
		this.letterContainer = document.querySelector('.word');
		this.letters;
		this.ifWin = false;

		this.getWord(this.apiKey, this.apiUrl);
		this.listenerOnKeyDownEvent();
	};

	getWord = (apiKey, apiUrl) => {
		this.createWordTiles(this.word.length);
	}

	createWordTiles = (wordLenght) => {
		for (let i = 0; i < wordLenght; i++) {
			const tile = document.createElement('div');
			tile.classList.add('word__letter');
			this.letterContainer.appendChild(tile);
		}

		this.displayWordTiles();
	}

	displayWordTiles = () => {
		this.letters = document.querySelectorAll('.word__letter');
		this.letters.innerHTML = "";
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

	listenerOnKeyDownEvent = () => {
		document.addEventListener('keydown', (e) => {
			this.currentLetter = e.code.slice(-1).toLowerCase();
			this.checkIfWordContainsLetter();
		})
	};

	checkIfWordContainsLetter = () => {	
		let ifGuessed = false;
		[...this.word].forEach((letter, index) => {
			if(letter === this.currentLetter){
				this.guessedWord[index] = this.currentLetter;
				console.log(index);
				ifGuessed = true;
			};
		});

		if(ifGuessed === false){
			this.missed.push(this.currentLetter);
			this.displayMissed();
		}
		
		const checkIfWin = this.checkIfWin();
		if(checkIfWin === ture){
			this.displayWinnerWindow()
		}
	};

	checkIfWin = () => {
		if(this.word === this.guessedWord.join('')){
			return true;
		} 
		else{
			return false;
		} 
	}

	displayWinnerWindow = () => {
		console.log('winner!');
	}



}
export default Hangman;