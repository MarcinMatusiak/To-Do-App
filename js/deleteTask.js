function handleClick(id) {
    fetch(`http://localhost:3000/delete/${id}`, {
            method: 'DELETE',
            headers: {"x-log-token": localStorage.getItem("token")},
    })  .then(async function (response) {
            try {
                window.location.replace('/me');
            }
            catch (err){
                console.log('Fetch Error :-S', err);
            }
    });
};