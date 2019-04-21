const logButton = document.getElementById('submit-btn');
logButton.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('logForm').submit();
}

const regButton = document.getElementById('register');
regButton.onclick = function(e) {
    e.preventDefault();
    document.querySelector('form').setAttribute('action', '/register');
    document.querySelector('#submit-btn').innerHTML = `<i class="fas fa-sign-in-alt"></i>Zarejestruj się`;
    document.querySelector('#register').style.display = 'none';
}