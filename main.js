import Parser from "./parser.js";
import Lexer from "./lexer.js";
import options from "./modules/Options.js";
import PreProcessor from "./preprocessor.js";
import Terminal from "./modules/Terminal.js";
import {canvas} from "./modules/MyCanvas.js";
import { setEditor } from "./modules/Editor.js";



const parser = new Parser();
const lexer = new Lexer();

function init(){
    const edit = ace.edit("editor");
    setEditor(edit);
    options();
    eventListeners();
    canvas.setCanvas(document.getElementById("canvas"));
    canvas.setScreen(document.getElementById("screencanvas"));
    canvas.setScreenResolution(1);

    Terminal.setDiv(document.getElementById("terminal"));
    Terminal.printText("Welcome to COD4 Menu Builder v2.",{r:255,g:255,b:255});


    

    const resize = document.getElementById("terminalResizeTop");
    let hoverClick = false;
    resize.addEventListener("mousedown", () =>{
        hoverClick = true;
    });
    resize.addEventListener("mouseup", () => {
        hoverClick = false;
    });
    resize.addEventListener("mousemove", (event) => {
        if(hoverClick){
            console.log( );
            resize.parentElement.style.height = `${window.innerHeight-event.pageY}px`;
        }
        
    })
    resize.addEventListener("mouseenter", () =>{
        console.log("hover");
    });
   

    
}

function eventListeners(){
    document.getElementById("uploadprogress").addEventListener("change", fileReader);
}

function fileReader(event){
    let reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = () => {
        // const preProccessor = new PreProcessor(reader.result.trim());
        // preProccessor.run();
        Terminal.printText("");
        Terminal.printText("Reading files");
        lexer.setFile(reader.result);
        parser.setTokens(lexer.getTokens());   
        Terminal.printText("Parser errors:");
        const menu = parser.parse();
        Terminal.printText("Drawing menu:");
        canvas.setMenu(menu);
        canvas.draw();
    }
    reader.onerror = () =>{
        alert("Error reading file");
    }
    reader.readAsText(file);
}




window.onload = function(){
    init();
}