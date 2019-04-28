// Get the modal
const modal = document.getElementById('modal-window');

// Get the button that opens the modal
const btn1 = document.getElementsByClassName("open-modal")[0];
const btn2 = document.getElementsByClassName("open-modal")[1];
const btn3 = document.getElementsByClassName("open-modal")[2];

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn1.onclick = function () {
    modal.style.display = "block";
};
btn2.onclick = function () {
    modal.style.display = "block";
};
btn3.onclick = function () {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//make a request to a post method creating task
document.getElementById('add_task').addEventListener('submit', (event) => {
    event.preventDefault();
   fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)),
        headers: {
            "x-log-token": localStorage.getItem("token"),
        },
    }).then(
        function(response) {
          response.json().then(function(data) {
           if (data.error) {
                document.getElementById('error').textContent = data.error
           } else {
               window.location.replace('/me');
        }
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
})

