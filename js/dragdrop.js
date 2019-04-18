function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    e.target.className === "task" ? e.target.appendChild(document.getElementById(data)) : console.log(e.target);
}