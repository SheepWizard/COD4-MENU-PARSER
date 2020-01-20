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

                                    if (tok === "ACTION" || tok === "DOUBLECLICK" || tok === "FOCUSDVAR" || tok === "LEAVEFOCUS" || tok === "MOUSEENTER" || tok === "MOUSEENTERTEXT" || tok === "MOUSEEXIT" || tok === "MOUSEEXITTEXT" || tok === "ONFOCUS"){
                                        eat();
                                        while (tok === "NEWLINE") {
                                            newLine();
                                        }
                                        if (tok === "OPENBRACKET") {
                                            eat();
                                            newLine();
                                            while (tok !== "CLOSEBRACKET" && tok !== undefined) {
                                                scriptActions();
                                            }
                                            if (tok === "CLOSEBRACKET") {
                                                eat();
                                                newLine();
                                            } else {
                                                error("Expected close bracket \"}\".");
                                            }
                                        } else {
                                            error("Expected open bracket \"{\".");
                                        }
                                    }
                                    else if (tok === "EXECKEY") {
                                        eat();
                                        while (tok === "NEWLINE") {
                                            newLine();
                                        }
                                        IsString();
                                        if (tok === "OPENBRACKET") {
                                            eat();
                                            newLine();
                                            while (tok !== "CLOSEBRACKET" && tok !== undefined) {
                                                scriptActions();
                                            }
                                            if (tok === "CLOSEBRACKET") {
                                                eat();
                                                newLine();
                                            } else {
                                                error("Expected close bracket \"}\".");
                                            }
                                        } else {
                                            error("Expected open bracket \"{\".");
                                        }

                                    }
                                    else if (tok === "EXECKEYINT") {
                                        eat();
                                        while (tok === "NEWLINE") {
                                            newLine();
                                        }
                                        PrimaryExp();
                                        if (tok === "OPENBRACKET") {
                                            eat();
                                            newLine();
                                            while (tok !== "CLOSEBRACKET" && tok !== undefined) {
                                                scriptActions();
                                            }
                                            if (tok === "CLOSEBRACKET") {
                                                eat();
                                                newLine();
                                            } else {
                                                error("Expected close bracket \"}\".");
                                            }
                                        } else {
                                            error("Expected open bracket \"{\".");
                                        }

                                    }else{
                                        ItemStatement();
                                    }   

                                    
                                    
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
                        }
                        else if (tok === "ONCLOSE" || tok === "ONESC" || tok === "ONOPEN"){
                            eat();
                            while (tok === "NEWLINE") {
                                newLine();
                            }
                            if (tok === "OPENBRACKET"){
                                eat();
                                newLine();
                                while (tok !== "CLOSEBRACKET" && tok !== undefined) {
                                    scriptActions();
                                }
                                if (tok === "CLOSEBRACKET") {
                                    eat();
                                    newLine();
                                } else {
                                    error("Expected close bracket \"}\".");
                                }
                            }else {
                                error("Expected open bracket \"{\".");
                            }
                        }
                        else if(tok === "EXECKEY"){
                            eat();
                            while (tok === "NEWLINE") {
                                newLine();
                            }
                            IsString();
                            if(tok === "OPENBRACKET"){
                                eat();
                                newLine();
                                while (tok !== "CLOSEBRACKET" && tok !== undefined) {
                                    scriptActions();
                                }
                                if (tok === "CLOSEBRACKET") {
                                    eat();
                                    newLine();
                                } else {
                                    error("Expected close bracket \"}\".");
                                }
                            }else {
                                error("Expected open bracket \"{\".");
                            }

                        }
                        else if (tok === "EXECKEYINT"){
                            eat();
                            while (tok === "NEWLINE") {
                                newLine();
                            }
                            PrimaryExp();
                            if (tok === "OPENBRACKET") {
                                eat();
                                newLine();
                                while (tok !== "CLOSEBRACKET" && tok !== undefined) {
                                    scriptActions();
                                }
                                if (tok === "CLOSEBRACKET") {
                                    eat();
                                    newLine();
                                } else {
                                    error("Expected close bracket \"}\".");
                                }
                            } else {
                                error("Expected open bracket \"{\".");
                            }
                        }
                        else{
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

        function scriptActions(){
            if (tok === "CLOSE"){
                eat();
                IsString();
            }
            else if (tok === "CLOSEFORGAMETYPE"){
                eat();
                IsString();
            }
            else if(tok === "EXEC"){
                eat();
                IsString();
            }
    
            else if (tok === "NEWLINE") {
                eat();
            }
            else {
                error("Unknown item keyword.");
            }

        }

        function ItemStatement(){
            //itemdef options

            switch(tok){
                case "NAME":
                case "BACKGROUND":
                case "FOCUSSOUND":
                case "GROUP":
                case "TEXT":
                    eat();
                    IsString();
                    break;
                case "RECT":
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
                    break;
                case "ALIGN":
                case "BORDER":
                case "BORDERSIZE":
                case "ELEMENTHEIGHT":
                case "ELEMENTTYPE":
                case "ELEMENTWIDTH":
                case "FEEDER":
                case "MAXCHARS":
                case "MAXPAINTCHARS":
                case "NOTSELECTABLE":
                case "SPECIAL":
                case "STYLE": 
                case "TEXTALIGN":
                case "TEXTALIGNX":
                case "TEXTALIGNY":
                case "TEXTFILE":
                case "TEXTFONT":
                case "TEXTSAVEGAME":
                case "TEXTSCALE":
                case "TEXTSTYLE":
                case "TYPE":
                case "VISIBLE":

                    eat();
                    PrimaryExp();
                    break;
                case "BACKCOLOR":
                case "BORDERCOLOR":
                case "FORECOLOR":
                case "OUTLINECOLOR":
                    eat();
                    PrimaryExp();
                    PrimaryExp();
                    PrimaryExp();
                    PrimaryExp();
                    break;
                case "MAXCHARSGOTONEXT":
                    eat();
                    newLine()
                    break;
                case "ORIGIN":
                    eat();
                    PrimaryExp();
                    PrimaryExp();
                    break;
                case "AUTOWRAPPED":
                case "DECORATION":
                case "HORIZONTALSCROLL":
                case "LEGACYSPLITSCREENSCALE":
                    eat();
                    newLine();
                    break;
                case "NEWLINE":
                    eat();
                    break;
                default:
                    error("Unknown item keyword.");
                    break; 
            }
        }

        function MenuStatement(){
            //menu def options
            switch(tok){
                case "NAME":
                case "BACKGROUND":
                case "SOUNDLOOP":
                    eat();
                    IsString();
                    break;
                case "FULLSCREEN":
                case "BLURWORLD":
                case "VISIBLE":
                case "STYLE":
                case "BORDER":
                case "BORDERSIZE":
                case "DISABLECOLOR":
                case "FADEAMOUNT":
                case "FADECLAMP":
                case "FACECYCLE":
                case "FADEINAMOUNT":
                case "FOCUSCOLOR":
                case "OWNERDRAW":
                case "VISIBLE":
                case "FACECYCLE":
                case "FACECYCLE":
                    eat();
                    PrimaryExp();
                    break;
                case "RECT":
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
                    break;
                case "BORDERCOLOR":
                case "BACKCOLOR":
                case "FORECOLOR":
                    eat();
                    PrimaryExp();
                    PrimaryExp();
                    PrimaryExp();
                    PrimaryExp();
                    break;
                case "OUTOFBOUNDSCLICK":
                case "POPUP":
                    eat();
                    newLine();
                    break;
                case "NEWLINE":
                    eat();
                    break;
                default:
                    error("Unknown menu keyword.");
                    break; 
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