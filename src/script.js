function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.dropEffect = "copy"; //relook at this
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const validDropzone = document.getElementById("grid-viewer")

    if (event.target === validDropzone) {

        const id = event.dataTransfer.getData('text')

        const draggableElement = document.getElementById(id)
        const dropzone = event.target
        dropzone.appendChild(draggableElement)

    } else {
        event.preventDefault()
    }

    event.dataTransfer.clearData();
}