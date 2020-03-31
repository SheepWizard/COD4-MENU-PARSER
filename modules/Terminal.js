
class Terminal{
    constructor(){
        this.div;
        this.list;
    }

    setDiv(d){
        this.list = d
        this.div = d.parentElement;
    }

    /**
     * Print text to console
     * @param {String} text Text to print
     * @param {Object} colour Object with rgb       
     */
    printText(text, colour){
        if(!colour){
            colour = {r:255,g:255,b:255};
        }
        const li = document.createElement("li");
        const span = document.createElement("span");
        const listText = document.createTextNode(text);
        span.style.color = `rgb(${colour.r},${colour.g},${colour.b})`;
        span.appendChild(listText);
        li.appendChild(span);
        this.list.appendChild(li);
        this.scrollBottom();
    }

    printList(list, colour){
        list.forEach(elm => {
            this.printText(elm,colour);
        });
    }

    clear(){
        this.list.innerHTML  = "";
    }

    scrollBottom(){
        this.div.scrollTop = this.div.scrollHeight;
    }



}

export default Terminal = new Terminal();