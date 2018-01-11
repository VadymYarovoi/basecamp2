const images = document.querySelector('.images'),
  container = document.querySelector('.container');
let xPos,
  yPos,
  button,
  step = 0;

/**
 * Function for reloading game.
 */
const reloadGame = () => {
  images.style.display = 'block';
  button.parentNode.removeChild(button);
  for (let i = 0; i < container.children.length; i++) {
    container.children[i].style = null;
  }
  step = 0;
};

/**
 * End game.
 * Launch when all boxes filled images.
 */
const endGame = () => {
  images.style.display = 'none';
  button = document.createElement('button');
  button.textContent = 'Play Again';
  document.body.appendChild(button);
  button.addEventListener('click', reloadGame);
};

/**
 * Function for setup coordinates for
 * target element in order to move element
 * @param {*event} e
 */
const moveElement = e => {
  const target = e.target;
  target.style.position = 'absolute';
  target.style.top = `${e.clientY - yPos}px`;
  target.style.left = `${e.clientX - xPos}px`;
};

/**
 * Function called when user clicked on element.
 * If user click we calculate coordinates
 * and called function for moving element
 * @param {*event} e
 */
const mouseDown = e => {
  e.preventDefault();
  const target = e.target;
  if (!target.classList.contains('draggable')) {
    return;
  }
  target.style.cursor = 'move';
  xPos = e.clientX - target.offsetLeft;
  yPos = e.clientY - target.offsetTop;
  target.addEventListener('mousemove', moveElement);
};

/**
 * Function called when user let go of the button.
 * if user let go element we calculate his coordinates & coordinates of cells
 * and check if element fall into a zone of cell.
 * If true we append element to cell.
 * @param {*event} e
 */
const mouseUp = e => {
  step++;
  const targetElement = e.target,
    boxes = container.querySelectorAll('.box'),
    targetRect = targetElement.getBoundingClientRect(),
    x = targetRect.x + targetRect.width / 2,
    y = targetRect.y + targetRect.height / 2;
  for (let i = 0; i < boxes.length; i++) {
    let coords = boxes[i].getBoundingClientRect();
    if (
      coords.x <= x &&
      coords.x + coords.width > x &&
      coords.y <= y &&
      coords.y + coords.height > y
    ) {
      boxes[i].style.backgroundImage = `url('${targetElement.src}')`;
      Object.assign(targetElement.style, {
        position: '',
        left: '',
        top: ''
      });
      break;
    }
  }
  if (step === 9) {
    endGame();
  }
  targetElement.removeEventListener('mousemove', moveElement);
};

//Add Listeners
document.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);
