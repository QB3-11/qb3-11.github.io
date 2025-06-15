let OPERATIONS = [];

let lastChildSymb = false;
let ifCalculated = true;

function isNum(string) {
	return Object.is(Number(string), NaN);
}

function addSpan(div, className, textContent) {
	const span = document.createElement("span");
	span.setAttribute('class', className);
	span.textContent = textContent;

	div.appendChild(span);
}

function refreshDiv(div) {
	div.replaceChildren();
	
	for (let i = 0; i < OPERATIONS.length; i++) {
		let span = document.createElement('span');
		let element = OPERATIONS[i];

		if(Number(element)) {
			span.setAttribute('class', 'number');
		} else {
			span.setAttribute('class', 'symbol');
		}
		
		if (Number(element < 0)) {
			span.textContent = `(${element})`
		} else {
			span.textContent = element;
		}
		div.appendChild(span);
	}
}

function stringToOperations(array) {
	temp = [];
	temp_str = "";

	for (let i = 0; i < array.length; i++) {

		if (isNum(array[i]) && array[i] !== '.') {
			temp.push(temp_str);
			temp.push(array[i]);
			temp_str = "";
			continue;
		}
		temp_str += array[i];
	}
	if (temp_str.length > 0) {
		temp.push(temp_str);
	}
	OPERATIONS = temp;
}

function arith(operation, index) {
	if (index <= -1) return ;
	let rightNum = Number(OPERATIONS[index + 1]);
	let leftNum = Number(OPERATIONS[index - 1]);

	if (rightNum) {
		switch (operation) {
			
			case "×":
				return leftNum * rightNum;
				break;

			case "÷":
				return leftNum / rightNum;
				break;

			case "+":
				return leftNum + rightNum;
				break;

			case "−":
				return leftNum - rightNum;
				break;

			case "%":
				return leftNum / 100 * rightNum;
				break;
		}
	} else {
		if (operation === "%") {
			return leftNum / 100;
		} else {
			return leftNum;
		}
	}
}

function calcOperations(ret) {
	const BODMAS = ["÷","×","+","−","%"];

	let index = 0;

	for (op of BODMAS) {
		console.log( OPERATIONS );
		if (OPERATIONS.length > 1) {
			do {
				index = OPERATIONS.indexOf(op);
				let val = arith(op, index);
				if (val) {
					OPERATIONS.splice(index - 1, 3, val);	
				}
				continue;
			}
			while ( index > 0);
		} else {
			break;
		}
	}
	if (OPERATIONS[0] % 1 > 0) {
		OPERATIONS[0] = Math.round(OPERATIONS[0] * 10000) / 10000;
	}
	if (!ret) {
		outScreen.textContent = OPERATIONS[0];
	} else {
		return OPERATIONS[0];
	}
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
	
	screenCurrent(e.target);
}

function screenOut(value) {
	if (visibleScreenOut) {
		outScreen.textContent = value;
	}
}

function screenCurrent(target) {

	if (target.id.length > 1) {

		switch (target.id) {
			case "AC":
				currentScreen.replaceChildren();
				OPERATIONS.splice(0, OPERATIONS.length);
				break;

			case "backspace":
				OPERATIONS.pop();
				currentScreen.removeChild(currentScreen.lastChild);
				break;

			case "plusMinus":	
				if (isNum(OPERATIONS[-1]) && OPERATIONS.length > 0) {
					OPERATIONS.push(-Number(OPERATIONS.pop()));
					refreshDiv(currentScreen);
				}
				break;

			case "equals":
				currentScreen.replaceChildren();
				addSpan(currentScreen, 'number', calcOperations(true));
				OPERATIONS = [];

				ifCalculated = true;
				break;

			default:
				if (OPERATIONS.length > 0 && !lastChildSymb) {
					OPERATIONS.push(target.textContent);
					addSpan(currentScreen, "symbol", target.textContent);
				}
				lastChildSymb = true;
				break;
		}
	} else {
		lastChildSymb = false;

		if (Number(OPERATIONS[OPERATIONS.length - 1]) < 0) {
			OPERATIONS.push("+");
			addSpan(currentScreen, "symbol", "+");
		}
		if (ifCalculated){
			currentScreen.replaceChildren();
			ifCalculated = false;
		}
		OPERATIONS.push(target.id);
		addSpan(currentScreen, "number", target.id);
	}

	stringToOperations(OPERATIONS);
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
