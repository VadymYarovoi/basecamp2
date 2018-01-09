/*
*	Classes declatation
*/
/***********************************************************************************************************
*	Class Grid
*	An instance of this class dynamically creates play grid and contains methods for processing of cells;
*/
class Grid{

/*
*	Constructor
* 	@param { string } elId (id of the element to append this grid as child node)
*/
	constructor(elId){
		this.cells = [];						// for containing all of cells (DOM-elements)
		this.setCells(elId);
	}

	setCells(elId){

		var grid = document.createElement('div');			// new div.grid for containing of columns inside
		grid.className = 'grid';

		for (let i = 0; i < 3; i++)
		{
			var row = document.createElement('div');		// 3 div.columns for containing of cells inside
			row.className = 'column';

			for (let j = 0; j < 3; j++)
			{
				var cell = document.createElement('div');	// 3 div.cells
				cell.className = 'cell';
	  			this.cells.push(cell);				// array contains all of these elements for quick access
	  			row.appendChild(cell);
			}
				grid.appendChild(row);
		}
	
	  	document.getElementById(elId).appendChild(grid);

	}

	marco(x, y){	

		for (let i = 0; i < this.cells.length; i++)

			if ( this.polo( this.cells[i], x, y ) )
			{
				if (this.cells[i].hasChildNodes()) 
					this.cells[i].classList.add("occupied");

				this.cells[i].classList.add("hover");

			}
			else this.cells[i].classList.remove("hover");

	}

	polo(el, x, y){

		if (el.offsetLeft < x && el.offsetLeft + el.clientWidth  > x && 
			el.offsetTop  < y && el.offsetTop  + el.clientHeight > y ) 
				return true;

		return false;
	}

	isfilled(){
		return this.cells.reduce((acc, item) => { 
			return acc && item.hasChildNodes() 
		}, true);
	}

	refresh(){

		for (let i=0; i<g.cells.length; i++){

			if (this.cells[i].hasChildNodes()) 
				this.cells[i].removeChild(this.cells[i].childNodes[0]);

				this.cells[i].className = 'cell';
		}

	}

}

/***********************************************************************************************************
*	Class Shape
*	An instance of this class dynamically creates DOM-element with setted className and provides own drag&drop methods.
*/
class Shape {

/*
*	Constructor
* 	@param { string } className of DOM-element
*/
	constructor(className) {
	    this.className = className;
	  	this.defaultParent = document.getElementById('panel');
	    this.createShape();
	}

	createShape(){
	  	var shape = document.createElement('div'),
	 		figure = document.createElement('div');

	  	shape.className = 'shape flexed';
	  	figure.className = this.className;
	  	shape.appendChild(figure);
	  	this.shape = shape;
	    this.draggable = false;
	    this.capture = {};
	  	this.defaultParent.appendChild(this.shape);	  	
	}

	hold(x, y){
		  	this.capture.X = x - o.shape.offsetLeft;
			this.capture.Y = y - o.shape.offsetTop;
			this.shape.style.position = "absolute";
			this.shape.style.opacity = 0.5;
			this.draggable = true;
			this.drag(x, y);
	}

	drag(x, y){
	  	if (this.draggable){
			this.shape.style.left = x - this.capture.X + "px";
			this.shape.style.top = y - this.capture.Y + "px";
		}
	}

	drop(x, y){
	  	if (this.draggable){
			this.shape.style.position = "relative";
			this.shape.style.left = "0px";
			this.shape.style.top = "0px";
			this.shape.style.opacity = 1;

			if (arguments.length == 2){
				let targets = document.elementsFromPoint(x, y);
				targets[0].appendChild(this.shape);		// append into target element as child node
			}
			else this.defaultParent.appendChild(this.shape);	// drop back to default container

			this.draggable = false;
		}
	}

	dispose(){
	  	this.shape.parentNode.removeChild(this.shape);
	}
}

Shape.nextShape = function(shape){
	if (shape instanceof Cross)	
		return new Zero();
	else 				
		return new Cross(); 
}

/***********************************************************************************************************
*	Class Cross
*	Class inherited from Shape. Calls parent's constructor with the setted parameter.
*/
class Cross extends Shape{

	constructor(){
		super("cross");
	}

}

/***********************************************************************************************************
*	Class Zero
*	Class inherited from Shape. Calls parent's constructor with the setted parameter.
*/
class Zero extends Shape{

	constructor(){
		super("zero");
	}

}

/***********************************************************************************************************
*	Variables declaration
*/
	var g = new Grid('table'),				// In the parameter specifies an 'id' of parentNode
		o = new Cross(),				// New <div class='cross'></div>
		btn = document.createElement('button'),		// Refresh button
		panel = document.getElementById('panel');
		
		btn.innerHTML = "Refresh";

/***********************************************************************************************************
*	Event Handlers
*/
	function handleDown(e){

		if (e.button  === 0 && o instanceof Shape)

			if (e.target == o.shape || 
				e.target == o.shape.firstChild)
			{
				o.hold(e.clientX, e.clientY);
			}

		if (e.target == btn)				// if refresh-button clicked
		{
			if (g instanceof Grid)
				g.refresh();			// clean grid
			o = new Cross();			// create new cross
			btn.parentNode.removeChild(btn);	// remove refresh-button
		}

	}

	function handleMove(e){

		if (o instanceof Shape)
			o.drag(e.clientX, e.clientY);

		if (g instanceof Grid)
			g.marco(e.clientX, e.clientY);

	}

	function handleUp(e){

		let elements = document.elementsFromPoint(e.clientX, e.clientY).map(x => x.className);

		if (o instanceof Shape)
		{
			if ( elements.includes("cell hover") )
				o.drop(e.clientX, e.clientY);	// drop to cell if it's unoccupied

			else o.drop();				// drop to defaultParent
		}

		if (g instanceof Grid && g.isfilled())
		{
			o = null;
			panel.appendChild(btn);
		}

		if (!panel.hasChildNodes())
		{
			o = Shape.nextShape(o);			// static method of Shape class
		}

}

		addEventListener('mousedown', handleDown);
		addEventListener('mousemove', handleMove);
		addEventListener('mouseup', handleUp);
