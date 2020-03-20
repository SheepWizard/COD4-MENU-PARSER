export class Menu{
    constructor(){
        this.menuDefList();
    }

    draw(){

    }
}

export class Def{
    constructor(properties){
        this.properties = properties;
    }

    draw(){

    }

    drawBorders(){

    }
}

export class MenuDef extends Def{
    constructor(){
        this.properties = {

        }

        super(this.properties);
    }

    draw(){

    }

    onOpen(){

    }

    onClose(){

    }

    onESC(){

    }

    onExecKey(){

    }

    onExecKeyInt(){
        
    }
}

export class ItemDef extends Def{
    constructor(){
        this.properties = {

        }

        super(this.properties);
    }

    draw(){

    }
}