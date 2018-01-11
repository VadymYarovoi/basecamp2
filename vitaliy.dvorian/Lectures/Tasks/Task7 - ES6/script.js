let tic = document.getElementById('tic'),
    tac = document.getElementById('tac'),
    cell = document.getElementsByClassName('cell'),
    turn = [];

/*Function for movement tic
 * @param {object} e
 */
tic.onmousedown = function (e) {

    //Prohibit 2 moves in a row
    if (turn.length == 1 || turn.length == 3 || turn.length == 5 ||
        turn.length == 7 || turn.length == 9) {
        return;
    }

    let coords = getCoords(tic);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;

    tic.style.position = 'absolute';
    document.body.appendChild(tic);
    moveAt(e);

    function moveAt(e) {
        tic.style.left = e.pageX - shiftX + 'px';
        tic.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function (e) {
        moveAt(e);
    };

    tic.onmouseup = () => {
        document.onmousemove = null;
        tic.onmouseup = null;
        if (event.pageX <= 200 && event.pageY <= 200 &&
            event.pageX > 0 && event.pageY > 0) {
            if (!turn.includes(0)) {
                cell[0].style.backgroundImage = 'url(img/tic.png)';
                turn.push(0);
            }
        }

        if (event.pageX <= 200 && event.pageY <= 400 &&
            event.pageX > 0 && event.pageY > 200) {
            if (!turn.includes(1)) {
                cell[1].style.backgroundImage = 'url(img/tic.png)';
                turn.push(1);
            }
        }

        if (event.pageX <= 200 && event.pageY <= 600 &&
            event.pageX > 0 && event.pageY > 400) {
            if (!turn.includes(2)) {
                cell[2].style.backgroundImage = 'url(img/tic.png)';
                turn.push(2);
            }
        }

        if (event.pageX <= 400 && event.pageY <= 200 &&
            event.pageX > 200 && event.pageY > 0) {
            if (!turn.includes(3)) {
                cell[3].style.backgroundImage = 'url(img/tic.png)';
                turn.push(3);
            }
        }

        if (event.pageX <= 400 && event.pageY <= 400 &&
            event.pageX > 200 && event.pageY > 200) {
            if (!turn.includes(4)) {
                cell[4].style.backgroundImage = 'url(img/tic.png)';
                turn.push(4);
            }
        }

        if (event.pageX <= 400 && event.pageY <= 600 &&
            event.pageX > 200 && event.pageY > 400) {
            if (!turn.includes(5)) {
                cell[5].style.backgroundImage = 'url(img/tic.png)';
                turn.push(5);
            }
        }
        if (event.pageX <= 600 && event.pageY <= 200 &&
            event.pageX > 400 && event.pageY > 0) {
            if (!turn.includes(6)) {
                cell[6].style.backgroundImage = 'url(img/tic.png)';
                turn.push(6);
            }
        }
        if (event.pageX <= 600 && event.pageY <= 400 &&
            event.pageX > 400 && event.pageY > 200) {
            if (!turn.includes(7)) {
                cell[7].style.backgroundImage = 'url(img/tic.png)';
                turn.push(7);
            }
        }
        if (event.pageX <= 600 && event.pageY <= 600 &&
            event.pageX > 400 && event.pageY > 400) {
            if (!turn.includes(8)) {
                cell[8].style.backgroundImage = 'url(img/tic.png)';
                turn.push(8);
            }
        }
        //turn back
        tic.style.top = "108px";
        tic.style.left = "746px";
    }

};


//======================TAC==========================
/*Function for movement tac
 * @param {object} e
 */
tac.onmousedown = (e) => {
    if (turn.length == 0 || turn.length == 2 || turn.length == 4 ||
        turn.length == 6 || turn.length == 8 || turn.length == 9) {
        return;
    }
    let coords = getCoords(tac);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;

    tac.style.position = 'absolute';
    document.body.appendChild(tac);
    moveAt(e);

    function moveAt(e) {
        tac.style.left = e.pageX - shiftX + 'px';
        tac.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function (e) {
        moveAt(e);
    };

    tac.onmouseup = () => {
        document.onmousemove = null;
        tic.onmouseup = null;
        if (event.pageX <= 200 && event.pageY <= 200 &&
            event.pageX > 0 && event.pageY > 0) {
            if (!turn.includes(0)) {
                cell[0].style.backgroundImage = 'url(img/tac.png)';
                turn.push(0);
            }
        }

        if (event.pageX <= 200 && event.pageY <= 400 &&
            event.pageX > 0 && event.pageY > 200) {
            if (!turn.includes(1)) {
                cell[1].style.backgroundImage = 'url(img/tac.png)';
                turn.push(1);
            }
        }

        if (event.pageX <= 200 && event.pageY <= 600 &&
            event.pageX > 0 && event.pageY > 400) {
            if (!turn.includes(2)) {
                cell[2].style.backgroundImage = 'url(img/tac.png)';
                turn.push(2);
            }
        }

        if (event.pageX <= 400 && event.pageY <= 200 &&
            event.pageX > 200 && event.pageY > 0) {
            if (!turn.includes(3)) {
                cell[3].style.backgroundImage = 'url(img/tac.png)';
                turn.push(3);
            }
        }

        if (event.pageX <= 400 && event.pageY <= 400 &&
            event.pageX > 200 && event.pageY > 200) {
            if (!turn.includes(4)) {
                cell[4].style.backgroundImage = 'url(img/tac.png)';
                turn.push(4);
            }
        }

        if (event.pageX <= 400 && event.pageY <= 600 &&
            event.pageX > 200 && event.pageY > 400) {
            if (!turn.includes(5)) {
                cell[5].style.backgroundImage = 'url(img/tac.png)';
                turn.push(5);
            }
        }
        if (event.pageX <= 600 && event.pageY <= 200 &&
            event.pageX > 400 && event.pageY > 0) {
            if (!turn.includes(6)) {
                cell[6].style.backgroundImage = 'url(img/tac.png)';
                turn.push(6);
            }
        }
        if (event.pageX <= 600 && event.pageY <= 400 &&
            event.pageX > 400 && event.pageY > 200) {
            if (!turn.includes(7)) {
                cell[7].style.backgroundImage = 'url(img/tac.png)';
                turn.push(7);
            }
        }
        if (event.pageX <= 600 && event.pageY <= 600 &&
            event.pageX > 400 && event.pageY > 400) {
            if (!turn.includes(8)) {
                cell[8].style.backgroundImage = 'url(img/tac.png)';
                turn.push(8);
            }
        }
        tac.style.top = "108px";
        tac.style.left = "946px";
    }

};


function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
