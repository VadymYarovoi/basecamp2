/**
 * Creates calendar table
 * @param {Object} aDate 
 * @param {Array} weekdays
 */
function CalendarTable(aDate, weekdays)
{
    var nextDay = 1,
    today = new Date();

    /**
     * Discovers how many days has current month and
     * returns the last one
     * @return {Number} 
     */
    this.getLastDayMonth = function ()
    {
        var end = new Date(aDate.getFullYear(), aDate.getMonth() + 1, 0);
        return end.getDate();
    };

    /**
     * Discovers how many days has previous month and
     * returns the last one
     * @return {Number} 
     */
    this.getLastDayPrevMonth = function ()
    {
        var endPrev = new Date(aDate.getFullYear(), aDate.getMonth(), 0);
        return endPrev.getDate();
    };

    /**
     * Discovers from which weekday current month starts
     * @return {Number} 
     */
    this.getStartWeekday = function ()
    {
        var start = new Date(aDate.getFullYear(), aDate.getMonth(), 1),
        wd = start.getDay();
        return (wd === 0) ? 7 : wd;
    };

    /**
     * Creates array of days in current month
     * @return {Array} 
     */
    this.getDays = function ()
    {
        var days = [],
        i;
        for (i = 1; i <= this.getLastDayMonth(); i++) days.push(i);
        return days;
    };

    /**
     * Creates array of previous month's days and returns days
     * that we should see in calendar 
     * @return {Array} 
     */
    this.getPrevDays = function()
    {
        var prevDays = [],
        prevDaysVisible = [],
        i,
        j;
        for(i = 1; i <= this.getLastDayPrevMonth(); i++) prevDays.push(i);

        prevDays = prevDays.reverse();

        for(j = 0; j < this.getStartWeekday() - 1; j++)
        {
            prevDaysVisible.push(prevDays[j]);
        }
        return prevDaysVisible.reverse();
    };

    /**
     * Fills td's by numbers of previous month
     * @param {Object} td 
     * @param {Number} day
     */
    function fillPrev(td, day)
    {
        td.className = 'other';
        td.innerHTML = day;

    }

    /**
     * Fills td's by numbers of next month
     * @param {Object} td 
     */
    function fillNext(td)
    {
        td.className = 'other';
        td.innerHTML = nextDay;
        nextDay++;
    }

    /**
     * Fills td's by numbers of current month
     * @param {Object} td 
     * @param {Number} day
     */
    function fillTD(td, day)
    {
        td.innerHTML = day;
        if (aDate.getFullYear() == today.getFullYear() &&
            aDate.getMonth() == today.getMonth() &&
            day == today.getDate())
        {
            td.className = 'today';
        }
    }

    /**
     * Creates table of calendar and fills it 
     * @return {Object}
     */
    this.getTable = function()
    {
        var table = document.createElement('table'),
        firstWeekday = this.getStartWeekday(),
        days = this.getDays(),
        prevDays = this.getPrevDays(),
        tr = document.createElement('tr'),
        td,
        j,
        i;

        table.id = 'table-calendar';
        table.className = 'table table-bordered text-center';
        
        for (i = 0; i < weekdays.length; i++)
        {
            var th = document.createElement('th');
            th.innerHTML = weekdays[i];
            tr.appendChild(th);
        }

        table.appendChild(tr);
        
        tr = document.createElement('tr');

        for (i = 1; i <= 7; i++)
        {
            td = document.createElement('td');
            if(i == 7)
                {
                    td.className = 'weekend';
                }
            if (i < firstWeekday)
            {
                fillPrev(td, prevDays.shift());
            } 
            else
            {
                fillTD(td, days.shift());
            }
            tr.appendChild(td);
        }

        table.appendChild(tr);

        for (var row = 1; row <= 5; row++)
        {
            tr = document.createElement('tr');

            for (i = 0; i < 7; i++)
            {
                td = document.createElement('td');
                
               
                if(i == 6)
                {
                    td.className = 'weekend';
                }

                if (days.length > 0)
                {
                    fillTD(td, days.shift());
                } 
                else
                {
                    fillNext(td);
                }

                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;
    };
}

/**
 * The main part of calendar
 * @constructor
 * @param {Object} date 
 * @return {Function}
 */
function Calendar(date)
{
    var locale = window.navigator.language,
    weekdays = getWeekdays();

    /**
     * Returns local vision of month and year
     * @param {Object} d 
     * @return {Object}
     */
    function getLocalYearMonth(d)
    {
        return d.toLocaleDateString(locale, 
        {
            year: 'numeric',
            month: 'long'
        });
    }

    /**
     * Helps to create an array of weekdays starting from monday
     * @return {Number}
     */
    function getFirstMonday() 
    {
        var day = new Date(),
        weekday = day.getDay(),
        diff = day.getDate() - weekday + (weekday === 0 ? -6 : 1);
        day.setDate(diff);
        return day;
    }

    /**
     * Creates an array of weekdays and returnes it
     * @return {Array}
     */
    function getWeekdays()
    {
        var day = getFirstMonday(),
        days = [],
        i;

        /**
         * Returns local vision of weekday
         * @param {Number} num 
         * @param {Function} day 
         * @return {Object}
         */
        function getLocalDay(num, day)
        {
            var wd = new Date(day);
            wd.setDate(day.getDate() + num);
            return wd.toLocaleDateString(locale, 
            {
                weekday: 'short'
            });
        }

        for (i = 0; i < 7; i++)
        {
            days.push(getLocalDay(i, day));
        }
        return days;
    }

    /**
     * Creates button with text inside
     * @param {String} html 
     * @return {Object}
     */
    function createButton(html)
    {
        var btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerHTML = html;
        return btn;
    }

    /**
     * Gets calendar with navigation
     * @return {Object}
     */
    function getCalendar()
    {
        var container = document.createElement('div'),
        tableNav = document.createElement('table'),
        trNav = document.createElement('tr'),
        tdTitle = document.createElement('td'),
        title = document.createElement('h4'),
        tdPrev = document.createElement('td'),
        btnPrev = createButton('<'),
        tdNext = document.createElement('td'),
        btnNext = createButton('>'),
        c_table = new CalendarTable(date, weekdays),
        i;

        container.id = 'calendar-box';
        c_table.id ="calendar";
        container.setAttribute('data-year', date.getFullYear());
        container.setAttribute('data-month', date.getMonth());
 
        tableNav.className = 'table';
       
        title.id = 'calendar-title';
        title.innerHTML = getLocalYearMonth(date);
        tdTitle.appendChild(title);
  
        tdPrev.appendChild(btnPrev);
 
        tdNext.appendChild(btnNext);

        trNav.appendChild(tdPrev);
        trNav.appendChild(tdTitle);
        trNav.appendChild(tdNext);

        tableNav.appendChild(trNav);

        container.appendChild(tableNav);
        container.appendChild(c_table.getTable());

        btnNext.addEventListener('click', getNextCalendar, false);
        btnPrev.addEventListener('click', getPrevCalendar, false);
        table = document.getElementById('calendar');
        table.addEventListener("click", function(event) 
        {
            if (event.target && event.target.nodeName == "TD") 
            {
                if(event.target.classList.contains('chosen'))
            {
                event.target.classList.remove('chosen');
            }
            else
            {
                event.target.classList.add('chosen');
            }          
        }
    });

        return container;
    }

    /**
     * Function to switch calendar month
     * @param {Boolean} next 
     */
    function switchCalendar(next)
    {
        var container = document.getElementById('calendar-box'),
        year = Number(container.getAttribute('data-year')),
        month = Number(container.getAttribute('data-month')) + (next === true ? 1 : -1),
        nDate = new Date(year, month, 1),
        oC = document.getElementById('table-calendar'),
        c_table = new CalendarTable(nDate, weekdays),
        title = document.getElementById('calendar-title');

        container.setAttribute('data-year', nDate.getFullYear());
        container.setAttribute('data-month', nDate.getMonth());
                
        container.replaceChild(c_table.getTable(), oC);
        
        title.innerHTML = getLocalYearMonth(nDate);
    }

    /**
     * Shows next calendar month
     * @return {Object}
     */
    function getNextCalendar()
    {
        return switchCalendar(true);
    }

    /**
     * Shows previous calendar month
     * @return {Object}
     */
    function getPrevCalendar()
    {
        return switchCalendar(false);
    }

    return getCalendar();
}


/**
 * Shows calendar after page loading
 */
window.onload = function ()
{
    var calendar = Calendar(new Date());
    document.getElementById('calendar').appendChild(calendar);
};
