const button = document.getElementById('clear');

button.onclick = function (event) {
    const board = document.querySelectorAll(".task__description");
    Array.from(board).map((el, i) => {
        el.remove();
    });

    fetch(`${window.location.origin}/delete`, {
            method: 'DELETE',
            headers: {
                "x-log-token": localStorage.getItem("token"),
            },
        }).then(
            function (response) {
                response.json().then(function (data) {
                    window.location.replace('/me');
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
};