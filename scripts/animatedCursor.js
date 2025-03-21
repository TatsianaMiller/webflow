(() => {
  const cursorElements = document.querySelectorAll(".animated-cursor");
  
  cursorElements.forEach((element) => {
    element.style.pointerEvents = "none";
  });
  
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const speed = 0.08;
  
  document.addEventListener("mousemove", (event) => {
    mouseX = event.x;
    mouseY = event.y;
  });
  
  function animateCursors() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;
  
    cursorElements.forEach((element) => {
      element.style.transform = "translate(0, 0)";
  
      const { left, top, width, height } = element.getBoundingClientRect();
  
      element.style.transform = `translate(${currentX - left - width / 2}px, ${
        currentY - top - height / 2
      }px)`;
    });
  
    requestAnimationFrame(animateCursors);
  }
  
  if (cursorElements.length) {
    animateCursors();
  }

})()
