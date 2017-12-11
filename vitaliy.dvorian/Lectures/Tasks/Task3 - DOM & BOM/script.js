/*  -Calendar
 *  -author Vitaliy Dvoryan
 *  -10.12.2017
*/

//initialization of global variables
let switchBack = document.querySelector('thead tr:nth-child(1) td:nth-child(1)'), //switch to previous month
    switchNext = document.querySelector('thead tr:nth-child(1) td:nth-child(3)'), //switch to next month
    cellMonth = document.querySelector('thead td:nth-child(2)'); //month with cell
//Сalendar generation function
function generateCalendar(year, month) {
    //initialization of variables
    let lengthMonth = new Date(year, month + 1, 0).getDate(), //length of the month ( first day of next month - 1 )
        lengthPrevMonth = new Date(year, month , 0).getDate(), //the length of the previous month
        lastDay = new Date(year, month, lengthMonth), //last day of the month  
        NumLastLine = new Date(lastDay.getFullYear(), lastDay.getMonth(), lengthMonth).getDay(), //number of days in the last line
        CellBegin = new Date(lastDay.getFullYear(), lastDay.getMonth(), 1).getDay(), //from which cell begins a month
        createRow = '<tr>', //create a table row
        tbody = document.querySelector('tbody'), //field with numbers
        countDayNextMonth = 1; // a counter for counting the days of the next month
    var month = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    
    
    if (CellBegin != 0) { //if the month starts with the first cell
        for (let i = 1; i < CellBegin; i++) createRow += '<td>';
    } else {
        for (let i = 0; i < 6; i++) createRow += '<td>'; 
    }
    
    for (let i = 1; i <= lengthMonth+7-NumLastLine; i++) { //calendar generation
        if (i == new Date().getDate() && lastDay.getFullYear() == new Date().getFullYear() && lastDay.getMonth() == new Date().getMonth()) {
            createRow += '<td class="today">' + i; //present day
        } else if(i > lengthMonth){
            createRow += '<td class="dayNotThisMonth">' + countDayNextMonth;
            countDayNextMonth++;
        } else {
            createRow += '<td>' + i; //add days
        }
        if (new Date(lastDay.getFullYear(), lastDay.getMonth(), i).getDay() == 0) {
            createRow += '<tr>'; //add row
        }
    }
    
    document.querySelector('tbody').innerHTML = createRow; //show days
    cellMonth.innerHTML = month[lastDay.getMonth()].toUpperCase() + ' ' + lastDay.getFullYear(); //show current month
    cellMonth.dataset.month = lastDay.getMonth(); //Show other months
    cellMonth.dataset.year = lastDay.getFullYear(); //Show other years
    
    //show days from the previous month
    for(var i=0;i<7;i++){
    if(tbody.childNodes[0].childNodes[i].innerHTML == '' ){
        if(CellBegin == 0){
            CellBegin=7;
        }
    tbody.childNodes[0].childNodes[i].className += 'dayNotThisMonth';
    tbody.childNodes[0].childNodes[i].innerHTML = lengthPrevMonth-CellBegin+i+2;   
    }};
    


    let allCell = document.querySelectorAll('tbody tr td'); //an array of all cell (the change must be initialized here)
    
    
    //the ability to select an item (I know that this is not the best solution, but I could not come to the best. But it works =) )
    [].forEach.call(allCell, function (el) {
        el.onclick = function (e) {
            [].forEach.call(allCell, function (el) {
                if(el.classList.contains('chosenDay')){
                    el.classList.remove('chosenDay');
                } ;
            });
        el.classList.add('chosenDay');       
    }
       
});
    
    
};

//run the function that generates the current month
generateCalendar(new Date().getFullYear(), new Date().getMonth());

// previous month
switchBack.addEventListener('click',backMonth);
//generate the previous month
function backMonth() {
    generateCalendar(cellMonth.dataset.year, parseFloat(cellMonth.dataset.month) - 1);
}
// next month
switchNext.addEventListener('click',nextMonth);
//generate next month
function nextMonth() {
    generateCalendar(cellMonth.dataset.year, parseFloat(cellMonth.dataset.month) + 1);
}




