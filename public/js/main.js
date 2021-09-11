function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.addEventListener("load", () => resolve(image));
  });
}

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

context.fillRect(0, 0, 50, 50);

loadImage("./img/spritesheet.png").then((image) => {
  context.drawImage(image, 0, 0);
});
