/*
 * almost all global variables
 */
var months = {
        January: 31,
        February: 28,
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31,
    },
    prevM = document.getElementById("prevM"),
    nextM = document.getElementById("nextM"),
    getCurrentDate = document.getElementById("getCurrentDate"),
    monthsCount = Object.getOwnPropertyNames(months),
    today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth(),
    yyyy = today.getFullYear(),
    table = document.getElementById("table"),
    monthDaysCount = [{
            name: "January",
            days: 31
                }, {
            name: "February",
            days: 28
                }, {
            name: "March",
            days: 31
                }, {
            name: "April",
            days: 30
                }, {
            name: "May",
            days: 31
                }, {
            name: "June",
            days: 30
                }, {
            name: "July",
            days: 31
                }, {
            name: "August",
            days: 31
                }, {
            name: "September",
            days: 30
                }, {
            name: "October",
            days: 31
                }, {
            name: "November",
            days: 30
                }, {
            name: "December",
            days: 31
                }
            ];

/*
 * putting current month and year on page
 */
document.getElementById("currentMonth").innerHTML = monthsCount[mm];
document.getElementById("currentYear").innerHTML = yyyy;

/*
 * getting current month and year on page
 */
var currentMonth = document.getElementById("currentMonth").innerHTML,
    currentYear = document.getElementById("currentYear").innerHTML;

/*
 * get to the previous month button function
 */
function prevMonth() {
    var i;
    for (i = 0; i < monthsCount.length; i++) {
        if (monthsCount[i] == currentMonth) {
            if (currentMonth == monthsCount[0]) {
                currentMonth = monthsCount[monthsCount.length - 1];
                document.getElementById("currentMonth").innerHTML = monthsCount[monthsCount.length - 1];

                currentYear = +currentYear - 1;
                document.getElementById("currentYear").innerHTML = currentYear;
                break;
            } else {
                currentMonth = monthsCount[i - 1];
                document.getElementById("currentMonth").innerHTML = monthsCount[i - 1];
                break;
            }
        }
    }
    clean();
    allDaysDraw();
    dayCheck();
}

/*
 * get to the next month button function
 */
function nextMonth() {
    var i;
    for (i = 0; i < monthsCount.length; i++) {
        if (monthsCount[i] == currentMonth) {
            if (currentMonth == monthsCount[monthsCount.length - 1]) {
                currentMonth = monthsCount[0];
                document.getElementById("currentMonth").innerHTML = monthsCount[0];

                currentYear = +currentYear + 1;
                document.getElementById("currentYear").innerHTML = currentYear;
            } else {
                currentMonth = monthsCount[i + 1];
                document.getElementById("currentMonth").innerHTML = monthsCount[i + 1];
                break;
            }
        }
    }
    clean();
    allDaysDraw();
    dayCheck();
}


/*
 * get to the current date button function
 */
function currentDate() {
    document.getElementById("currentMonth").innerHTML = monthsCount[mm];
    document.getElementById("currentYear").innerHTML = yyyy;
    currentMonth = monthsCount[mm];
    currentYear = yyyy;
    clean();
    allDaysDraw();
    dayCheck();
}

/*
 * drawing all cells for days in month
 */
