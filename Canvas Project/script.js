const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');


window.onload = el => {
    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 2;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 15;
};

window.addEventListener('resize', el => {
    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 2;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 15;
})

let drawMode = false;
let hue = 0;

canvas.onmousedown = el =>{
    drawMode = true;
    //you could use the offset property
    context.moveTo(el.clientX, el.clientY);
    //context.arc(el.clientX, el.clientY, 10, 0, Math.PI * 2, true)

}

canvas.onmousemove = el => {
    if (drawMode) {
        context.beginPath();
        context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        context.lineTo(el.clientX, el.clientY);
        context.stroke();
        console.log('hi');
        hue++;
    }

}

canvas.onmouseup = el => {
    //context.arc(el.clientX, el.clientY, 10, 0, Math.PI * 2, true) 
    drawMode = false;
}

canvas.mouseout = el => {
    drawMode = false;
}



