const container = document.querySelector('.container');
const colorPicker = document.getElementById('colorPicker');
const eraserButton = document.getElementById('eraserButton');
const rainbowButton = document.getElementById('rainbowButton');
const gridSizeInput = document.getElementById('gridSizeInput');
const gridSizeButton = document.getElementById('gridSizeButton');
const resetButton = document.getElementById('resetButton');
let isErasing = false;
let isRainbow = false;
let isSolid = false;

function handleDragStart(event) {
    event.preventDefault();
}

function createGrid(size) {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('dragstart', handleDragStart);
        container.appendChild(square);
    }
}

function deactivateModes() {
    isErasing = false;
    isRainbow = false;
    isSolid = false;
    eraserButton.classList.remove('selected');
    rainbowButton.classList.remove('selected');
    colorPicker.classList.remove('rainbow');
}

container.addEventListener('click', () => {
    if (!isSolid && !isErasing && !isRainbow) {
        alert('Please select an option (Solid Color, Eraser, or Rainbow) before drawing.');
    }
});

colorPicker.addEventListener('input', () => {
    if (!isRainbow && !isSolid) {
        isErasing = false;
    }
});

eraserButton.addEventListener('click', () => {
    deactivateModes();
    isErasing = true;
    colorPicker.value = "#FFFFFF";
    eraserButton.classList.add('selected');
});

rainbowButton.addEventListener('click', () => {
    deactivateModes();
    isRainbow = true;
    rainbowButton.classList.add('selected');
});

colorPicker.addEventListener('click', () => {
    deactivateModes();
    isSolid = true;
});

gridSizeButton.addEventListener('click', () => {
    const newSize = parseInt(gridSizeInput.value);
    if (!isNaN(newSize)) {
        const sanitizedSize = Math.min(100, Math.max(1, newSize));
        createGrid(sanitizedSize);
        deactivateModes();
    }
});

resetButton.addEventListener('click', () => {
    createGrid(parseInt(gridSizeInput.value));
    deactivateModes();
});

createGrid(16); // Initial grid size

container.addEventListener('mousedown', () => {
    container.addEventListener('mousemove', handleMousemove);
});

container.addEventListener('mouseup', () => {
    container.removeEventListener('mousemove', handleMousemove);
});

function handleMousemove(e) {
    if (e.target.classList.contains('square')) {
        if (isSolid) {
            e.target.style.backgroundColor = colorPicker.value;
            e.target.dataset.colored = true;
        } else if (isErasing) {
            e.target.style.backgroundColor = 'white';
            e.target.dataset.colored = false;
        } else if (isRainbow) {
            const randomColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
            e.target.style.backgroundColor = randomColor;
            e.target.dataset.colored = true;
        }
    }
}

container.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('square')) {
        e.target.dataset.colored = false;
    }
});
