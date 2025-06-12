function generateGrid(div) {
	symbols = 
	[
		["AC", "⌫", "±", "÷"],
		[7, 8, 9, "×"],
		[4, 5, 6, "−"],
		[1, 2, 3, "+"],
		["%", 0, ".", "="]
	]
	
	for (let i = 0; i < 5; i++) {

		const row = document.createElement("div")
		row.setAttribute('class', 'row');

		for (let j = 0; j < 4; j++) {
			const btn = document.createElement("button");
			btn.setAttribute('class', 'button');
			btn.setAttribute('id', `${symbols[i][j]}`);
			btn.textContent = symbols[i][j];

			if (i == 0 || j == 3) {
				btn.classList.add('borderButtons');
			} if (i == 4 && j == 3) {
				btn.classList.add('equal');
			}

			row.appendChild(btn);
		}
		div.appendChild(row);
	}
}

const container = document.getElementById("container");

const calculator = document.createElement("div");
calculator.setAttribute('id', 'calculator');

const currentScreen = document.createElement("div");
currentScreen.setAttribute('id', 'currentScreen');

const outScreen = document.createElement("div");
outScreen.setAttribute('id', 'outScreen');

const screen = document.createElement("div");
screen.setAttribute('id', 'screen');
screen.appendChild(currentScreen);
screen.appendChild(outScreen);

const buttonGrid = document.createElement("div");
buttonGrid.setAttribute('id', 'buttonGrid');
generateGrid(buttonGrid);

calculator.appendChild(screen);
calculator.appendChild(buttonGrid);

container.appendChild(calculator);
