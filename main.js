window.addEventListener('DOMContentLoaded', () => {
    let game = new Game({});
});

class Game {
    constructor({ initialTurn = 0 }) {
        this.gridElem = document.querySelector('#grid');
        this.turn = initialTurn || 0;
        this.turns = ["X", "O"];
        this.markedMap = { 'X': [], 'O': [] }
        this.cels = {};

        this.installCallbacks();
    }

    installCallbacks() {
        this.gridElem.addEventListener('click', (ev) => this.onClickCel(ev));
    }

    onClickCel(ev) {
        const cel = ev.target;

        if (!cel.classList.contains("cel") || cel.classList.contains("X") || cel.classList.contains("O")) {
            return;
        }

        const index = parseInt(cel.dataset['celindex']);

        this.setSlot(index);

        this.checkWinner();

        this.changeTurn();
    }

    setSlot(index) {
        if (typeof index !== "number") return;
        if (index < 0 || index > 8) return;

        const child = this.gridElem.children[index];
        child.classList.add(this.playing());

        this.cels[index] = this.playing()
        this.markedMap[this.playing()].push(index)
    }

    playing() {
        return this.turns[this.turn];
    }

    checkWinner() {
        const indices = this.markedMap[this.playing()]
        indices.sort()

        const inc = i => indices.includes(i)

        // comprobar si hay tres numeros consecutivos
        // que inicien en 1, 4 o 7
        let win = false;
        win ||= [0, 1, 2].every(inc)
        win ||= [3, 4, 5].every(inc)
        win ||= [6, 7, 8].every(inc)

        win ||= [0, 3, 6].every(inc)
        win ||= [1, 4, 7].every(inc)
        win ||= [2, 5, 8].every(inc)

        win ||= [0, 4, 8].every(inc)
        win ||= [2, 4, 6].every(inc)

        if (win) {
            alert("Ha ganado " + this.turns[this.turn]);
            location.reload()
        }

    }

    changeTurn() {
        this.turn = (this.turn + 1) % this.turns.length
    }

}