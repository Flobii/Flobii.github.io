let canvas = document.getElementById('canvas');
canvas.width = 886;
canvas.height = 1838;
let ctx = canvas.getContext('2d');
let clip = document.getElementById('masc');
let img = document.getElementById('example');
let frame = document.getElementById('frame');

function setup() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'source-in';
  ctx.drawImage(clip, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
}

function update() {
  let screenshot = document.getElementById('screenshot');
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'source-in';
  ctx.drawImage(clip, 0, 0, canvas.width, canvas.height);

  let ratio = screenshot.width / screenshot.height;
  let [width, height] = [canvas.height * ratio, canvas.height];
  let posX = 0;
  if (width > canvas.width) {
    posX = Math.floor((width - canvas.width) / 2);
  }
  ctx.drawImage(screenshot, -posX, 0, width, height);
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
}

const download = document.getElementById('download');

download.addEventListener('click', function (e) {
  // console.log(canvas.toDataURL());
  const link = document.createElement('a');
  link.download = 'pixel_screenshot.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});

window.onload = setup;
