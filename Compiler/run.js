const fs = require("mz/fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function main(){
    const fileName = process.argv[2];
    // Create a Parser object from our grammar.
    if(!fileName){
        console.log("Ingese un archivo .capz");
        return;
    }
    const astFilename = fileName.replace(".capz", ".ast");
    const jsFilename = fileName.replace(".capz", ".js");
    await myExec(`node parse.js ${fileName}`);
    await myExec(`node generate.js ${astFilename}`);
    await myExec(`node ${jsFilename}`);
    
}
async function myExec(command){
    const output = await exec(command);
    if(output.stdout){
        process.stdout.write(output.stdout);
    }
    if(output.stderr){
        process.stderr.write(output.stderr);
    }
}

main().catch(err=> console.log(err.stack));