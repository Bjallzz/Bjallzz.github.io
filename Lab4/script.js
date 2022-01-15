function drag(ev) {
    ev.dataTransfer.setData("src", ev.target.id);
    ev.dataTransfer.setData("offset", (parseInt(ev.target.style.getPropertyValue("left"),10) - ev.clientX) + ',' + (parseInt(ev.target.style.getPropertyValue("top"),10) - ev.clientY))
}

function dropBlock(ev) {
    var offset = ev.dataTransfer.getData("offset").split(',');
    var id = ev.dataTransfer.getData('src');
    var element = document.getElementById(id);
    var width = element.getBoundingClientRect().width;
    var height = element.getBoundingClientRect().height;
    var topLeft = document.elementFromPoint(ev.clientX + parseInt(offset[0],10), ev.clientY + parseInt(offset[1],10));
    var topRight = document.elementFromPoint(ev.clientX + parseInt(offset[0],10) + width, ev.clientY + parseInt(offset[1],10));
    var bottomLeft = document.elementFromPoint(ev.clientX + parseInt(offset[0],10), ev.clientY + parseInt(offset[1],10) + height);
    var bottomRight = document.elementFromPoint(ev.clientX + parseInt(offset[0],10) + width, ev.clientY + parseInt(offset[1],10) + height);

    //Prevent drop if any of the corners is overlapping with any block other than it's own
    if((topLeft.id !== "field" && topLeft.id !== id ) ||
        (topRight.id !== "field" && topRight.id !== id) ||
        (bottomLeft.id !== "field" && bottomLeft.id !== id) ||
        (bottomRight.id !== "field" && bottomRight.id !== id)) 
    {
        return;
    }
    element.style.left = (ev.clientX + parseInt(offset[0],10)) + 'px';
    element.style.top = (ev.clientY + parseInt(offset[1],10)) + 'px';
    ev.preventDefault();
    return false;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function generateBlock(ev) {
    if(document.getElementById("BlockStartingPoint").firstElementChild === null) {
        var randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        let randomId = (Math.random() + 1).toString(36).substring(6);
        var block = document.createElement('div')
        block.id = randomId;
        block.style.height = '100px';
        block.style.display = 'block';
        block.style.position = 'absolute';
        block.style.left = '860px';
        block.style.top = '620px';
        block.style.width = '100px';
        block.style.backgroundColor = randomColor;
        block.style.justifySelf = 'center';
        block.draggable = true;
        block.addEventListener('dragstart', drag);
        block.addEventListener('dragover', allowDrop);
        block.addEventListener('drop', dropBlock);
        document.body.appendChild(block);      
    }
}