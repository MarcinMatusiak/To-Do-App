function authorization() {
    const token = localStorage.getItem('token');
    if (token !== null) {
        window.location.replace('/me');
    }
}

authorization();

document.getElementById('logForm').addEventListener('submit', (event) => {
    event.preventDefault();
   fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)) 
    }).then(async (resp) => {
            let token = await resp.headers.get('x-log-token');
            if (token !== null) {
            localStorage.setItem('token', token); 
            window.location.replace('/me');
            } else {
                document.getElementById('error').textContent = 'Login and password can not be empty and password must meets complexity requirements';
            }
       }).catch((error) => {
           console.log(error);
       });
    }
);

const regButton = document.getElementById('register');
if (regButton) {
regButton.onclick = function(e) {
    e.preventDefault();
    document.querySelector('form').setAttribute('action', '/register');
    document.querySelector('#submit-btn').innerHTML = `<i class="fas fa-sign-in-alt"></i>Zarejestruj się`;
    document.querySelector('#register').style.display = 'none';
}
}
