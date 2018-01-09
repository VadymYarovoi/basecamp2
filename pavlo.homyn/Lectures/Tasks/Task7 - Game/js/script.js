window.onload = function init() {

    let signs = document.querySelector(".signs"),
        table = document.getElementsByTagName("table")[0],
        chosenSign,
        arrOfSigns = Array.from({length: 3}, item => new Array(3).fill(""));

    signs.addEventListener("mousedown", function(e) {
        let target = event.target;
        drag(target, e);
    });

    function drag(elem, event) {
        let startX = event.clientX,
            startY = event.clientY,

            origX = elem.offsetLeft,
            origY = elem.offsetTop,

            deltaX = startX - origX,
            deltaY = startY - origY;

        if (chosenSign === elem.className) {
            document.getElementById("error").innerHTML = "You've made your move with this sign in previous turn!";
            return false;
        } else {
            chosenSign = elem.className;
            document.getElementById("error").innerHTML = "";
        }

        document.addEventListener("mousemove", elemMove);

        document.addEventListener("mouseup", releaseMouse);

        function elemMove(e) {
            elem.style.left = e.clientX - deltaX + "px";
            elem.style.top = e.clientY - deltaY + "px";
        }

        function releaseMouse(e) {
            document.removeEventListener("mouseup", releaseMouse);
            document.removeEventListener("mousemove", elemMove);

            let c = document.createElement("img");

            if (!checkProperCoords(e.clientX, e.clientY)) {
                elem.style.left = origX + "px";
                elem.style.top = origY + "px";
                return false;
            }
            if (checkProperCoords(e.clientX, e.clientY)) {
                let x = tdCoords(e.clientX, e.clientY),
                    t = document.getElementsByTagName("td"),
                    row = document.getElementsByTagName("tr"),
                    td = document.getElementsByTagName("td")[x];

                if (!td.childNodes.length) {
                    td.appendChild(c);
                }
                if (elem.className === "x-sign") {
                    c.setAttribute("src", "images/x-sign.png");
                    arrOfSigns[parseInt(x / row.length)][t[x].cellIndex] = "X";
                    diagonal(arrOfSigns, table, "X");
                    diagonalReverse(arrOfSigns, table, "X");
                    if (every(arrOfSigns[parseInt(x / row.length)], "X")) {
                        table.rows[parseInt(x / row.length)].style.backgroundColor = "black";
                        setTimeout(() => {reload("X")}, 1000);
                    }
                    if (column(arrOfSigns, t[x].cellIndex, "X")) {
                        paintColumns(table, t[x].cellIndex);
                        setTimeout(() => {reload("X")}, 1000);
                    }
                }
                if (elem.className === "zero-sign") {
                    c.setAttribute("src", "images/zero-sign.png");
                    arrOfSigns[parseInt(x / row.length)][t[x].cellIndex] = "0";
                    diagonal(arrOfSigns, table, "0");
                    diagonalReverse(arrOfSigns, table, "0");
                    if (every(arrOfSigns[parseInt(x / row.length)], "0")) {
                        table.rows[parseInt(x / row.length)].style.backgroundColor = "black";
                        setTimeout(() => {reload("0")}, 1000);
                    }
                    if (column(arrOfSigns, t[x].cellIndex, "0")) {
                        paintColumns(table, t[x].cellIndex);
                        setTimeout(() => {reload("0")}, 1000);
                    }
                }
                elem.style.left = origX + "px";
                elem.style.top = origY + "px";
            }
        }
    }

    function diagonal(arr, table, sign) {
        let newArr = [];
        for (let i = 0, j = 0; i < arr.length; i++, j++) {
            if (arr[i][j] === sign) {
                let x = [i, j];
                newArr.push(x);
            }
        }
        if (newArr.length === 3) {
            for (let i = 0; i < table.rows.length; i++) {
                table.rows[newArr[i][0]].cells[newArr[i][1]].style.backgroundColor = "black";
            }
            setTimeout(() => {reload(sign)}, 1000);
        }
    }

    function diagonalReverse(arr, table, sign) {
        let newArr = [];
        for (let i = 0, j = arr.length - 1; i < arr.length; i++, j--) {
            if (arr[i][j] === sign) {
                let x = [i, j];
                newArr.push(x);
            }
        }
        if (newArr.length === 3) {
            for (let i = 0; i < table.rows.length; i++) {
                table.rows[newArr[i][0]].cells[newArr[i][1]].style.backgroundColor = "black";
            }
            setTimeout(() => {reload(sign)}, 1000);
        }
    }

    function reload(sign) {
        alert(`${sign} won the game!`);
        location.reload();
    }

    function every(row, sign) {
        return row.every(item => item === sign);
    }

    function column(arr, i, sign) {
        return arr.every(item => item[i] === sign);
    }

    function paintColumns(table, index){
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[index].style.backgroundColor = "black";
        }
    }

    function checkProperCoords(x, y) {
        let t = table.getBoundingClientRect();

        if ((x < t.left || x > t.right) || (y < t.top || y > t.bottom)) {
            return false;
        }
        if ((x > t.left && x < t.right) && (y > t.top && y < t.bottom)) {
            return true;
        }
    }

    function tdCoords(x, y) {
        let arr = [],
            t = document.getElementsByTagName("td");

        for (let i = 0; i < t.length; i++) {
            let c = t[i].getBoundingClientRect();
            arr[i] = {
                left: c.left,
                top: c.top,
                right: c.right,
                bottom: c.bottom
            };
        }
        for (let i = 0; i < arr.length; i++) {
            if ((x >= arr[i].left && x <= arr[i].right) && (y >= arr[i].top && y <= arr[i].bottom)) {
                return i;
            }
        }
    }
};