function daysDrawing() {
    var tr = document.getElementsByTagName("tr"),
        td = document.getElementsByTagName("td"),
        i,
        j,
        table = document.getElementById("table");

    for (i = 0; i < 6; i++) {
        tr = document.createElement("tr");
        for (j = 0; j < 7; j++) {
            td = document.createElement("td");
            td.classList.add("days");
            td.innerHTML = "";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

/*
 * clean cells for next or previous month drawing
 */
function clean() {
    var tr = document.getElementsByTagName("tr"),
        td = document.getElementsByClassName("days"),
        i;
    for (i = 0; i < 42; i++) {
        td[i].innerHTML = "";
        td[i].classList.remove("selectedDay");
        td[i].style.background = "";
    }

}

/*
 * Drawing current month's day
 */
function dayCheck() {
    var tr = document.getElementsByTagName("tr"),
        td = document.getElementsByTagName("td"),
        i,
        j,
        allDaysCount = 0,
        day = 1;

    td[dd + 3].classList.remove("currentDay");

    if (monthsCount.indexOf(currentMonth) == mm && currentYear == yyyy) {
        td[dd + 3].classList.add("currentDay");
        td[dd + 3].innerHTML = dd + "<br>Today";
    }
}

/*
 * function for highlighting days in calendar
 */
function getSpecDay(event) {
    var target = event.target,
        i;

    for (i = 0; i < 42; i++) {
        document.getElementsByClassName("days")[i].classList.remove("selectedDay");
    }
    if (target.tagName == "TD") {
        event.target.classList.add("selectedDay");
    }
}


/*
 * function for drawing all the month in calendar
 * Using special formula to getting day of the week by it's full date ( getDayOfTheWeekByDate()  function)
 */
function allDaysDraw() {
    var tr = document.getElementsByTagName("tr"),
        td = document.getElementsByClassName("days"),
        i,
        j,
        k,
        v,
        allDaysCount = 0,
        day = 1,
        preMonth,
        january = 7,
        february = 11,
        nextMonth = 1;



    switch (getDayOfTheWeekByDate()) {

        case 2:
            for (j = 0; j < months[currentMonth]; j++) {
                td[j].innerHTML = j + 1;
            }

            for (i = months[currentMonth]; i < 42; i++) {
                while (!td[i].innerHTML) {
                    td[i].innerHTML = nextMonth;
                    td[i].style.background = "darkgray";
                    nextMonth++;
                }
            }


            break;
        case 3:
            for (v = 0; v < monthDaysCount.length; v++) {
                if (currentMonth == "January") {
                    preMonth = monthDaysCount[11].days;
                } else {
                    if (monthDaysCount[v].name == currentMonth) {
                        preMonth = monthDaysCount[v - 1].days;
                    }
                }

            }
            if (!td.innerHTML) {

                td[0].innerHTML = preMonth;
                td[0].style.background = "darkgray";
                preMonth--;


            }

            for (j = 0; j < months[currentMonth]; j++) {
                td[j + 1].innerHTML = j + 1;
            }
            for (i = months[currentMonth]; i < 42; i++) {
                while (!td[i].innerHTML) {
                    td[i].innerHTML = nextMonth;
                    td[i].style.background = "darkgray";
                    nextMonth++;
                }
            }
            break;
        case 4:
            for (v = 0; v < monthDaysCount.length; v++) {
                if (currentMonth == "January") {
                    preMonth = monthDaysCount[11].days;
                } else {
                    if (monthDaysCount[v].name == currentMonth) {
                        preMonth = monthDaysCount[v - 1].days;
                    }
                }

            }
            if (!td.innerHTML) {
                for (k = 1; k >= 0; k--) {
                    td[k].innerHTML = preMonth;
                    td[k].style.background = "darkgray";
                    preMonth--;
                }

            }
            for (j = 0; j < months[currentMonth]; j++) {
                td[j + 2].innerHTML = j + 1;
            }
            for (i = months[currentMonth]; i < 42; i++) {
                while (!td[i].innerHTML) {
                    td[i].innerHTML = nextMonth;
                    td[i].style.background = "darkgray";
                    nextMonth++;
                }
            }
            break;

        case 5:
            for (v = 0; v < monthDaysCount.length; v++) {
                if (currentMonth == "January") {
                    preMonth = monthDaysCount[11].days;
                } else {
                    if (monthDaysCount[v].name == currentMonth) {
                        preMonth = monthDaysCount[v - 1].days;
                    }
                }

            }
            if (!td.innerHTML) {
                for (k = 2; k >= 0; k--) {
                    td[k].innerHTML = preMonth;
                    td[k].style.background = "darkgray";
                    preMonth--;
                }

            }
            for (j = 0; j < months[currentMonth]; j++) {
                td[j + 3].innerHTML = j + 1;
            }

            for (i = months[currentMonth]; i < 42; i++) {
                while (!td[i].innerHTML) {
                    td[i].innerHTML = nextMonth;
                    td[i].style.background = "darkgray";
                    nextMonth++;
                }
            }


            break;
        case 6:

            for (v = 0; v < monthDaysCount.length; v++) {
                if (currentMonth == "January") {
                    preMonth = monthDaysCount[11].days;
                } else {
                    if (monthDaysCount[v].name == currentMonth) {
                        preMonth = monthDaysCount[v - 1].days;
                    }
                }

            }

            if (!td.innerHTML) {
                for (j = 3; j >= 0; j--) {
                    td[j].innerHTML = preMonth;
                    td[j].style.background = "darkgray";
                    preMonth--;
                }

            }

            for (j = 0; j < months[currentMonth]; j++) {
                td[j + 4].innerHTML = j + 1;
            }


            for (i = months[currentMonth]; i < 42; i++) {
                while (!td[i].innerHTML) {
                    td[i].innerHTML = nextMonth;
                    td[i].style.background = "darkgray";
                    nextMonth++;
                }
            }

            break;
        case 0:
            for (v = 0; v < monthDaysCount.length; v++) {
                if (currentMonth == "January") {
                    preMonth = monthDaysCount[11].days;
                } else {
                    if (monthDaysCount[v].name == currentMonth) {
                        preMonth = monthDaysCount[v - 1].days;
                    }
                }

            }
            if (!td.innerHTML) {
                for (k = 4; k >= 0; k--) {
                    td[k].innerHTML = preMonth;
                    td[k].style.background = "darkgray";
                    preMonth--;
                }

            }
            for (j = 0; j < months[currentMonth]; j++) {
                td[j + 5].innerHTML = j + 1;
            }
            for (i = months[currentMonth]; i < 42; i++) {
                while (!td[i].innerHTML) {
                    td[i].innerHTML = nextMonth;
                    td[i].style.background = "darkgray";
                    nextMonth++;
                }
            }
            break;
        case 1:
            for (v = 0; v < monthDaysCount.length; v++) {
                if (currentMonth == "January") {
                    preMonth = monthDaysCount[11].days;
                } else {
                    if (monthDaysCount[v].name == currentMonth) {
                        preMonth = monthDaysCount[v - 1].days;
                    }
                }

            }
            if (!td.innerHTML) {
                for (k = 5; k >= 0; k--) {
                    td[k].innerHTML = preMonth;
                    td[k].style.background = "darkgray";
                    preMonth--;
                }

            }
            for (j = 0; j < months[currentMonth]; j++) {
                td[j + 6].innerHTML = j + 1;
            }
            for (i = months[currentMonth]; i < 42; i++) {
                while (!td[i].innerHTML) {
                    td[i].innerHTML = nextMonth;
                    td[i].style.background = "darkgray";
                    nextMonth++;
                }
            }
            break;
        default:
            break;
    }
}

/*
 * Special formula for getting specific year's code
 */
function getYearCode(year) {
    var last2digits = year % 100;
    return (6 + last2digits + (Math.floor(last2digits / 4))) % 7;
}

/*
 * function for getting every month's specific code for further calculating day of the week
 */
function getMonthCode() {
    switch (currentMonth) {
        case "April":
        case "July":
            return 0;
            break;
        case "January":
        case "October":
            return 1;
            break;
        case "May":
            return 2;
            break;
        case "August":
            return 3;
            break;
        case "February":
        case "March":
        case "November":
            return 4;
            break;
        case "June":
            return 5;
            break;
        case "December":
        case "September":
            return 6;
            break;
        default:
            return "noooo";
            break;
    }
}

/*
 * Special formula for getting 1st day of every month and year code from
 * 0 - saturday
 * 1 - sunday
 * 2 - monday
 * ...
 * 6 - friday
 * for further usage in allDaysDraw() function
 */
function getDayOfTheWeekByDate() {
    return (1 + getMonthCode() + getYearCode(currentYear)) % 7;
}

/*
 * coloring weekends in red
 */
function weekendDaysColorRed() {
    var i,
        td = document.getElementsByTagName("td"),
        weekendDaysCount = 6,
        k = 0;

    for (i = 0; i < td.length; i++) {
        if (i == weekendDaysCount) {
            td[i].classList.add("weekendDaysRed");
            k++;
        }
        if (k == 1) {
            weekendDaysCount += 7;
            k = 0;
        }

    }
}

/*
 * usage of main functions on page load
 */
daysDrawing();
allDaysDraw();
dayCheck();
weekendDaysColorRed();

table.addEventListener("click", getSpecDay);
prevM.addEventListener("click", prevMonth);
nextM.addEventListener("click", nextMonth);
getCurrentDate.addEventListener("click", currentDate);
