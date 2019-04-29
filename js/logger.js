function authorization() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (token !== null & id !== null) {
        window.location.replace(`/me/${id}`);
    }
}

authorization();

document.getElementById('logForm').addEventListener('submit', (event) => {
    event.preventDefault();
   fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)),
    }).then(
        function(response) {
          response.json().then(function(data) {
           if (data.error) {
                document.getElementById('error').textContent = data.error
           } else if (data.token) {
                let token = data.token;
                if (token !== null) {
                localStorage.setItem('token', token);
                localStorage.setItem('id', data.id); 
                window.location.replace(`/me/${data.id}`);
           }
        }
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
});

const regButton = document.getElementById('register');
if (regButton) {
    regButton.onclick = function(e) {
        e.preventDefault();
        document.querySelector('form').setAttribute('action', '/register');
        document.querySelector('#submit-btn').innerHTML = `<i class="fas fa-share-square"></i> Zarejestruj się`;
        document.querySelector('#register').style.display = 'none';
    }
}
