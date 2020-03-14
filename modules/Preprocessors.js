
export class Preprocessor{
    constructor(type, start, end){
        this.type = type;
        this.start = start;
        this.end = end;
    }
}

export class Define extends Preprocessor{
    constructor(start,end){
        super("define",start,end);
        this.identifer = "";
        this.replacement = "";
        this.function = false;
        this.inputs = [];
        //false if undefined
        this.active = true;
    }
}

export class Input extends Preprocessor{
    constructor(directory,start,end){
        super("input", start, end);
        this.directory = directory;
    }
}

export class Undef extends Preprocessor{
    constructor(start, end){
        super("undef", start, end);
    }
}

export class Ifdef extends Preprocessor {
    constructor(start, end) {
        super("ifdef", start, end);
    }
}

export class Ifndef extends Preprocessor {
    constructor(start, end) {
        super("ifndef", start, end);
    }
}

export class Endif extends Preprocessor {
    constructor(start, end) {
        super("endif", start, end);
    }
}