function randomRGB() {
	return Math.floor(Math.random() * 256);
}

function setOpacity(e, opacity) {
	e.target.style.opacity = String(opacity);
}

function incrementOpacity(e, increment) {
	e.target.style.opacity = String(Number(e.target.style.opacity) + increment);
}

function randomMode(e) {
	e.target.style.backgroundColor = `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`;
}

function getGridSize() {
	cellNumber = Number(prompt('Please enter Grid Size', cellNumber));
	generateGrid();
}

function toggleMode(e) {
	caller = e.srcElement;

	if (caller.id == "RGB") {
		modeRGB = !modeRGB;
	} else {
		modeProgressive = !modeProgressive;
	}
}

function fillCell(e) {
	if (e.target.classList.contains('colored') && modeProgressive) {
		incrementOpacity(e, 0.1);
	} else {
		if (modeProgressive) {
			setOpacity(e, 0.1);
		}
		if (modeRGB) {
			randomMode(e);
		} else {
			e.target.style.backgroundColor = 'black';
		}
	}
	e.target.classList.add('colored');
}

function generateGrid() {

	const list = document.getElementById('screen');

	if (list !== null) {
		while (list.hasChildNodes()) {
			list.removeChild(list.firstChild);
		}
	}

	for (let i = 0; i < cellNumber; i++) {
		const oDiv = document.createElement("div");
		oDiv.setAttribute('class', 'row');

		for (let j = 0; j < cellNumber; j++) {
			const iDiv = document.createElement("div");
			iDiv.setAttribute('class', 'column');

			iDiv.addEventListener('mouseover', fillCell);
			
			oDiv.appendChild(iDiv);
		}
		screen.appendChild(oDiv);
	}
}

let modeRGB = false;
let modeProgressive = false
let cellNumber = 16;

const body = document.getElementsByTagName("body")[0];

const screen = document.createElement("div");
screen.setAttribute('id', 'screen');
screen.setAttribute('class', 'screen');

const controls = document.createElement("div");
controls.setAttribute('class', 'controls');

const button = document.createElement("button");
button.textContent = 'Grid Size';
button.addEventListener('click', getGridSize);

const rgbMode = document.createElement("input");
rgbMode.setAttribute('type', 'checkbox');
rgbMode.setAttribute('id', 'RGB');
rgbMode.addEventListener('change', toggleMode);

const rgbLabel = document.createElement("label");
rgbLabel.textContent = 'Rainbow Mode';

const progressiveMode = document.createElement("input");
progressiveMode.setAttribute('type', 'checkbox');
progressiveMode.setAttribute('id', 'progressive');
progressiveMode.addEventListener('change', toggleMode);

const progressiveLabel = document.createElement("label");
progressiveLabel.textContent = 'Progressive Mode';

generateGrid();

body.appendChild(screen);
body.appendChild(button);
body.appendChild(rgbMode);
body.appendChild(rgbLabel);
body.appendChild(progressiveMode);
body.appendChild(progressiveLabel);
