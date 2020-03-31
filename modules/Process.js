import Parser from "./../parser.js";
import Lexer from "./../lexer.js";
import Terminal from "./Terminal.js";
import { canvas } from "./MyCanvas.js";

const parser = new Parser();
const lexer = new Lexer();

//tempory
export function process(text){
    Terminal.printText("");
    Terminal.printText("Reading files");
    lexer.setFile(text);
    parser.setTokens(lexer.getTokens());
    Terminal.printText("Parser errors:");
    const menu = parser.parse();
    Terminal.printText("Drawing menu:");
    canvas.setMenu(menu);
    canvas.draw();
}