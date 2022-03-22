class Hangman {
	constructor(apiKey) {
		this.word;
		this.guessedWord = [];
		this.missed = [];
		this.apiKey = apiKey;
		this.apiUrl = 'https://api.wordnik.com/v4/words.json/';
		this.letterContainer = document.querySelector('.word');
		this.missedContainer = document.querySelector('.missed__letters');
		this.goNextWordModal = document.querySelector('.go-next-word');
		this.ModalMessage = document.querySelector('.go-next-word__status');
		this.newWordBtn = document.querySelector('.button');
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
		fetch(`${apiUrl}randomWord?&api_key=${apiKey}`)
			.then(response => response.json())
			.then(response => this.word = response.word.toLowerCase())
			.then(() => {
				this.createWordTiles(this.word.length);
				document.querySelector('.hangman').style.display = 'block';
			})
			.catch(error => alert(error))
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
		console.log(this.letterContainer.offsetWidth);
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
					this.drawHangman(this.partsOfBody[this.remainingLives], 1);
					this.remainingLives++;
					console.log(this.remainingLives);
					if (this.remainingLives === 7) {

						this.letters.forEach((item, index) => {
							item.textContent = this.word[index];
						})

						setTimeout(() => {
							this.displayEndGameWindow('You Lost!')
						}, 500)
					}
				}
			}
		}

		const checkIfWin = this.checkIfWin();
		if (checkIfWin === true) {
			setTimeout(()=>{
				this.displayEndGameWindow('You Won!')
			},500)	
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

	drawHangman = (partOfBody, value) => {
		partOfBody.forEach(part => {
			const elementToShow = document.querySelector(`${part}`);
			elementToShow.style.opacity = value;
		});
	}

	displayEndGameWindow = (status) => {
		this.ModalMessage.textContent = status;
		this.goNextWordModal.style.display = 'flex';
		this.newWordBtn.addEventListener('click', this.reset);
	}

	reset = () =>{
		document.querySelector('.hangman').style.display = 'none';
		this.partsOfBody.forEach(item =>{
			this.drawHangman(item,0);
		});
		this.remainingLives = 0;
		this.missed = [];
		this.guessedWord = [];
		this.missedContainer.innerHTML = "";
		this.letterContainer.innerHTML = "";
		this.getWord(this.apiKey, this.apiUrl);
		this.goNextWordModal.style.display = 'none';
	}
}
export default Hangman;