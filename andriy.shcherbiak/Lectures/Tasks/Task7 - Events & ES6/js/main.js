let dragObject,moveX,moveY;

dragObject = {};

values.addEventListener('mousedown',function(e) {
  
      if (e.which != 1) return;
      
      dragObject.elem = e.target.cloneNode(true);
  
      dragObject.downX = e.pageX;
      dragObject.downY = e.pageY;
      dragObject.elem.ondragstart = ()=> {
        return false;
      };
    });
  
document.addEventListener('mousemove',function(e){
  if (!dragObject.elem) return; 

   moveX = e.pageX - dragObject.downX;
   moveY = e.pageY - dragObject.downY;

  if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
    return;
  }
  document.body.appendChild(dragObject.elem);
  dragObject.elem.style.position = 'absolute';
  moveAt(e);
});
document.addEventListener('mouseup', function(e) {

   dragObject = {};
  
  })

 
function moveAt(e) {
  dragObject.elem.style.left = e.pageX -  dragObject.elem.offsetWidth / 2 + 'px';
  dragObject.elem.style.top = e.pageY -  dragObject.elem.offsetHeight / 2 + 'px';
}


