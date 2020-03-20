import Parser from "./parser.js";
import Lexer from "./lexer.js";
import PreProcessor from "./preprocessor.js";

const parser = new Parser();
const lexer = new Lexer();

function init(){
    eventListeners();
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

        lexer.setFile(reader.result);
        parser.setTokens(lexer.getTokens());
        console.log(parser.parse());
    }
    reader.onerror = () =>{
        alert("Error reading file");
    }
    reader.readAsText(file);
}




window.onload = function(){
    init();
}