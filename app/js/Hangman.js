class Hangman {
	constructor() {
		this.word = 'siemaa';
		this.guessedWord = [];
		this.missed = [];
		this.apiKey = 'hello';
		this.apiUrl = 'world';
		this.letterContainer = document.querySelector('.word');
		this.missedContainer = document.querySelector('.missed__letters');
		this.letters;
		this.remainingLives = 0;
		this.partsOfBody = [
			['.head', '.hangman__neck'],
			['.chest'],
			['.arm__hand--left'],
			['.arm__hand--right'],
			['.legs'],
			['.leg__foot--left'],
			['.leg__foot--right']
		];

		this.getWord(this.apiKey, this.apiUrl);
		this.listenerOnKeyDownEvent();
	};

	getWord = (apiKey, apiUrl) => {
		this.createWordTiles(this.word.length);
		document.querySelector('.hangman').style.display = 'block';
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
		this.letters = [...document.querySelectorAll('.word__letter')];
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
			if (letter === this.currentLetter) {
				this.guessedWord[index] = this.currentLetter;
				this.letters[index].textContent = this.currentLetter;
				ifGuessed = true;
			};
		});

		if (!ifGuessed) {
			if (!this.missed.includes(this.currentLetter)) {
				this.missed.push(this.currentLetter);
				this.displayMissed(this.missed[this.missed.length - 1]);

				if (this.remainingLives < 8) {
					this.drawHangman(this.partsOfBody[this.remainingLives]);
					this.remainingLives++;
					console.log(this.remainingLives);
					if (this.remainingLives === 7) {
						setTimeout(() => alert('looser'), 1000)
					}
				}
			}
		}

		const checkIfWin = this.checkIfWin();
		if (checkIfWin === true) {
			this.displayWinnerWindow()
		}
	};

	checkIfWin = () => {
		if (this.word === this.guessedWord.join('')) {
			return true;
		} else {
			return false;
		}
	}

	displayMissed = (missedLetter) => {
		const missedLetterContainer = document.createElement('p');
		missedLetterContainer.classList.add('letters__letter');
		missedLetterContainer.textContent = `${missedLetter}`.toUpperCase();
		this.missedContainer.appendChild(missedLetterContainer);
	}

	drawHangman = (partOfBody) => {
		partOfBody.forEach(part => {
			const elementToShow = document.querySelector(`${part}`);
			elementToShow.style.opacity = 1;
		})

	}

	displayWinnerWindow = () => {
		alert('winner');
	}
}
export default Hangman;