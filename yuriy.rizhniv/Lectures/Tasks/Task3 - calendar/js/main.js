window.onload = function(){
	createCalendar();
}

document.getElementById('left').addEventListener('click', left);
document.getElementById('right').addEventListener('click', right)

var date = new Date(),
	month = date.getMonth(),
	year = date.getFullYear(),
	today = date.getDate(),
	yyy = year,
	mmm = month,
	monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	prevElem;

var container = document.getElementById('container'),
	monthName = document.getElementById('month-name'),
	yearNumber = document.getElementById('year');
/**
  *the function creates a new container for the month and fills 
  *it with days, nonactive days and allocates the current day
  *@param {object} date
 */
function createCalendar(date){

	if(date == undefined){
		date = new Date();
	}

	var year = date.getFullYear();
	var month = date.getMonth();
	var firstDay = new Date(year, month, 1);
	var lastDay = new Date(year, month + 1, 0);
	var lastDate = lastDay.getDate();
	var firstWeekDay = firstDay.getDay();
	var lastDayPrevMonth = new Date(year, month, 0);
	var lastDayPrevMonthDate = lastDayPrevMonth.getDate();

	var datesBlock = document.createElement('div');
	datesBlock.id = 'dates';
	container.appendChild(datesBlock);

	
	var nonActiveDays = firstWeekDay - 1,
		lastDaysFrom = lastDayPrevMonthDate - nonActiveDays,
		counter = 0;

	for (var numeric = 1; numeric <= lastDate; numeric++) {

		if(counter == 7){
			var br = document.createElement('br');
			dates.appendChild(br);
			counter = 0;
		}

		while(firstWeekDay > 0){
			var cell = document.createElement('span');
			cell.innerHTML = lastDaysFrom++;
			cell.className += ' nonActive';
			datesBlock.appendChild(cell);     // fills the container with days
			--firstWeekDay;
			counter++;
		}

		var cell = document.createElement('span');
		cell.innerHTML = numeric;
		cell.className += ' cell';
		cell.onclick = dateSelect;        // setting event for cell. dateSelect - function

		if(counter == 0){
			cell.className += ' weekend';
		}

		if(year == yyy && month == mmm && numeric == today){
			cell.className += ' currentDate';       // allocates the current day
		}

		dates.appendChild(cell);
		counter++;

		if(numeric == lastDate){
			var nextMonthDate = 1;
			var remainder = 7 - counter;

			while(remainder){
				var cell = document.createElement('span');
				cell.innerHTML = nextMonthDate++;
				cell.className += ' nonActive';
				datesBlock.appendChild(cell);	// fills the container with nonactive days
				remainder--;
			}
		}
	}
	monthName.innerHTML = monthsArr[month];	// displays the name of the month
	yearNumber.innerHTML = year;			// and year
}
/**
 *the function removes the current container, changes the month 
 *to the previous one and calls the function 'createCalendar' with an updated date
 */
function left(){
	container.removeChild(document.getElementById('dates'));
	date.setMonth(--month);

	if(month < 0){
		month = 11;
		date.setFullYear(--year);
	}

	createCalendar(date);
}
/**
 *the function removes the current container, changes the month 
 *to the next one and calls the function 'createCalendar' with an updated date
 */
function right(){
	container.removeChild(document.getElementById('dates'));
	date.setMonth(++month);

	if(month > 11){
		month = 0;
		date.setFullYear(++year);
	}

	createCalendar(date);
}
/**
 *the function changes the look of the cell
 */
function dateSelect(){

	if(prevElem){
		prevElem.classList.remove('that');
	}	

	this.className += ' that';
	prevElem = this;
}
