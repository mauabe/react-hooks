//exporing the function declaration vs, arrow funciotn and the 'this' value attached.

// copy and paste into index.js and exab=mine the result in the console



function createObject (){
  console.log('createObject function original this: ', this);

  const func = function () {
    console.log('functionExpression this is: ', this)
  }

  return {
    arrowFunction: () => {
      console.log('arrowFunction this is: ', this);
    },
    functionKeywordFunction: function() {
      console.log('functionKeyword this is: ', this);
    },
    functionExpression: func
  }
}

const obj = createObject();
console.log('result of invoking createObject on obj: ', obj);

obj.arrowFunction();
obj.functionKeywordFunction();
obj.functionExpression();

/*
Function declaration bind the contents of this 
Arrow Function does not bind this
Funciton expression works as function declaration


In JavaScript execution there is Context (which ECMA 5 breaks into LexicalEnvironment, VariableEnvironment and ThisBinding) and Process (a set of statements to be invoked in sequence). Declarations contribute to the VariableEnvironment when the execution scope is entered. They are distinct from Statements (such as return) and are not subject to their rules of process.
*/
