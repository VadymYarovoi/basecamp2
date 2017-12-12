window.onload = function()
{
    /**
     * Date.prototype extension
     * Addding array of month names to Date
     */ 
    Date.prototype.monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];
    /**
     * Date.prototype extension
     * Returns string name of month using Date.prototype.monthNames
     * @return {String} name
     */ 
    Date.prototype.getMonthName = function()
    {
        return this.monthNames[this.getMonth()];
    }  
    /**
     * Date.prototype extension
     * Calculates amount of days in month
     * @return {Number} amount
     */  
    Date.prototype.monthDays = function()
    {
        var d = new Date(this.getFullYear(), this.getMonth()+1, 0);
        return d.getDate();
    }
    /**
     * Date.prototype extension
     * Returns the number of day in first week from month in specified order:
     * mon - 0
     * ...
     * sun - 6 
     * @return {Number} day
     */
    Date.prototype.getMonthFirstDay = function()
    {
        var d = new Date(date.getFullYear(), date.getMonth(), 1);
        return (d.getDay() == 0) ? 6 : d.getDay() - 1;
    }    

    var date = new Date(),
        spanMonth = document.getElementById('month'),
        spanYear = document.getElementById('year'),
        content = document.getElementById('content'),
        table = document.getElementById('content');       

    // calling main function for dispalying current month
    redraw();

    /**
     * Upadates calendar header
     */
    function updateDate()
    {
        spanMonth.innerHTML = date.getMonthName();
        spanYear.innerHTML = date.getFullYear();
    }

    /**
     * Clears all cells from calendar
     */
    function clearData()
    {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }        
    }

    /**
     * Calculates all needed data for current month representation 
     * Creates 42 cells of `td` and assigns to it corresponding classes 
     */
    function fillData()
    {
        // last days of previous month
        // number of days in checked month
        // first days of next month
        // number of days in previous month
        // current day
        var firstGray = date.getMonthFirstDay(),
            dayNumber = date.monthDays(),
            lastGray = 42 - (firstGray + dayNumber),
            d = new Date(date.getFullYear(), date.getMonth() - 1).monthDays(),
            today = new Date(),
            data = []; 

        for(var i = 0; i < firstGray; i++)
        {
            var block = document.createElement('td');
            block.classList.add('day');
            block.classList.add('gray');
            block.innerHTML = d - firstGray + i + 1;           
            data.push(block);
        }        
        for(var i = 0; i < dayNumber; i++)
        {
            var block = document.createElement('td');
            block.classList.add('day');
            block.classList.add('current');
            block.innerHTML = i + 1;
            data.push(block);
        }
        for(var i = 0; i < lastGray; i++)
        {
            var block = document.createElement('td');
            block.classList.add('day');
            block.classList.add('gray');
            block.innerHTML = i + 1;
            data.push(block);
        }    

        if(today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth())
        {
            data[today.getDate() + firstGray - 1].classList.add('today');
        }
        
        renderData(data);
    }
    

    /**
     * Fills in the table that represents calendar using array of `td`
     * @param {Array} arr
     */
    function renderData(arr)
    {        
        for(var i = 0; i < 6; i++)
        {
            var row = document.createElement('tr');
            for(var j = 0; j < 7; j++)
            {
                row.appendChild(arr[i * 7 + j]);
            }
            if(row.lastChild.classList.contains('current'))
            {
                row.lastChild.classList.add('weekend');
            }
            content.appendChild(row);
        }
    }   

    /**
     * Main function
     * Executes ones after page loading
     * Each time after month change 
     */
    function redraw()
    {
        updateDate();
        clearData();
        fillData();
    }

    /**
     * Left arrow event listener
     * Changes date to previous month
     */
    document.getElementById('left').addEventListener('click', function()
    {        
        date.setMonth((date.getMonth() == 0) ? 11 : date.getMonth() - 1);
        date.setFullYear(((date.getMonth() == 11) ? date.getFullYear() - 1 : date.getFullYear()));        
        redraw();
    })

    /**
     * Left arrow event listener
     * Changes date to next month
     */
    document.getElementById('right').addEventListener('click', function()
    {
        date.setMonth((date.getMonth() == 11) ? 0 : date.getMonth() + 1);
        date.setFullYear((date.getMonth() == 0) ? date.getFullYear() + 1 : date.getFullYear());
        redraw();        
    })   

    /**
     * Cell click event
     * Allows multiple active cells
     * First click on cell extends it by adding new class 'clicked' to classList
     * Second click on cell delets class 'clicked' from classList
     */
    table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName == "TD") {
            if(e.target.classList.contains('clicked'))
            {
                e.target.classList.remove('clicked');
            }
            else{
                e.target.classList.add('clicked');
            }          
        }
    });
}