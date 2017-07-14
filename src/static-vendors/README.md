# This code is originally form https://github.com/text-mask/text-mask/tree/master/core/src  
The only thin i changed was adding some typings to get not ts errors

I consider this lib as complete if the cursor problem is fixed. 
At the moment i use some code of text-mask to get the first prototype working for character adjustment and cursor problem.


What i need is:
- Transform Function, the conform to mask as is   
  (maybe move the code for pipes also here)
- InputStateContext, A block that gather all needed information form the input

## Transform Function
The transform function should ba a pure function that takes a value (the value:any to transform) and an optional config object which could be used to compose the transform function, 

Currently the transform function is tightly coupled to the input states and previous values

The the current config takes (i cross the easy stuff out):
- previousConformedValue,
- ~~guide~~,
- ~~placeholderChar~~,
- ~~pipe~~,
- ~~placeholder~~,
- currentCaretPosition,
- ~~keepCharPositions~~

Now i will suggest a solution to the ```previousConformedValue``` property.
As it should be a pure function we could store this state in the scope of the function. If we need to reset this state we just create a new transform function

The ```currentCaretPosition``` property is a bit more tricky. 
But i guess it should be possible to calculate the current position from the two strings, previous and current value.
My first idea was to check the two strings and assume the current position of the cursor at the last character that changed in the string.

This two changes should be easy to achieve i guess.

## InputStateContext

The InputStateContext should be a pure context object that stores the needed input state and refocus the cursor.

What state do we need from the input?
- value = inputElement.value
- currentCaretPosition = inputElement.selectionEnd

It should also allow us to refocus the cursor to the right position. 

The state can be edited by just recreate a new Context object form the input.
The refocus cursor function should take.  

We need to adopt the focus cursor function a bit.

The params are as follow:
- previousConformedValue,
- previousPlaceholder,
- currentCaretPosition,
- conformedValue => result of conformToMask,
- rawValue => I'm not 100% sure, is it true that a couple of changes the rawValue is the previousConformedValue
- placeholderChar,
- placeholder,
- indexesOfPipedChars => im not sure what the pipe thing does.
- caretTrapIndexes


