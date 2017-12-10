//Initial values of weekdays array, months names and last days
let date = new Date(),
    prev, next, domCal, calendar, table, selectedDay,
    weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    lastDaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Function Constructor for creating calendar and 
 * for rendering HTML code for displaying into the DOM
 * @param {*year for creating new date(must be number)} year 
 * @param {*month for creating new date(must be number)} month 
 */
function Calendar(year, month) {
    let overrideDate = new Date(month, year, 1),
        calendarHTML;
    this.year = (typeof year !== "number") ? date.getFullYear() : year;
    this.month = (typeof month !== "number") ? date.getMonth() : month;
    this.day = (typeof day !== "number") ? date.getDate() : overrideDate.getDate();
    this.weekday = (typeof month !== "number" || typeof year !== "number") ? date.getDay() : overrideDate.getDay();

    this.calendarView = function() {
        let allDaysInMonth = lastDaysInMonths[this.month],
            allDaysInPrevMonth = lastDaysInMonths[this.month !== 0 ? this.month - 1 : 11],
            firstDateAtMonth = new Date(this.year, this.month, 1),
            lastDayAtMonth = new Date(this.year, this.month, allDaysInMonth),
            firstDay = firstDateAtMonth.getDay(),
            lastDay = lastDayAtMonth.getDay(),
            currMonth = months[this.month],
            day = 1, //number of day from which we will fill days row(s)
            weeks = Math.ceil((allDaysInMonth + firstDay) / 7);

        //if year is intercalary, set value of the last day in February
        if (this.month == 1) {
            if ((this.year % 100 !== 0) && (this.year % 4 === 0) || (this.year % 400 === 0)) {
                lastDaysInMonths[this.month] = 29;
            }
        }

        //Rendering HTML code of calendar table
        calendarHTML = '<table id="calendar" class="table">';
        // Render controls "button" (prev, next), current month and current year
        calendarHTML += ('<tr class="calendar-month"><th class="previous" id="prev">&lt;</th><th colspan="5" class="text-center">');
        calendarHTML += currMonth + "&nbsp;" + this.year;
        calendarHTML += '</th><th class="next" id="next">&gt;</th></tr>';

        //create weekday names in table
        for (let i = 0; i < weekdays.length; i++) {
            calendarHTML += '<td class="calendar-weekday">';
            calendarHTML += weekdays[i];
            calendarHTML += '</td>';
        }
        calendarHTML += '</tr>';
        // create week rows and day columns, fill in days
        for (var i = 0; i < weeks; i++) {
            // new row for each week
            calendarHTML += ('<tr class="calendar-week">');

            for (var j = 0; j < weekdays.length; j++) {
                // new column for each day
                calendarHTML += '<td class="calendar-day';
                // fill in days
                if (day === 1 && j < firstDay) {
                    calendarHTML += ' not-current-month">' + (allDaysInPrevMonth - (firstDay - j - 1));
                } else if (day <= allDaysInMonth) {
                    calendarHTML += '">' + day;
                    day += 1;
                } else {
                    calendarHTML += ' not-current-month">' + (j - lastDay);
                }
                calendarHTML += '</td>';
            }
            calendarHTML += '</tr>';
            // stop making new rows (weeks) if maximum number of days reached
            if (day > allDaysInMonth) break;
        }
        calendarHTML += '</table>';
        return calendarHTML;
    }
};

//Push our calendar code into DOM
domCal = document.getElementById("calendar"),
    calendar = new Calendar();

domCal.innerHTML = calendar.calendarView();

/**
 * function for override events after clicks on elements.
 */
function overrideEvents() {
    prev = document.getElementById("prev");
    next = document.getElementById("next");
    table = document.getElementById("calendar");
    prev.addEventListener('click', previousMonth);
    next.addEventListener('click', nextMonth);
    table.addEventListener("click", highlightWeekdays);
    table.addEventListener("click", pickDay);
}

/**
 * Function for generation new month, when 
 * we click previous month or next month
 * @param {*number of year which we want dispay} year 
 * @param {*number of month which we want dispay} month 
 */
function generateNewMonth(year, month) {
    calendar = new Calendar(year, month),
        domCal.innerHTML = calendar.calendarView();
}

/**
 * Function previousMonth create for 
 * switch month back
 */
function previousMonth() {
    let previousMonth, previousYear;
    if (calendar.month > 0) {
        previousMonth = calendar.month -= 1;
        previousYear = calendar.year;
    } else {
        previousMonth = calendar.month = 11;
        previousYear = calendar.year -= 1;
    }
    //call function for generate new month and making new calendar
    generateNewMonth(previousYear, previousMonth);

    //override our events, because the click handler after the first switch of the month will fall off, because the element to which it is attached will be deleted.
    overrideEvents();
}

/**
 * Function nextMonth create for 
 * switch month forward
 */
function nextMonth() {
    let nextMonth, nextYear;
    if (calendar.month < 11) {
        nextMonth = calendar.month += 1;
        nextYear = calendar.year;
    } else {
        nextMonth = calendar.month = 0;
        nextYear = calendar.year += 1;
    }

    //call function for generate new month and making new calendar
    generateNewMonth(nextYear, nextMonth);

    //override our events, because the click handler after the first switch of the month will fall off, because the element to which it is attached will be deleted.
    overrideEvents();
}


/**
 * Function illuminationCurrDay create for 
 * highlight current date.
 */
function illuminationCurrDay() {
    let allDays = document.querySelectorAll(".calendar-day"),
        currentDay = date.getDate();
    for (let i = 0; i < allDays.length; i++) {
        if (parseInt(allDays[i].textContent) === currentDay) {
            allDays[i].classList.add("highlight");
            break;
        }
    }
}

/**
 * function highlight checks if day is 
 * already selected, changes selection
 * @param {*node name which we will change} element 
 */
function highlight(element) {
    // re-grab currently selected day in case the month has changed
    selectedDay = document.getElementsByClassName("calendar-day highlight")[0];
    if (selectedDay) selectedDay.classList.remove("highlight");
    selectedDay = element;
    selectedDay.classList.add("highlight");
}

/**
 * listener for click on calendar day
 * @param {*current node} event 
 */
function pickDay(event) {
    let target = event.target;
    while (target.nodeName !== "TABLE") {
        if (target.nodeName && target.nodeName === 'TD' && target.className === "calendar-day" && target.innerHTML !== "") {
            if (Array.prototype.indexOf.call(target.classList, "highlight") === -1) {
                highlight(target);
            }
        }
        target = target.parentNode;
    }
}

/**
 * Function highlightWeekdays create for display weekdays 
 */
function highlightWeekdays() {
    let calendarWeek = document.querySelectorAll(".calendar-week");
    calendarWeek.forEach(function(el) {
        if (!el.childNodes[0].classList.contains("not-current-month")) {
            el.childNodes[0].classList.add("calendar-weekday");
        }
    });
}

//Call our function for highlighting text and override events  
illuminationCurrDay();
overrideEvents();
highlightWeekdays();