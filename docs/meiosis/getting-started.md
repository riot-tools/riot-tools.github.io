---
id: meiosis-getting-started
title: Getting Started
sidebar_label: Getting Started
slug: /meiosis/getting-started
---

## What is meiosis?

Meiosis is a design pattern for managing application state using streams. Riot meiosis is an implementation of that pattern for Riot. [Learn more about meiosis to understand the concept](https://meiosis.js.org/).

## Key things to note

- Implements a stream mechanism to update state
- Comes with a `connect` function to wrap stream functionality
- Components attempt to update when updates are dispatched
- Prevent component updates if state has not changed
- Stream listeners are destroyed when `onBeforeUnmount`

## Usage

```sh
npm i --save @riot-tools/meiosis
```

`./appState.js`

```js
import createStateStream from '@riot-tools/meiosis';

// Set your initial state.
// State is only mutable via manager API.
const state = {
    initial: true,
    isNew: true,
    mutable: false,
    nested: {
        hasPasta: true
    }
};

// Root state reducer
const reducer = (newState, oldState) => ({
    ...oldState,
    ...newState
});

// Create global app state instance
const appState = createStateStream(state);

// Extract the state stream
const { stream } = appState;

stream.addReducer(reducer);

stream.dispatch({
    initial: false,
    isNew: false
});

// Gets an immutable clone of the current state
console.log(stream.state());
// > {
//     initial: false,
//     isNew: false,
//     mutable: false,
//     nested: {
//         hasPasta: true
//     }
// }

export default appState;
```

In your `.riot` files:

```html

<myComponent>

    <p if={ hasPasta }>I have pasta!</p>

    <script>

        import { connect } from './appState';
        import myActions from './actions';

        const mapToState = (appState, ownState, ownProps) => ({
            ...ownState,
            ...appState.nested
        });

        // Optional mapping of functions or objects to component
        const mapToComponent = myActions;
        // OR
        const mapToComponent = (ownProps, ownState) => myActions;

        const component = {

            onBeforeMount() {

                // connect will respect original onBeforeMount
                this.state = {
                    lala: true
                }
            },

            onMounted() {

                // Component will have access to dispatch from lexical this
                this.dispatch({ myComponentMounted: true });
            }
        }

        export default connect(mapToState)(component);
        // OR
        export default connect(mapToState, mapToComponent)(component);
    </script>
</myComponent>
```
