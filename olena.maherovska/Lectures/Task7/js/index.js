let currentCopy, coordinates, isDown, values, i, createdElements;
isDown = false;
createdElements = [];
values = document.querySelectorAll('#values > div');

for (i = 0; i < values.length; i++) {
  values[i].addEventListener('mousedown', function(e) {
    currentCopy = createCurrentCopy(e.target);
    coordinates = getCoordinates(e.target);
    document.getElementById('values').appendChild(currentCopy);
    createdElements.push(currentCopy);
    clearArea(createdElements);
  });
}

document.addEventListener('mousemove', function(e) {
  e.preventDefault();
  if (isDown) {
    currentCopy.style.left = e.clientX - coordinates.x + 'px';
    currentCopy.style.top = e.clientY - coordinates.y + 'px';
    currentCopy.addEventListener('mouseup', endMoving)
  }
});

/* function creates a copy of the certain element
  params{obj} Object
  return clonedNode
*/

function createCurrentCopy(obj) {
  let clonedNode;
  isDown = true;
  clonedNode = document.createElement('div');
  clonedNode.className = obj.classList.contains('zero') ? 'zero' : 'cross';
  clonedNode.innerHTML = obj.innerHTML;
  clonedNode.style.position = 'absolute';
  return clonedNode;
}

/* function gets coordinates of an Object for shifting and centering
   the cursor
  params {obj} Object
  return coordinates
*/

function getCoordinates(obj) {
  return {
    x: obj.offsetWidth / 2,
    y: obj.offsetHeight / 2
  };
}


/* function removes elements from array and clear the area
  params{arr} Array
  return arr
*/

function clearArea(arr) {
  if (arr.length > 9) {
    arr.length = 0;
    alert('You may drag maximum 9 element');
    location.reload();
  }
  return arr;
}

/* function destroys drag on mouse up
*/
function endMoving() {
  isDown = false;
}
