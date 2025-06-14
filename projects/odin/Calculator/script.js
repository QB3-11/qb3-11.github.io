const outOPERATIONS = [];
const calcOPERATIONS = [];

let visibleScreenOut = false;

function addSpan(div, className, textContent) {
	const span = document.createElement("span");
	span.setAttribute('class', className);
	span.textContent = textContent;

	div.appendChild(span);
}

function clearScreen() {
	currentScreen.replaceChildren();
}

function generateGrid(div) {
	symbols = 
	[
		["AC", {"⌫": "backspace"}, {"±": "plusMinus"}, {"÷": "divide"}],
		[7, 8, 9, {"×": "multiply"}],
		[4, 5, 6, {"−": "minus"}],
		[1, 2, 3, {"+": "plus"}],
		[{"%": "percent"}, 0, ".", {"=": "equals"}]
	]
	
	for (let i = 0; i < 5; i++) {

		const row = document.createElement("div")
		row.setAttribute('class', 'row');

		for (let j = 0; j < 4; j++) {
			const btn = document.createElement("button");
			btn.setAttribute('class', 'button');
		
			let symb = symbols[i][j];

			if (typeof(symb) == "object") {
				let key = Object.keys(symb)[0];
				btn.setAttribute('id', symb[key]);
				btn.textContent = key;
			} else {
				btn.setAttribute('id', symb);
				btn.textContent = symb;
			}
			if (i == 0 || j == 3) {
				btn.classList.add('borderButtons');
			} if (i == 4 && j == 3) {
				btn.classList.add('equal');
			}
			btn.addEventListener('click', calculate);

			row.appendChild(btn);
		}
		div.appendChild(row);
	}
}

function calculate(e) {
	
	outOPERATIONS.push(e.target.id);

	
	screenOut(e.target.id);
	screenCurrent(e.target.id);


	console.log( outOPERATIONS );
}

function screenOut() {
	if (visibleScreenOut) {
		outScreen.textContent = result;
	}
}

function screenCurrent(id) {

	if (id.length > 1) {

		switch (id) {
			case "AC":
				clearScreen();
				break;

			case "backspace":

			case "plus":
				addSpan(currentScreen, 'symbols', "+");
				break;

			case "minus":
				addSpan(currentScreen, "symbols", "-");
				break;
		}
	} else {
		addSpan(currentScreen, "number", id);
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
