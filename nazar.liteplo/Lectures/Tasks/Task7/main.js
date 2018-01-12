class Draggeble {
    constructor(element, game) {
        this.element = element;
        this.element.addEventListener('mousedown', (e) => { this.move(game, e) }, false);
    }

    move(game, event) {
        event.stopPropagation();
        event.preventDefault();

        let clone = this.element.cloneNode(true),
            elementOffset = this.element.getBoundingClientRect(),
            offset = {
                top: event.pageY - elementOffset.top,
                left: event.pageX - elementOffset.left
            };

        clone.classList.add('dragging');

        clone.style.top = event.pageY - offset.top + 'px';
        clone.style.left = event.pageX - offset.left + 'px';

        document.body.appendChild(clone);

        let fields = Array.from(document.getElementsByClassName('field'))
            .map(function (fild) {
                let rect = fild.getBoundingClientRect();
                return {
                    node: fild,
                    rect: rect
                }
            });

        let prevField;

        function drag(event) {
            clone.style.top = event.pageY - offset.top + 'px';
            clone.style.left = event.pageX - offset.left + 'px';

            if (prevField) {
                prevField.node.classList.remove('overlaps');
                prevField = null;
            }
            let cloneRect = clone.getBoundingClientRect();

            let field = fields.find(function (field) {
                return overlaps(field.rect, cloneRect);
            });

            if (field) {
                field.node.classList.add('overlaps');
                prevField = field;
            }
        }

        function drop(event) {
            event.stopPropagation();

            if (prevField) {
                if (game.nextMove(prevField.node, event.target)) {
                    prevField.node.appendChild(clone);
                    prevField.node.classList.remove('droppable');
                } else {
                    clone.remove();
                }
                prevField.node.classList.remove('overlaps');
                prevField = null;
            } else {
                clone.remove();
            }

            document.removeEventListener('mousemove', drag, true);
            document.removeEventListener('mouseup', drop, true);
        }

        document.addEventListener('mousemove', drag, true);
        document.addEventListener('mouseup', drop, true);

        function overlaps(rect1, rect2) {
            return !(
                rect1.right < rect2.left + 30 ||
                rect1.left > rect2.right - 30 ||
                rect1.bottom < rect2.top + 30 ||
                rect1.top > rect2.bottom - 30
            );
        }
    }
}


class Game {
    constructor() {
        this.turn = "x";
        this.winner = null;
        this.countTurn = 0;
        this.playerX = new Draggeble(document.querySelector('#cards > [data-card="x"]'), this);
        this.playerO = new Draggeble(document.querySelector('#cards > [data-card="o"]'), this);
        this.setMessage("Move " + this.turn + " to start.");
        this.fields = new Array(9);
        document.getElementById('restart').addEventListener('click', (e) => this.startNewGame(e), false);
        this.startNewGame();
    }

    startNewGame() {
        this.fields.fill("");
        this.turn = "x";
        this.winner = null;
        this.countTurn = 0;
        this.setMessage("Move " + this.turn + " to start.");

        let listField = document.querySelectorAll('[data-field]');

        listField.forEach(el => {
            el.classList.add("droppable");
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        });
    }

    setMessage(msg) {
        document.getElementById('massage').innerText = msg;
    }

    nextMove(square, player) {

        let index = square.getAttribute('data-field');
        let playerName = player.getAttribute('data-card');

        let isCurrentPlayer = () => {
            return playerName === this.turn;
        };
        let isFreeField = () => {
            return this.fields[index] === "";
        };

        if (this.winner !== null) {
            this.setMessage(this.turn + " already won");
            return false;
        }
        if (!isCurrentPlayer()) {
            this.setMessage("Bad move. Move '" + this.turn);
            return false;
        }
        if (!isFreeField()) {
            this.setMessage("Pick another square. Move " + this.turn);
            return false;
        }
        this.countTurn++;
        this.fields[index] = this.turn;
        this.switchTurn();
        return true;
    }

    switchTurn() {
        if (this.checkForWinner(this.turn)) {
            this.setMessage("Congrats " + this.turn + ", you won!");
            this.winner = this.turn;
        } else if (this.countTurn >= 9) {
            this.setMessage("No winnner");
        }
        else if (this.turn === "x") {
            this.turn = "o";
            this.setMessage("Move " + this.turn);
        } else {
            this.turn = "x";
            this.setMessage("Move " + this.turn);
        }
    }

    checkForWinner(move) {
        let result = false;
        if (this.checkRows(0, 1, 2, move) ||
            this.checkRows(3, 4, 5, move) ||
            this.checkRows(6, 7, 8, move) ||
            this.checkRows(0, 3, 6, move) ||
            this.checkRows(1, 4, 7, move) ||
            this.checkRows(2, 5, 8, move) ||
            this.checkRows(0, 4, 8, move) ||
            this.checkRows(2, 4, 6, move)) {
            result = true;
        }
        return result;
    }

    checkRows(a, b, c, move) {
        let fields = this.fields;

        if (fields[a] === move && fields[b] === move && fields[c] === move) {
            return true;
        }
        return false;
    }
}

(function ticTacToe () {

    let game = new Game();

})();
