const moo = require ('moo');
const fs = require("mz/fs");
let lexer = moo.compile({
    WS :    /[ \t]+/,
    comment: /\/\/.*?$/,
    number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lparen: '(',
    rparen: ')',
    lbrace: '{',
    rbrace: '}',
    fatarrow: '=>',
    assign: '=',
    add: '+',
    sub: '-',
    times: '*',
    divide: '/',
    identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
    coma: ',',
    //keyword: ['while', 'if', 'else', 'square'],
    NL: { match: /\n/, lineBreaks: true },
    
});

module.exports = lexer; 

async function main(){
    const code = (await fs.readFile("example.capz")).toString();
    lexer.reset(code);
    while (true){
        const token = lexer.next();
        if(!token){
            console.log("xD"+token);
            break;
        }
        console.log(token);
    }
}
