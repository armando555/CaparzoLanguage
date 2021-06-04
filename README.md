# CaparzoLanguage
This is a final project for Organización de computadores at EAFIT University. 

To use this toy language you have to install Node Js and run the command "npm install" to install the required modules.

Now this language can compile these grammar rules.
# Note: this language doesn't have loops and doesn't work with string, only works with numbers ¡¡¡¡PLEASE NAME THA FILE "Main.capz"!!!!

to declare a variable and initialize it:

var_name => expression

expression=> fun_call| number | identifier
# Math functions
add(num,num2)
sub(num,num2)
multiply(num,num2)
divide(num,num2)
# Draw functions
to draw a rectangle, line and circle
rectangle(x1,y1,x2,y2)
line(x1,y1,x2,y2)
circle(x,y,r)

# Example "Main.capz"
num = 50
num1 = add(125,sub(num,25))
printInt(num1)
circle(20,30,5)

# How to ejecute the compiler
after run npm install now you can run
node run.js Main.capz

The console will print 

Wrote Main.ast.
Wrote Main.vm.

The Main.vm can be use in the VMEmulator of Nandtotetris
