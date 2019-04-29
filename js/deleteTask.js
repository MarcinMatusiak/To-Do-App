function handleClick(id,e) {
    fetch(`${window.location.href}/${id}`, {
            method: 'DELETE',
            headers: {"x-log-token": localStorage.getItem("token")},
    })  .then( function (response) {
        response.json().then(function(data) {
                 window.location.replace(`/me/${data.userId}`);
           });
         }
       )
       .catch(function(err) {
         console.log('Fetch Error :-S', err);
       });
};
