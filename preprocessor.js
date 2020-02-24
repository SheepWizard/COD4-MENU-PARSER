const PreProcessor = function(file){

    const defineList = [];
    const warnings = [];
    const errors = [];

    function process(){
        let word = "";
        let processorFound = false;
        let processorStart;
        let processorEnd;
        let lineCount = 1;
        for(let i = 0; i < file.length; i++){

            if (file[i] === "\n") {
                lineCount++;
            }
            
            if (file[i] === "#") {//and not in comment or string
                if(processorFound){
                    //error
                }
                processorFound = true;
                processorStart = i;
                word = "";
                continue;
            }

            if(processorFound){

                //TODO check for processor with multiple lines \
                if(file[i] === "\n"){
                    console.log(word);
                    processorEnd = i;
                    lookAtProcessor(word, processorStart, processorEnd, lineCount);
                    processorFound = false;
                }



                word += file[i];
            }
            

            

        }
        console.log("Warnings: " + warnings);
        console.log("Errors: " + errors);

        return "done";
    }

    function lookAtProcessor(processor, start, end, lineCount){
        let tkns = processor.split(" ");
        console.log(tkns);
        if(tkns[0] === "define"){
            let newDefine = {
                identifier: "",
                replacement: "",
                function: false,
                inputs: [],
                start: start,
                end: end,
            };
            if(tkns.length > 1){
                let inFunction = false;
                let indentifer = "";
                let input = "";
                let name = tkns.slice(1, tkns.length).join(" ");

                //test to see if identifer takes parameters
                for (let i = 0; i < name.length; i++){
                    if(inFunction){
                        if (name[i] === ")"){
                            if (input.trim() === "") {
                                errors.push("line " + lineCount + ": invalid define parameter");
                                return;
                            } else {
                                newDefine.inputs.push(input.trim());
                                input = "";
                            }
                            //make sure we look at rest of definition as inden(a,b)a will all be 1 token but we a will be part of replacement
                            break;
                        }
                        else if (name[i] === ","){
                            
                            if(input.trim() === ""){
                                errors.push("line " + lineCount + ": invalid define parameter");
                                return;
                            }else{
                                console.log("new");
                                newDefine.inputs.push(input.trim());
                                input = "";
                                continue;
                            }
                        }
                        input += name[i];
                    }
                    else if (name[i] === "("){
                        newDefine.function = true;
                        inFunction = true;
                        continue;
                    }else{
                        //check if space. if is then we move onto looking at replacement
                        indentifer += name[i];
                    }
                }

                newDefine.identifier = indentifer;

                if(tkns.length > 2){
                    let replacement = "";
                    for(let i = 2; i < tkns.length; i++){
                        if(i === tkns.length){
                            replacement += tkns[i];
                        }else{
                            replacement += tkns[i] + " ";
                        }
                    }

                    //test to remove newlines
                    newDefine.replacement = replacement;
                }

                //check if we already have define with same name
                const found = defineList.findIndex((elm) => elm.identifier == newDefine.identifier);

                if(found === -1){ 
                    defineList.push(newDefine);
                }else{
                    warnings.push("line " + lineCount + ": redefintion of " + newDefine.identifier);
                    defineList[found] = newDefine;
                }
               
                console.log(defineList);
                
                

            }else{
                errors.push("line " + lineCount + ": #define without name");
                return;
            }
        }
    }

    return{
        process: process,
    }
}