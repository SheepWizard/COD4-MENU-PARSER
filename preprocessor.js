const PreProcessor = function(file){


    function process(){
        let word = "";
        let processorFound = false;
        let processorStart;
        let processorEnd;
        for(let i = 0; i < file.length; i++){
            
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
                    lookAtProcessor(word, processorStart, processorEnd);
                    processorFound = false;
                }



                word += file[i];
            }
            

            

        }

        return "done";
    }

    function lookAtProcessor(processor, start, end){
        let tkns = processor.split(" ");
        console.log(tkns);
        if(tkns[0] === "define"){
            let newDefine = {
                identifier: "",
                replacement: "",
                function: false,
                start: start,
                end: end,
            };
            if(tkns.length > 1){
                //test for defines with same name
                //test is identifier is function
                newDefine.identifier = tkns[1];

                if(tkns.length > 2){
                    let replacement = "";
                    for(let i = 2; i < tkns.length; i++){
                        if(i === tkns.length){
                            replacement += tkns[i];
                        }else{
                            replacement += tkns[i] + " ";
                        }
                    }
                    newDefine.replacement = replacement;
                }
               
                console.log(newDefine);
                

            }else{
                console.log("define without name");
            }
        }
    }

    return{
        process: process,
    }
}