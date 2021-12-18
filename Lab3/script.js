function drag(ev) {
    ev.dataTransfer.setData("src", ev.target.id);
}

function dropBlock(ev) {
    ev.preventDefault();
    var element = document.getElementById(ev.dataTransfer.getData("src"));
    element.draggable = false;
    ev.currentTarget.appendChild(element)
}

function drop(ev) {
    ev.preventDefault();
    var source = document.getElementById(ev.dataTransfer.getData("src"));
    var targetValue = ev.currentTarget.firstElementChild.value;
  
    ev.currentTarget.firstElementChild.value = source.value;
    source.value = (targetValue);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function createNewListElementOnEnter(ev) {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      var listElement = document.createElement('li')
      listElement.addEventListener('drop', drop)
      var inputElement = document.createElement('input')
      inputElement.draggable = true
      inputElement.id = ev.target.parentElement.parentElement.childElementCount + 1
      inputElement.addEventListener('dragstart', drag)
      inputElement.addEventListener('dragover', allowDrop)
      inputElement.addEventListener('keydown', createNewListElementOnEnter)
      listElement.appendChild(inputElement)
      ev.target.parentElement.parentElement.appendChild(listElement)
    }
}

function generateBlock(ev) {
    if(document.getElementById("BlockStartingPoint").firstElementChild === null) {
        var randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        let randomId = (Math.random() + 1).toString(36).substring(6);
        var block = document.createElement('div')
        block.id = randomId;
        block.style.height = '100px';
        block.style.width = (window.innerWidth / 10.0).toString() + 'px';
        block.style.backgroundColor = randomColor;
        block.style.justifySelf = 'center';
        block.draggable = true;
        block.addEventListener('dragstart', drag)
        document.getElementById("BlockStartingPoint").appendChild(block)
    }
}