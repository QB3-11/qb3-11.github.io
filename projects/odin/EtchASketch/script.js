let cellNumber = 64;

const body = document.getElementsByTagName("body")[0];


const screen = document.createElement("div");
screen.setAttribute('class', 'screen');

const controls = document.createElement("div");
controls.setAttribute('class', 'controls');

for (let i = 0; i < cellNumber; i++) {
	const oDiv = document.createElement("div");
	oDiv.setAttribute('class', 'row');

	for (let j = 0; j < cellNumber; j++) {
		const iDiv = document.createElement("div");
		iDiv.setAttribute('class', 'column');

		iDiv.addEventListener('mouseover', (e) => {
			e.target.style.backgroundColor = 'black';
		});
		
		oDiv.appendChild(iDiv);
	}
	screen.appendChild(oDiv);
}

body.appendChild(screen);
