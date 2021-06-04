const nearley = require("nearley");
const grammar = require("./capz.js");
const fs = require("mz/fs");

async function main() {
    const fileName = process.argv[2];
    // Create a Parser object from our grammar.
    if(!fileName){
        console.log("Ingese un archivo .capz");
        return;
    }
    const code = (await fs.readFile(fileName)).toString();
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    // Parse something!
    parser.feed(code);
    if (parser.results.length > 1){
        console.log("Error: ambigous grammar detected");
    }else if(parser.results.length == 1){
        const ast = parser.results[0];
        const outputFileName = fileName.replace (".capz", ".ast");
        await fs.writeFile(outputFileName, JSON.stringify(ast, null, "  "));
        console.log(`Wrote ${outputFileName}.`);
    }else{
        console.log(parser.results.length);
        console.log("Error: No parse found.");
    }
    // parser.results is an array of possible parsings.
    //console.log(parser.results);
}
main().catch(err=> console.log(err.stack));
