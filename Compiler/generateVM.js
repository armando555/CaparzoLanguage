const fs = require("mz/fs");
var count = 0;
var countVar = 0;
const mapeo = new Map();
const mapeo1 = new Map();
async function main(){
    const fileName = process.argv[2];
    // Create a Parser object from our grammar.
    if(!fileName){
        console.log("Ingese un archivo .ast");
        return;
    }
    const astJson = (await fs.readFile(fileName)).toString();
    const runtimeJs = (await fs.readFile("runtime.js")).toString();
    const statements = JSON.parse(astJson);
    const jsCode = generateJSForStatements(statements);
    const outputFileName = fileName.replace(".ast", ".vm");
    await fs.writeFile(outputFileName, jsCode);
    console.log(`Wrote ${outputFileName}.`);
}
function generateJSForStatements(statements){
    const lines = [];
    for (let statement of statements){
        countVarAssign(statement);
    }
    console.log("Hay "+countVar+" variables");
    lines.push("function Main.main "+countVar);
    for (let statement of statements){
        const line = generateJsForStatementOrExpr(statement);
        lines.push(line);
    }
    lines.push("push constant 0");
    lines.push("return");
    return lines.join("\n");
}
function countVarAssign(node){
    if (node.type === "var_assign") {
        const varName = node.var_name.value;
        if(!mapeo1.has(varName)){
            mapeo1.set(varName,count);
            countVar ++;
        }
        const jsExpr = generateJsForStatementOrExpr(node.value);
    }
}
function generateJsForStatementOrExpr(node) {
    if (node.type === "var_assign") {
        const varName = node.var_name.value;
        if(!mapeo.has(varName)){
            mapeo.set(varName,count);
            count ++;
        }
        const jsExpr = generateJsForStatementOrExpr(node.value);
        const js = `${jsExpr}\npop local ${mapeo.get(varName)}`;
        return js;
    } else if (node.type === "fun_call") {
        const funName = node.fun_name.value;
        if (funName === "printInt"){
            const argList = node.arguments.map((arg) => {
                return generateJsForStatementOrExpr(arg);
            });
            return `${argList}\ncall Output.printInt 1\npop temp 0`
        }
        if(funName === "add"){
            const argList = node.arguments.map((arg) => {
                return generateJsForStatementOrExpr(arg);
            });
            let valor="";
            for(let argumento of argList){
                valor+=`${argumento}\n`;
            }
            return `${valor}add`;
        }
        if(funName === "sub"){
            const argList = node.arguments.map((arg) => {
                return generateJsForStatementOrExpr(arg);
            });
            let valor="";
            for(let argumento of argList){
                valor+=`${argumento}\n`;
            }
            return `${valor}sub`;
        }
        if(funName === "multiply"){
            const argList = node.arguments.map((arg) => {
                return generateJsForStatementOrExpr(arg);
            });
            let valor="";
            for(let argumento of argList){
                valor+=`${argumento}\n`;
            }
            return `${valor}call Math.multiply 2`;
        }
        if(funName === "divide"){
            const argList = node.arguments.map((arg) => {
                return generateJsForStatementOrExpr(arg);
            });
            let valor="";
            for(let argumento of argList){
                valor+=`${argumento}\n`;
            }
            return `${valor}call Math.divide 2`;
        }
        if(funName === "square"){
            const argList = node.arguments.map((arg) => {
                return generateJsForStatementOrExpr(arg);
            });
            let valor="";
            for(let argumento of argList){
                valor+=`${argumento}\n`;
            }
            return `${valor}call Screen.drawRectangle 4\npop temp 0`;
        }
        if(funName === "line"){
            const argList = node.arguments.map((arg) => {
                return generateJsForStatementOrExpr(arg);
            });
            let valor="";
            for(let argumento of argList){
                valor+=`${argumento}\n`;
            }
            return `${valor}call Screen.drawLine 4\npop temp 0`;
        }
        if(funName === "circle"){
            const argList = node.arguments.map((arg) => {
                return generateJsForStatementOrExpr(arg);
            });
            let valor="";
            for(let argumento of argList){
                valor+=`${argumento}\n`;
            }
            return `${valor}call Screen.drawCircle 3\npop temp 0`;
        }
        const argList = node.arguments.map((arg) => {
            return generateJsForStatementOrExpr(arg);
        }).join(",");
        return `${funName}(${argList})`;
    } else if (node.type === "string") {
        return node.value;
    } else if (node.type === "number") {
        return `push constant ${node.value}`;
    } else if (node.type === "identifier") {
        return `push local ${mapeo.get(node.value)}`;
    }else {
        throw new Error(`Unhandled AST node type ${node.type}`);
    }
}
main().catch(err=> console.log(err.stack));