
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
        const preProcessor = PreProcessor(reader.result.trim());
        console.log(preProcessor.process());
        //  const lexer = Lexer(reader.result);
        //  const tokens = lexer.getTokens();
        //  console.log(tokens);
        //  const parser = Parser(tokens);
        //  console.log("Errors:", parser.parse());
    }
    reader.onerror = () =>{
        alert("Error reading file");
    }
    reader.readAsText(file);
}




window.onload = function(){
    init();
}