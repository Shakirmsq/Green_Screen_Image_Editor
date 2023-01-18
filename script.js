// Global variable

var fgImage = null;
var bgImage = null;

//Global declaration for canvases
var fgCanvas = document.getElementById("fgCanvas");
var bgCanvas = document.getElementById("bgCanvas");

function loadForegroundImage() {
    var input = document.getElementById("fgInput");
    fgImage = new SimpleImage(input);
    fgImage.drawTo(fgCanvas);
    alert("Foreground image loaded");
}

function loadBackgroundImage() {
    var input = document.getElementById("bgInput");
    bgImage = new SimpleImage(input);
    bgImage.drawTo(bgCanvas);
    alert("Background image loaded");
}

function doGreenScreen() {
    if (fgImage == null || !fgImage.complete() || bgImage == null || !bgImage.complete()) {
        alert("Images not loaded yet");
        return;
    }

    clearCanvas();

    var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
    var greenThreshold = 240;

    for (var pixel of fgImage.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var bgPixel = bgImage.getPixel(x, y);

        if (pixel.getGreen() > greenThreshold) {
            output.setPixel(x, y, bgPixel);
        } else {
            output.setPixel(x, y, pixel);
        }
    }

    output.drawTo(fgCanvas);
    alert("Composite is Created !!");
}

function clearCanvas() {
    fgCanvas.getContext("2d").clearRect(0, 0, fgCanvas.width, fgCanvas.height);
    bgCanvas.getContext("2d").clearRect(0, 0, bgCanvas.width, bgCanvas.height);

}