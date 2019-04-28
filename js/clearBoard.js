
const button = document.getElementById('clear');
button.onclick = function () {
    const board = document.querySelectorAll(".task__description");
    Array.from(board).map((el, i) => {
        el.remove();
    });
    localStorage.clear();
};




