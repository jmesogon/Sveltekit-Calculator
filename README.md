# Calculator App Using Sveltekit

This app uses REST API to compute the expression and retrieve the answer. Also, the app does not use eval and Function

The user can click on the buttons to generate an expression that will be displayed. Every part of expression (number, decimal, operation) is stored in an array. After clicking equals (=), the array will be send to server.ts using API fetch POST method to process.

In order to process the equation, the app will loop until the array is down to index 0. The app will first check if there is multiplication and division (MDAS) to evaluate. If M and D of MDAS is present, the app will get the position/index of the operation which will be stored in a variable x, and then evaluate it first by getting the numbers before and after the operation and multiplying/ dividing them. after that, the app will splice the array and replace the x - 1 index of array as the result and then removing the x and x + 1 index. The app will continue to do this until M and D operations in MDAS is evaluated. And it will do the same thing to A and S operation. After evaluating the entire array, the result will be sent back to page and will be displayed. 
