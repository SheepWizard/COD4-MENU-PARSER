"use strict";

const Parser = function (tokens){   

    function parse(){
        const errors = [];
        let index = 0;
        let tok = tokens[index].token;
        while(tok != undefined){
            Menu();
        }

        return errors;

        function Menu(){
            if (tok === "OPENBRACKET"){
                eat();
                while (tok === "NEWLINE") {
                    newLine();
                }
                while (tok !== "CLOSEBRACKET" && tok !== undefined){
                    MenuDef();
                }
                if (tok === "CLOSEBRACKET" ){
                    eat();
                    newLine();
                }else{
                    error("Expected close bracket \"}\".");
                }
            }
            else{
                error("Expected open bracket \"{\".");
            }
        }

        function MenuDef(){
            if (tok === "MENUDEF"){
                eat();
                while (tok === "NEWLINE") {
                    newLine();
                }
                if (tok === "OPENBRACKET"){
                    eat();
                    newLine();

                    while (tok !== "CLOSEBRACKET" && tok !== undefined){

                        if (tok === "ITEMDEF"){
                            eat();
                            while (tok === "NEWLINE") {
                                newLine();
                            }
                            if (tok === "OPENBRACKET"){
                                eat();
                                newLine();

                                while (tok !== "CLOSEBRACKET" && tok !== undefined){
                                    ItemStatement();
                                    
                                }
                                if (tok === "CLOSEBRACKET") {                                   
                                    eat();
                                    newLine();
                                } else {
                                    error("Expected close bracket \"}\".");
                                }

                            }else{
                                error("Expected open bracket \"{\".");
                            }
                        }else{
                            MenuStatement();
                        }               
         
                    }            

                    while(tok === "NEWLINE"){
                        newLine();
                    }

                    if (tok === "CLOSEBRACKET"){
                        eat();
                        newLine();
                    }else{
                        error("Expected close bracket \"}\".");
                    }
                }else{
                    error("Expected open bracket \"{\".");
                }
            
                while (tok === "NEWLINE") {
                    newLine();
                }

            }else{
                error("Expected \"menuDef\".");
            }
        }

        function ItemStatement(){
            //itemdef options
            if (tok === "NAME") {
                eat();
                IsString();
            }
            else if (tok === "RECT") {
                eat();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
                newLine();
                PrimaryExp(true);
                if (tok !== "NEWLINE") {
                    PrimaryExp(true);
                    if (tok !== "NEWLINE") {
                        PrimaryExp();
                    }
                }
            }
            else if (tok === "ALIGN"){
                eat();
                PrimaryExp();
            }
            else if (tok === "BACKCOLOR") {
                eat();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
            }
            else if (tok === "BACKGROUND") {
                eat();
                IsString();
            }
            else if (tok === "BORDER") {
                eat();
                PrimaryExp();
            }
            else if (tok === "BORDERCOLOR") {
                eat();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
            }
            else if (tok === "BORDERSIZE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "ELEMENTHEIGHT") {
                eat();
                PrimaryExp();
            }
            else if (tok === "ELEMENTTYPE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "ELEMENTWIDTH") {
                eat();
                PrimaryExp();
            }
            else if( tok === "FEEDER"){
                eat();
                PrimaryExp();
            }
            else if (tok === "FOCUSSOUND") {
                eat();
                IsString();
            }
            else if (tok === "FORECOLOR") {
                eat();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
            }
            else if (tok === "GROUP") {
                eat();
                IsString();
            }
            else if (tok === "MAXCHARS") {
                eat();
                PrimaryExp();
            }
            else if (tok === "MAXCHARSGOTONEXT") {
                eat();
                newLine();
            }
            else if (tok === "MAXPAINTCHARS") {
                eat();
                PrimaryExp();
            }
            else if (tok === "NOTSELECTABLE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "ORIGIN"){
                eat();
                PrimaryExp();
                PrimaryExp();
            }
            else if (tok === "OUTLINECOLOR") {
                eat();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
            }
            else if (tok === "SPECIAL") {
                eat();
                PrimaryExp();
            }
            else if (tok === "STYLE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "TEXT") {
                eat();
                IsString();
            }
            else if (tok === "TEXTALIGN") {
                eat();
                PrimaryExp();
            }
            else if (tok === "TEXTALIGNX") {
                eat();
                PrimaryExp();
            }
            else if (tok === "TEXTALIGNY") {
                eat();
                PrimaryExp();
            }
            else if (tok === "TEXTFILE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "TEXTFONT") {
                eat();
                PrimaryExp();
            }
            else if (tok === "TEXTSAVEGAME") {
                eat();
                PrimaryExp();
            }
            else if (tok === "TEXTSCALE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "TEXTSTYLE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "TYPE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "VISIBLE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "AUTOWRAPPED") {
                eat();
            }
            else if (tok === "DECORATION") {
                eat();
            }
            else if (tok === "HORIZONTALSCROLL") {
                eat();
            }

            else if (tok === "NEWLINE") {
                eat();
            }
            else {
                error("Unknown item keyword.");
            }
        }

        function MenuStatement(){
            //menu def options
            if (tok === "NAME") {
                eat();
                IsString();
            }
            else if(tok === "RECT"){
                eat();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
                newLine();
                PrimaryExp(true);
                if(tok !== "NEWLINE"){
                    PrimaryExp(true);
                    if(tok !== "NEWLINE"){
                        PrimaryExp();
                    }
                }
            }
            else if (tok === "FULLSCREEN"){
                eat();
                PrimaryExp();
            }
            else if (tok === "BLURWORLD") {
                eat();
                PrimaryExp();
            }
            else if (tok === "VISIBLE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "STYLE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "BORDER") {
                eat();
                PrimaryExp();
            }
            else if (tok === "BORDERCOLOR") {
                eat();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
            }
            else if (tok === "BORDERSIZE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "BACKCOLOR") {
                eat();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
            }
            else if (tok === "FORECOLOR") {
                eat();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
                PrimaryExp();
            }
            else if (tok === "DISABLECOLOR") {
                eat();
                PrimaryExp();
            }
            else if (tok === "BACKGROUND") {
                eat();
                IsString();
            }
            else if (tok === "FADEAMOUNT") {
                eat();
                PrimaryExp();
            }
            else if (tok === "FADECLAMP") {
                eat();
                PrimaryExp();
            }
            else if (tok === "FACECYCLE") {
                eat();
                PrimaryExp();
            }
            else if (tok === "FADEINAMOUNT") {
                eat();
                PrimaryExp();
            }
            else if (tok === "FOCUSCOLOR") {
                eat();
                PrimaryExp();
            }
            else if (tok === "OWNERDRAW") {
                eat();
                PrimaryExp();
            } 
            else if (tok === "SOUNDLOOP"){
                eat();
                PrimaryExp();
            }
            else if (tok === "VISIBLE"){
                eat();
                PrimaryExp();
            }
            else if (tok === "OUTOFBOUNDSCLICK"){
                eat();
                newLine();
            }
            else if (tok === "POPUP"){
                eat();
                newLine();
            }
            
            else if(tok === "NEWLINE"){
                eat();
            }
            else{
                error("Unknown menu keyword.");
            }
        }

        function IsString(){
            while (tok === "NEWLINE") {
                newLine();
            }
            if(tok === "STRING"){
                eat();
            }
            else if(tok ===  "FLOAT"){
                eat();
            }
            else if(tok === "VAR"){
                eat();
            }
            while (tok === "NEWLINE") {
                newLine();
            }
        }

        function PrimaryExp(ignore){
            if(!ignore){
                while (tok === "NEWLINE") {
                    newLine();
                }
            }    
            if (tok === "FLOAT"){
                eat();
            }
            else if (tok === "OPENSMOOTHBRACKET"){
                eat();
                while (tok !== "CLOSEDSMOOTHBRACKET" && tok !== undefined){
                    Exp();
                }
                if (tok === "CLOSEDSMOOTHBRACKET"){
                    eat();
                }
                else{
                    error("Expected closed smooth bracket \")\".");
                }
            }else{
                error("Expected Float");
            }
        }

        function Exp(){
            while (tok === "NEWLINE") {
                newLine();
            }
            PrimaryExp();
            while (tok === "NEWLINE") {
                newLine();
            }
            if (tok === "OPERATOR") {
                eat();
                Exp();
            }
        }

        function eat(){
            index++;
            if(index > tokens.length-1){
                tok = undefined;
            }else{
                tok = tokens[index].token;
            }           
        }

        function newLine(){
            if (tok === "NEWLINE"){
                eat();
            }
        }

        function error(err){
            errors.push({
                token: tokens[index],
                error: err,
            });
            eat();
        }


    }

    return {
        parse: parse,
    };
}