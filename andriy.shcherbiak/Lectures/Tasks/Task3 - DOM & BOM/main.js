(function(){
var today = new Date(),
	today = new Date (today.getFullYear(),today.getMonth(),today.getDate()),
	currentYear = today.getFullYear();
	currentMonth = today.getMonth();
	


	function drowMonth(year,month,day){
		var firstDate = new Date(year, month, 1),
			 lastDate = new Date(year, month + 1, 0),
			 firstSunday = firstDate,
			 lastSaturday = lastDate,
			 calendar = document.getElementsByClassName('calendar')[0],
			 date,
			 week,
			 todayText,
			 day,
			 dayText,
			 monthName,
			 monthNameElement,
			 monthNameText,
			 next;
			 
			
		


		while (firstSunday.getDay() > 0) {
			firstSunday.setDate(firstSunday.getDate() - 1);
		}
		while (lastSaturday.getDay() < 6) {
			lastSaturday.setDate(lastSaturday.getDate() + 1);
		}

		(function () {
			var weeks = document.querySelectorAll('.calendar .week');
			for (var i = 0; i < weeks.length; i++) {
			  var week = weeks[i];
			  week.parentNode.removeChild(week);
			}
		  })();

		  
	    for (date = firstSunday; date.valueOf() <= lastSaturday.valueOf(); date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)) {
			if (date.getDay() == 0) {
			  week = document.createElement("div");
			  week.classList.add('week');
			  calendar.appendChild(week);
			}
	  
			day = document.createElement("div");
			dayText = document.createTextNode(date.getDate());
			day.appendChild(dayText);
			day.classList.add('day');
			week.appendChild(day);
			
			if (date.valueOf() == today.valueOf()) {
			  day.classList.add('today');
			  todayText = document.createTextNode(' \nToday');
			  day.appendChild(todayText);
			}
				
			if (date.getDay() == 0) {
				day.classList.add('red');
			  }
			if (date.getMonth() != currentMonth) {
			  day.classList.add('other');
			}
		  }
		
		  
			  switch (month) {
				case 0: monthName = 'January'; break;
				case 1: monthName = 'February'; break;
				case 2: monthName = 'March'; break;
				case 3: monthName = 'April'; break;
				case 4: monthName = 'May'; break;
				case 5: monthName = 'June'; break;
				case 6: monthName = 'July'; break;
				case 7: monthName = 'August'; break;
				case 8: monthName = 'September'; break;
				case 9: monthName = 'October'; break;
				case 10: monthName = 'November'; break;
				case 11: monthName = 'December'; break;
			  }
			  monthNameElement = document.querySelector('.month-name .name');
			  
			  while (monthNameElement.hasChildNodes()) {
				monthNameElement.removeChild(monthNameElement.firstChild);
			  }
			  
			  monthNameText = document.createTextNode(monthName + ' ' + year);
			  monthNameElement.appendChild(monthNameText);

			  next = document.querySelector('.arrow.next');
			  prev = document.querySelector('.arrow.prev'); 

				next = document.querySelector('.arrow.next');
			  next.onclick = function () {
				currentMonth++;
				if (currentMonth > 11) {
				  currentMonth = 0;
				  currentYear++;
				}
				drowMonth(currentYear, currentMonth, today);
			  };
			  
			  var previous = document.querySelector('.arrow.previous');
			  previous.onclick = function () {
				currentMonth--;
				if (currentMonth < 0) {
				  currentMonth = 11;
				  currentYear--;
				}
				drowMonth(currentYear, currentMonth, today);
			  };


	}
	drowMonth(currentYear, currentMonth, today);

})()