var prevMonth = document.getElementById('route-left'),
	nextMonth = document.getElementById('route-right'),
	routeTitle = document.getElementById('route-title'),
	monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	week = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
	currentDate = new Date(),
	month = currentDate.getMonth(),
	day = currentDate.getDate(),
	year = currentDate.getFullYear(),
	toDayDate = currentDate

const amountOfCells = 42 										// table of calendar days 7x6

/*
*	EventHandlers
*/
window.addEventListener("load", function(){ 
	buildWeekDays()												// dynamically appends Mon, Tue,... into #day-names
	buildRoute(month)											// creates month container and it daughter elements
});
prevMonth.addEventListener("click", function(){
	routeLeft()													// switches to previous month and slide out current container
	setTimeout(()=>{buildRoute(month)},300);					// deletes previous & builds new month container
});
nextMonth.addEventListener("click", function(){
	routeRight()												//
	setTimeout(()=>{buildRoute(month)},300);					//
});

/*
*	Functions
*/
function buildRoute(month){
	var thisMonthStarts = (new Date(year, month, 0)).getDay(),
		prevDays = amountOfDays(year, month);

	routeTitle.innerHTML = monthes[month] + " " + year  
	buildMonth(prevDays, thisMonthStarts)	
}

function buildWeekDays(){
	for (var i=0; i<7; i++){
	var dayName = document.createElement('div');
	dayName.innerHTML = week[i].substring(0,3);					// takes first three symbols of each word
	document.getElementById('day-names').appendChild(dayName);
	}
}

/*
*	Count amount of day in chosen month
*/
function amountOfDays(year, month) {
    return (new Date(year, month, 0).getDate());
}

/*
*	Route functions
*/
function routeLeft(){
	if (--month < 0) {
		year--
		month = 11
	}
	document.getElementById('month').className = "date-container slide-right"	// transition
}
function routeRight(){
	if (++month > 11) {
		year++
		month = 0
	}
	document.getElementById('month').className = "date-container slide-left"	// transition
}

/*
*	Deletes & creates new month days container
*/
function createMonthContainer(){
	deleteMonthContainer();
	var container = document.createElement('div')
		container.id = "month"
		container.className = "date-container"
	document.getElementById('date-router').appendChild(container)
}
function deleteMonthContainer(){
	Array.from( document.querySelectorAll( '#month' ) ).forEach( item => item.remove() )
}

/*
*	Creates month container & fills it by days
*/
function buildMonth(prevDays, thisMonthStarts){
	createMonthContainer()
	insertPreviousMonth(prevDays, thisMonthStarts)								// inserts some days of previous month
	for(let i = 0; i < amountOfDays ( year, month+1 ); i++){
		var dayElement = document.createElement('div');
		dayElement.innerHTML = i+1;
		if((new Date(year, month, i)).getDay() == 6) dayElement.className+=" weekend "	// every sixth day is a holiday
		if( toDayDate.getDate() == i+1 && toDayDate.getFullYear() == year && toDayDate.getMonth() == month ) 
		dayElement.className += " today light-bg "										// highlights current day
		document.getElementById('month').appendChild(dayElement);
	}
	insertNextMonth(thisMonthStarts)											// inserts some days of next month
}

/*
*	If current month starts from day-of-week > 0 it fills 0..day-of-week-1 by last days of previous month
*/
function insertPreviousMonth(prevDays, thisMonthStarts){
	for (let j = 0; j < thisMonthStarts; j++){
		var dayElement = document.createElement('div');
		dayElement.innerHTML = prevDays - thisMonthStarts + j+1;
		dayElement.style.color = "var(--lighter-color)"
		document.getElementById('month').appendChild(dayElement);
	}
}

/*
*	Inserts first days of next month 
*/
function insertNextMonth(thisMonthStarts){
	var nextMonthStarts = (new Date(year, month, amountOfDays(year, month+1))).getDay()
	for (let j = 0; j < amountOfCells - ( thisMonthStarts + amountOfDays ( year, month+1 )); j++){
		var dayElement = document.createElement('div');
		dayElement.innerHTML = j+1;
		dayElement.style.color = "var(--lighter-color)"
		document.getElementById('month').appendChild(dayElement);
	}
}