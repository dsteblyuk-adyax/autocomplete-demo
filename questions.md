
## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

PureComponent is a subclass of Component which has an optimized shouldComponentUpdate (when a component is about to update) method. It makes a shallow comparison of the component's current props and state with its next props and state. You should take into account, that PureComponent only performs a shallow comparison of props and state, so if your props or state contain nested objects or arrays, PureComponent may not behave as you expected.

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Context is used to communicate with deeply contained components. For example, a root component defines a theme, and any component in the component tree might (or might not) be interested in this information. shouldComponentUpdate on the other hand help with re-rendering of a part of the component tree (including children), for example if the props or state of a component are not modified in a meaningful way. As far as the component can tell. But this might accidentally block context propagation…

## 3. Describe 3 ways to pass information from a component to its PAREN

1. Callback Functions. The parent component passes a function down to the child component as a prop. The child component can then call this function to pass data back up to the parent
2. Context. The parent component defines a context object and passes it down to child components. The child components can then access the context using the Consumer component or the useContext hook.
3. React Refs. If you need to pass information from a child component to a parent component without rendering anything, you can use React refs. Create a ref in the parent component and pass it down to the child component.


## 4. Give 2 ways to prevent components from re-rendering

Use shouldComponentUpdate or React.memo().
PureComponent in class component.
Use useMemo() or useCallback() hooks in a functional component

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

`<Fragment>` or `<>...</>` syntax, allows us to group a list of children elements without adding an extra node to the DOM. In older versions of React, returning an array of elements from a component was not supported, so in this case you can get an error and break you app.

## 6. Give 3 examples of the HOC pattern

1. Authentication HOC that adds authentication to a component by checking if the user is logged in and redirecting to a login page if not. This can be useful for protecting certain parts of an application that require authentication.
2. Styling HOC that adds styles to a component, such as adding a border or changing the background color. This can be useful for creating reusable styles across multiple components.
3. Performance HOC that adds performance optimization to a component by implementing shouldComponentUpdate lifecycle method, comparing the previous and new props and state, and preventing unnecessary updates. This can be useful for optimizing components that render frequently or have expensive render methods.

## 7. What's the difference in handling exceptions in promises, callbacks and async...await

The main difference between these approaches is the way the code is written. Promises use the .then() and .catch() methods to handle results and errors. Callbacks pass errors as the first argument to the callback function. async/await uses a try/catch block to handle exceptions.

## 8. How many arguments does setState take and why is it async.

setState(nextState, callback?). Where nextState is either an object or a function.
And the optional callback, which will be called after the update is committed. The setState() method is asynchronous because React batches multiple state updates together and applies them in a single batch for performance reasons ( this prevents unnecessary re-renders).

## 9. List the steps needed to migrate a Class to Function Component.

1.	Remove the render() method. In function components it is not required.
2.	Replace this.state with useState, this.setState() with useState() or useReducer().
3.	Replace this.props with function arguments.
4.	Remove lifecycle methods. In FC you can use the useEffect() hook to handle side effects and lifecycle methods.
5.	Remove constructor().
6.	Return the JSX markup. In FC, you need to return the JSX markup that represents the component's UI.

## 10. List a few ways styles can be used with components

1. Inline styles, using the style attribute.
2. Import the external stylesheet and apply the class name to the component.
3. CSS-in-JS.
4. CSS Modules

## 11. How to render an HTML string coming from the server

Via a dangerouslySetInnerHTML attribute. You should validate the HTML string before rendering to prevent cross-site scripting (XSS)










