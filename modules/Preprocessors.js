
export const types = {
    define: "define",
    input: "input",
    undef: "undef",
    ifdef: "ifdef",
    ifndef: "ifndef",
    endif: "endif",
};

export class Preprocessor{
    constructor(type, start, end){
        this.type = type;
        this.start = start;
        this.end = end;
    }
}

export class Define extends Preprocessor{
    constructor(start,end){
        super(types.define,start,end);
        this.identifier = "";
        this.replacement = "";
        this.function = false;
        this.inputs = [];
        //false if undefined
        this.active = true;
    }
}

export class Input extends Preprocessor{
    constructor(directory,start,end){
        super(types.input, start, end);
        this.directory = directory;
    }
}

export class Undef extends Preprocessor{
    constructor(def,start, end){
        super(types.undef, start, end);
        this.identifier = def;
    }
}

export class Ifdef extends Preprocessor {
    constructor(start, end) {
        super(types.ifdef, start, end);
    }
}

export class Ifndef extends Preprocessor {
    constructor(start, end) {
        super(types.ifndef, start, end);
    }
}

export class Endif extends Preprocessor {
    constructor(start, end) {
        super(types.endif, start, end);
    }
}

export class InString{
    constructor(start,end){
        this.start = start;
        this.end = end;
    }
}

export class InComment{
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}