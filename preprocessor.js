const PreProcessor = function(file){

    let defineList = [];
    const includeList = [];
    const undefList = [];
    const warnings = [];
    const errors = [];

    function process(){
        let word = "";
        let processorFound = false;
        let processorStart;
        let processorEnd;
        let lineCount = 1;
        let newLine = false;
        let inString = false;
        let inLineComment = false;
        let inBlockComment = false;
        
        for(let i = 0; i < file.length; i++){

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

            if(processorFound){

                //check for multi line
                if(file[i] === "\\"){
                    newLine = true;
                    word += " ";
                    continue;
                }
                //CHECK FOR END OF FILE
                if (file[i] === "\n"){
                    if (newLine){
                        newLine = false;
                    }else{
                        processorFound = false;
                        newLine = false;
                        processorEnd = i;
                        lookAtProcessor(word, processorStart, processorEnd, lineCount);  
                    }    
                }
                word += file[i];
            }
        }
        console.log("Warnings: " + warnings);
        console.log(`Errors: ${errors}`);
        console.log(defineList);
        console.log(includeList);
        console.log(undefList);

        return "done";
    }

    function lookAtProcessor(processor, start, end, lineCount){   
        processor = processor.trimStart();
        let tkns = processor.replace("\r", "").split(/\s/);
        switch(tkns[0]){
            case "define":
                console.log("defie");
                const newDefine = {
                    identifier: "",
                    replacement: "",
                    function: false,
                    inputs: [],
                    start: start,
                    end: end,
                };
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
                                    errors.push("line " + lineCount + ": invalid define parameter");
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
                                    errors.push("line " + lineCount + ": invalid define parameter");
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
                            if (hasWhiteSpace(name[i]) && indentifer !== "") {
                                if (name[i + 1] !== undefined) { 
                                    newDefine.replacement = name.slice(i+1, name.length).trimStart();
                                }
                                break;
                            } else if (!hasWhiteSpace(name[i])){
                                indentifer += name[i];
                            }      
                        }
                    }

                    newDefine.identifier = indentifer.trimStart().replace("\r", "");
                    newDefine.replacement = newDefine.replacement.replace("\r", "");

                    //check if we already have define with same name
                    const found = defineList.findIndex((elm) => elm.identifier == newDefine.identifier);

                    if (found === -1) {
                        defineList.push(newDefine);
                    } else {
                        warnings.push("line " + lineCount + ": redefintion of " + newDefine.identifier);
                        defineList[found] = newDefine;
                    }    

                } else {
                    errors.push("line " + lineCount + ": #define without name");
                    return;
                }
                break;
            case "include":
                let directory = "";
                if(tkns.length > 1){
                    let name = tkns.slice(1, tkns.length).join(" ");
                    let inString = false;
                    //String can be concatenated e.g. "ui/" "menudef.h" would work
                    for (let i = 0; i < name.length; i++){                          
                        if (name[i] === "\""){
                            if(inString){
                                inString = false;
                                continue;
                            }
                            inString = true;
                            continue;
                        }
                        if(inString){
                            directory += name[i];
                        }
                    }
                    if(inString){
                        errors.push("line " + lineCount + ": include string not closed");
                        return;
                    }else{
                        includeList.push({
                            file:directory,
                            start: start,
                            end: end,
                        });
                    }
                }else{
                    errors.push("line " + lineCount + ": #include without file name");
                    return;
                }
                break;
            case "undef":
                if(tkns.length > 1){
                    //undef should only read first word and ingore eveything after
                    if(tkns.length > 2){
                        end = start + tkns.slice(0, 2).join(" ").length + 1;//+1 is for the #
                    }
                    defineList = defineList.filter((elm) => elm.identifier != tkns[1]);
                    undefList.push({
                        start: start,
                        end: end,
                    });
                }else{
                    errors.push("line " + lineCount + ": undef without name");
                } 
                break;
            default:
                console.log("preprocessor not found");
                return;
        }
    }

    function hasWhiteSpace(s){
        return /\s/.test(s);
    }

    return{
        process: process,
    }
}