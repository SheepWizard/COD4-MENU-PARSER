import {canvas} from "./MyCanvas.js";
import { editor} from "./Editor.js";
import { process } from "./Process.js";

export default function options(){
    document.getElementById("toggleRatio").addEventListener("click", changeRatio);  
    document.getElementById("zoomSlider").addEventListener("input", changeZoom);
    document.getElementById("run").addEventListener("click", run);
}

let resolution = 1
function changeRatio(){
    resolution = resolution === 0 ? 1 : resolution === 1 ? 2 : 0;
    canvas.setScreenResolution(resolution);
}

function changeZoom(event) {
    canvas.setZoomValue(event.target.value);
}


function run() {
    //console.log();
    process(editor.getValue());
}