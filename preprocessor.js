import { Define, Input, Undef, Ifdef, Ifndef, Endif } from "./modules/Preprocessors.js";


export default class PreProcessor{
    constructor(file){
        this.file = file;
        this.preprocessorList = [];
        this.warnings = [];
        this.errors = [];
    }

    process(){
        const file = this.file;
        let word = "";
        let processorFound = false;
        let processorStart;
        let processorEnd;
        let lineCount = 1;
        let newLine = false;
        let inString = false;
        let inLineComment = false;
        let inBlockComment = false;

        for (let i = 0; i < file.length; i++) {

            //special case for comments
            if (file[i] === "/") {
                if (file.length - 1 >= i + 1) {
                    if (file[i + 1] === "*") {
                        inBlockComment = true;
                        continue;
                    } else if (file[i + 1] === "/") {
                        inLineComment = true;
                        continue;
                    }
                }
            }

            //special case for strings
            if (file[i] === "\"" && !processorFound && !inString) {
                inString = true;
                continue;
            }

            //special case for block comments
            if (inBlockComment) {
                if (file[i] === "*") {
                    if (file.length - 1 >= i + 1) {
                        if (file[i + 1] === "/") {
                            inBlockComment = false;
                            i++
                        }
                    }
                }
                continue;
            }

            //special case for line comments
            if (inLineComment) {
                if (file[i] === "\n") {
                    inLineComment = false;
                }
                continue;
            }

            //special case for string
            if (inString) {
                if (file[i] === "\"") {
                    inString = false;
                }
                continue;
            }

            if (file[i] === "\n") {
                lineCount++;
            }

            if (file[i] === "#" && !processorFound && !inString && !inLineComment && !inBlockComment) {
                processorFound = true;
                processorStart = i;
                word = "";
                continue;
            }

            if (processorFound) {

                //check for multi line
                if (file[i] === "\\") {
                    newLine = true;
                    word += " ";
                    continue;
                }
                //CHECK FOR END OF FILE
                if (file[i] === "\n") {
                    if (newLine) {
                        newLine = false;
                    } else {
                        processorFound = false;
                        newLine = false;
                        processorEnd = i;
                        this.lookAtProcessor(word, processorStart, processorEnd, lineCount);
                    }
                }
                word += file[i];
            }
        }
        console.log("Warnings: " + this.warnings);
        console.log(`Errors: ${this.errors}`);
        console.log(this.preprocessorList);
    }

    lookAtProcessor(processor, start, end, lineCount){
        processor = processor.trimStart();
        let tkns = processor.replace("\r", "").split(/\s/);
        switch (tkns[0]) {
            case "define":
                const newDefine = new Define(start, end);
                if (tkns.length > 1) {
                    let inFunction = false;
                    let indentifer = "";
                    let input = "";
                    let name = processor.slice(6, processor.length);

                    //test to see if identifer takes parameters
                    for (let i = 0; i < name.length; i++) {
                        //if it does check what parameters are 
                        if (inFunction) {
                            if (name[i] === ")") {
                                if (input.trim() === "") {
                                    this.errors.push("line " + lineCount + ": invalid define parameter");
                                    return;
                                } else {
                                    newDefine.inputs.push(input.trim());
                                    input = "";
                                }
                                //We are finish, find replacement
                                if (name[i + 1] !== undefined) {
                                    newDefine.replacement = name.slice(i + 2, name.length).trimStart();
                                }
                                break;
                            }
                            //new parameter
                            else if (name[i] === ",") {

                                if (input.trim() === "") {
                                    this.errors.push("line " + lineCount + ": invalid define parameter");
                                    return;
                                } else {
                                    newDefine.inputs.push(input.trim());
                                    input = "";
                                    continue;
                                }
                            }
                            input += name[i];
                        }
                        else if (name[i] === "(") {
                            newDefine.function = true;
                            inFunction = true;
                            continue;
                        } else {
                            //No parameteres and we found identifier that is no empty string
                            if (this.hasWhiteSpace(name[i]) && indentifer !== "") {
                                if (name[i + 1] !== undefined) {
                                    newDefine.replacement = name.slice(i + 1, name.length).trimStart();
                                }
                                break;
                            } else if (!this.hasWhiteSpace(name[i])) {
                                indentifer += name[i];
                            }
                        }
                    }

                    newDefine.identifier = indentifer.trimStart().replace("\r", "");
                    newDefine.replacement = newDefine.replacement.replace("\r", "");

                    //check if we already have define with same name
                    const found = this.preprocessorList.findIndex((elm) => {
                        return elm.identifier == newDefine.identifier && elm.type === "define";
                    });

                    if (found === -1) {
                        this.preprocessorList.push(newDefine);
                    } else {
                        this.warnings.push("line " + lineCount + ": redefintion of " + newDefine.identifier);
                        this.preprocessorList.push(newDefine);
                        this.preprocessorList[found].active = false;
                    }

                } else {
                   this. errors.push("line " + lineCount + ": #define without name");
                    return;
                }
                break;
            case "include":
                let directory = "";
                if (tkns.length > 1) {
                    let name = tkns.slice(1, tkns.length).join(" ");
                    let inString = false;
                    //String can be concatenated e.g. "ui/" "menudef.h" would work
                    for (let i = 0; i < name.length; i++) {
                        if (name[i] === "\"") {
                            if (inString) {
                                inString = false;
                                continue;
                            }
                            inString = true;
                            continue;
                        }
                        if (inString) {
                            directory += name[i];
                        }
                    }
                    if (inString) {
                        this.errors.push("line " + lineCount + ": include string not closed");
                        return;
                    } else {
                        this.preprocessorList.push(new Input(directory, start, end));
                    }
                } else {
                    this.errors.push("line " + lineCount + ": #include without file name");
                    return;
                }
                break;
            case "undef":
                if (tkns.length > 1) {
                    //undef should only read first word and ingore eveything after
                    if (tkns.length > 2) {
                        end = start + tkns.slice(0, 2).join(" ").length + 1;//+1 is for the #
                    }
                    const found = this.preprocessorList.findIndex((elm) => {
                        return elm.identifier == tkns[1] && elm.type === "define" && elm.active;
                    });
                    if(found !== -1){
                        this.preprocessorList[found].active = false;
                    }

                    this.preprocessorList.push(new Undef(start,end));
                } else {
                    this.errors.push("line " + lineCount + ": undef without name");
                }
                break;
            case "ifdef":
                if(tkns.length > 1){
                    if (tkns.length > 2) {
                        end = start + tkns.slice(0, 2).join(" ").length + 1;//+1 is for the #
                    } 
                    this.preprocessorList.push(new Ifdef(start, end));
                } else {
                    this.errors.push("line " + lineCount + ": ifdef without name");
                }
                break;
            case "ifndef":
                if (tkns.length > 1) {
                    if (tkns.length > 2) {
                        end = start + tkns.slice(0, 2).join(" ").length + 1;//+1 is for the #
                    }
                    this.preprocessorList.push(new Ifndef(start, end));
                } else {
                    this.errors.push("line " + lineCount + ": ifndef without name");
                }
                break;
            case "endif":
                if(tkns.length > 1){
                    end = start + tkns.slice(0, 1).join(" ").length + 1;//+1 is for the #
                }
                this.preprocessorList.push(new Endif(start, end));
                break;
            default:
                this.warnings.push(`line ${lineCount}: Preprocessor not reconised: ${processor}`)
                return;
        }
    }

    hasWhiteSpace(s) {
        return /\s/.test(s);
    }
}

