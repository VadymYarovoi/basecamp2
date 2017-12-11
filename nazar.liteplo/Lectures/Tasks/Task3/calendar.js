
document.addEventListener("DOMContentLoaded", function(){

	var listOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'],
			today = new Date(),
			currentDate =  new Date();

	createCalendar(currentDate);

	/** create calendar
	  * @param{obj Date} currentDate
	  */
	function createCalendar(currentDate){

		var currentMounth = currentDate.getMonth(),
				currentYear = currentDate.getFullYear(),
				firstDayOfMount = new Date(currentYear, currentMounth, 1 ),
				dateForOutput = firstDayOfMount,
				table,
				weekCount,
				td,
				tr,
			  dayOfWeek;

		createCalendarTemplate(currentMounth, currentYear);
		
		table = document.getElementById('table');
		weekCount = 1;
		while(currentMounth == dateForOutput.getMonth()){
			tr = document.createElement('tr');
			dayOfWeek = 0;
			while(dayOfWeek < 7){
				if(weekCount == 1){
					dateForOutput.setDate(1-firstDayOfMount.getDay());
					weekCount++;
				}

				td = document.createElement('td');
				td.innerHTML = dateForOutput.getDate();
				
				if(dateForOutput.setHours(0,0,0,0) == today.setHours(0,0,0,0)){
					td.classList.add('today');
					td.innerHTML += '<div>today</div>'
				}
				if(dateForOutput.getMonth() !== currentMounth){
					td.classList.add('other-month');
				}
				if(dateForOutput.getDay() === 0 && dateForOutput.getMonth() === currentMounth){
					td.classList.add('weekend');
				}
		
				tr.appendChild(td);
				table.appendChild(tr);
				dateForOutput.setDate( dateForOutput.getDate() + 1);	
				dayOfWeek++;
			}
		}
		addEvents();
	}

	/* insert calendar's header to the DOM
	 * @param{number} currentMounth
	 * @param{number} currentYear
	*/
	function createCalendarTemplate(currentMounth, currentYear){
		var template = `
			<div class="calendar-wrap">
				<div class="calendar-header">
					<span class="left" id="previous-month">&lt;</span>
					<span>${listOfMonths[currentMounth]} ${currentYear}</span>
					<span class="right" id="next-month">&gt;</span>
				</div>
				<div class="calendar-table">
					<table id="table">
						<tr>
							<th>Sun</th>
							<th>Mon</th>
							<th>Tue</th>
							<th>Wed</th>
							<th>Thu</th>
							<th>Fri</th>
							<th>Sat</th>
						</tr>
					</table>
				</div>
			</div>
		`,
		calendar = document.getElementById('js-calendar');  	
		calendar.innerHTML = template;
	}

	/** add events listeners 
		*/
	function addEvents(){
		var td = document.getElementsByTagName('td'),
				i, active;

		document.getElementById('previous-month').addEventListener('click', function(){
			currentDate.setMonth( currentDate.getMonth() - 1);
			createCalendar(currentDate);
		});

		document.getElementById('next-month').addEventListener('click', function(){
			currentDate.setMonth( currentDate.getMonth() + 1);
			createCalendar(currentDate);
		});
		
		for(i = 0; i < td.length; i++){
			td[i].addEventListener('click', activateDate );
		}

		/** toggle class "active" for <td> in <table>
			*/
		function activateDate(){	
			if (active != null){
				if(active.classList.contains('active') && active != this){
					active.classList.remove('active');
				}
			}
			active = this;
			this.classList.toggle('active');
		}
	}
});