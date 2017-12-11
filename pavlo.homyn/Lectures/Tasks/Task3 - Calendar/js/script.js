/*  List of global variables:
*
*   currentDate - current date, created with constructor Date,
*   currentMonth - current month,
*   currentYear - current year,
*   monthElement - span element where we will write month name,
*   yearElement - span element where we will write year
*   days - list of our days,
*   monthArray - array with month's names
*/
let currentDate = new Date(),
    currentMonth = currentDate.getMonth(),
    currentYear = currentDate.getFullYear(),
    monthElement = document.querySelector(".month"),
    yearElement = document.querySelector(".year"),
    days = document.querySelector(".days > ul"),
    monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/***********************************/
/***  Calling our main function  ***/
/***********************************/

drawCurrentMonth();

/*  writeMonthYear: 
*
*   this function will write in our span elements 
*   current month and year
*/
function writeMonthYear() {
    monthElement.innerHTML = monthArray[currentMonth];
    yearElement.innerHTML = currentYear;
}

/*  selectedDay:
*
*   this function highlights any day you clicked on it
*   by adding new class to list element
*/
function selectedDay(item) {
    item.addEventListener("click", function() {
        if (document.getElementsByClassName("on-click").length) {
            document.getElementsByClassName("on-click")[0].classList.remove("on-click");
        }        
        item.className += " on-click";
    });
}

/*  today:
*
*   this function checks current month and year with those which 
*   are currently display on screen and highlights them if true
*   by adding new element and class;
*   
*   variables:
*
*   date - sets to this variable current date with constructor Date,
*   dayToday - selects current day in our list,
*   p - creates paragraph element
*/
function today() {
    let date = new Date();
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        let dayToday = document.querySelectorAll(".days li")[(date.getDate() + date.getDay(date.setDate(1))) - 1],
            p = document.createElement("p");
        dayToday.appendChild(p);        
        dayToday.className = "today";
        p.innerHTML = "today";
    }
}

/*  drawFirstCalendarDays:
*
*   this function draws days from previous month
*   before our current month
*
*   variables:
*
*   date - sets to this variable date with current year, month and first day of month,
*   weekday - day number in our week (from 0 to 6),
*   lastDay - last day of previous month,
*   listItem - list element in our calendar which refers to previous month's day
*/
function drawFirstCalendarDays() {
    let date = new Date(currentYear, currentMonth, 1),
        weekday = date.getDay();
    date.setMonth(date.getMonth(), 0);    
    let lastDay = date.getDate();    
    for (weekday; weekday > 0; weekday--, lastDay--) {        
        let listItem = document.createElement("li");
        days.insertBefore(listItem, days.childNodes[0]);
        listItem.className = "other-day";
        listItem.innerHTML = lastDay;
        selectedDay(listItem);
    }
}

/*  drawCurrentDays:
*
*   this function draws days of our current month
*
*   variables:
*
*   date - sets to this variable date with current year, month and first day of month,
*   month - takes month from 'date' variable,
*   i - iteration, refers to our days,
*   listItem - list element in our calendar which refers to current month's day
*/
function drawCurrentDays() {
    let date = new Date(currentYear, currentMonth, 1),
        month = date.getMonth(),
        i = 1;
    for (i; month === date.getMonth(); i++) {        
        let listItem = document.createElement("li");
        days.appendChild(listItem);
        listItem.innerHTML = i;
        selectedDay(listItem);
        date.setDate(i + 1);
    }
}

/*  drawLastCalendarDays:
*
*   this function draws the remainning days (next month's days) in our calendar
*
*   variables:
*
*   childLength - current number of our days in calendar,
*   firstDay - first day of next month,
*   i - iteration number,
*   listItem - list element in our calendar which refers to next month's day
*/
function drawLastCalendarDays() {
    let childLength = days.childNodes.length,
        firstDay = 1,
        i = childLength;
    for (i; i < 42; i++, firstDay++) {
        let listItem = document.createElement("li");
        days.appendChild(listItem);
        listItem.className = "other-day";
        listItem.innerHTML = firstDay;
        selectedDay(listItem);
    }
}

/*  drawCurrentMonth():
*
*   main function which calls all the others to create our calendar
*/
function drawCurrentMonth() {
    writeMonthYear();
    drawFirstCalendarDays();
    drawCurrentDays();       
    drawLastCalendarDays();
    today();
}

/***************************************************************/
/***  Our events when we scroll our months back and forward ***/
/***************************************************************/

document.querySelector(".left-arrow").addEventListener("click", function() {
    while (days.hasChildNodes()) {
        days.removeChild(days.firstChild);
    }
    currentMonth -= 1;
    if (currentMonth < 0) {
        [currentMonth, currentYear] = [11, currentYear - 1];
    }
    writeMonthYear();
    currentDate = new Date(currentYear, currentMonth, 1);
    drawFirstCalendarDays();
    drawCurrentDays();
    drawLastCalendarDays();
    today();
});

document.querySelector(".right-arrow").addEventListener("click", function() {
    while (days.hasChildNodes()) {
        days.removeChild(days.firstChild);
    }
    currentMonth += 1;
    if (currentMonth > 11) {
        [currentMonth, currentYear] = [0, currentYear + 1];
    }
    writeMonthYear();
    currentDate = new Date(currentYear, currentMonth, 1);
    drawFirstCalendarDays();
    drawCurrentDays();
    drawLastCalendarDays();
    today();
});