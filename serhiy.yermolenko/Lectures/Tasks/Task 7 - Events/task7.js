let dragObject = {},
counter = 0,
xWin = false,
zWin = false,
fields = document.getElementsByClassName("field"),
refresh = document.getElementById("refresh"),
player1 = document.getElementById("X"),
player2 = document.getElementById("0"),
players = document.getElementById("players"),
field1 = document.getElementById("field1"),
field2 = document.getElementById("field2"),
field3 = document.getElementById("field3"),
field4 = document.getElementById("field4"),
field5 = document.getElementById("field5"),
field6 = document.getElementById("field6"),
field7 = document.getElementById("field7"),
field8 = document.getElementById("field8"),
field9 = document.getElementById("field9");

players.addEventListener("mousedown", e =>
{
	let src;

	if(e.which !== 1)
		return;

	if(e.target !== player1 && counter % 2 !== 1 || e.target !== player2 && counter % 2 !== 0)
		return;

	if(xWin || zWin || counter === null)
		return;

	e.preventDefault();
	dragObject.elem = e.target.cloneNode(true);

	dragObject.downX = e.pageX;
    dragObject.downY = e.pageY;

}, false);



document.addEventListener("mousemove", e =>
{

	if(!dragObject.elem)
		return;

	var moveX = e.pageX - dragObject.downX;
    var moveY = e.pageY - dragObject.downY;

    if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3)
    	return;

    document.body.appendChild(dragObject.elem);

    dragObject.elem.style.position = 'absolute';

    dragObject.downX = e.pageX - dragObject.elem.offsetWidth / 2 + 'px';
    dragObject.downY = e.pageY - dragObject.elem.offsetHeight / 2 + 'px';

    dragObject.elem.style.left = dragObject.downX;
    dragObject.elem.style.top = dragObject.downY;
}, false);

document.addEventListener("mouseup", e =>
{	
	if(!dragObject.elem)
		return;

	let dropElem;
	dragObject.elem.hidden = true;

	dropElem = document.elementFromPoint(e.clientX, e.clientY);

	dragObject.elem.hidden = false;

	if(dropElem.classList.contains('field'))
	{
		let img = document.createElement('img');

		if(counter % 2 === 0)
		{
			img.setAttribute("src", player1.getAttribute('src'));
			dropElem.classList.add("player1");
		}

		else if(counter % 2 === 1)
		{
			img.setAttribute("src", player2.getAttribute('src'));
			dropElem.classList.add("player2");
		}
		
		dropElem.appendChild(img);
		dragObject.elem.hidden = true;
		dragObject = {};
		counter++;
	}

	if(counter >= 5)
	{
		check();
	}
}, false);

refresh.addEventListener("click", () =>
{
	for(let i = 0; i < fields.length; i++)
	{
		fields[i].innerHTML = '';
		if(fields[i].classList.contains("player1"))
		{
			fields[i].classList.remove("player1");
		}
		if(fields[i].classList.contains("player2"))
		{
			fields[i].classList.remove("player2");
		}
	}
	counter = 0;
	xWin = false;
	zWin = false;
}, false);

document.ondragstart = () => false;

function check()
{
	if( field1.classList.contains("player1") && field2.classList.contains("player1") && field3.classList.contains("player1") ||
		field4.classList.contains("player1") && field5.classList.contains("player1") && field6.classList.contains("player1") ||
		field7.classList.contains("player1") && field8.classList.contains("player1") && field9.classList.contains("player1") ||
		field1.classList.contains("player1") && field4.classList.contains("player1") && field7.classList.contains("player1") ||
		field2.classList.contains("player1") && field5.classList.contains("player1") && field8.classList.contains("player1") ||
		field3.classList.contains("player1") && field6.classList.contains("player1") && field9.classList.contains("player1") ||
		field1.classList.contains("player1") && field5.classList.contains("player1") && field9.classList.contains("player1") ||
		field3.classList.contains("player1") && field5.classList.contains("player1") && field7.classList.contains("player1"))
	{
		xWin = true;
		alert("X wins!");
	}

	if( field1.classList.contains("player2") && field2.classList.contains("player2") && field3.classList.contains("player2") ||
		field4.classList.contains("player2") && field5.classList.contains("player2") && field6.classList.contains("player2") ||
		field7.classList.contains("player2") && field8.classList.contains("player2") && field9.classList.contains("player2") ||
		field1.classList.contains("player2") && field4.classList.contains("player2") && field7.classList.contains("player2") ||
		field2.classList.contains("player2") && field5.classList.contains("player2") && field8.classList.contains("player2") ||
		field3.classList.contains("player2") && field6.classList.contains("player2") && field9.classList.contains("player2") ||
		field1.classList.contains("player2") && field5.classList.contains("player2") && field9.classList.contains("player2") ||
		field3.classList.contains("player2") && field5.classList.contains("player2") && field7.classList.contains("player2"))
	{
		zWin = true;
		alert("0 wins!");
	}

	if(counter === 9 && xWin === false && zWin === false)
	{
		alert("That's a draw!");
		counter = null;
	}
}