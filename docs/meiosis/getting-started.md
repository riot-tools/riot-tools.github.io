---
id: meiosis-getting-started
title: Getting Started
sidebar_label: Getting Started
slug: /meiosis/getting-started
---

## What is meiosis?

Meiosis is a design pattern for managing application state using streams. Riot meiosis is an implementation of that pattern for Riot using Erre. [Learn more about meiosis to understand the concept](http://RiotMeiosis.js.org).

Key things to note:
- Implements a stream to update state
- Comes with a `connect` function to wrap stream functionality
- Components attempt to update when stream is pushed to
- Prevent component updates if state has not changed
- Stream listeners are destroyed when `onBeforeUnmount`

## Usage

```
npm i -D riot-meiosis
```

```js
import {
    connect,
    getState,
    createStream,
    getStream,
} from 'riot-meiosis';

// Set your initial state.
// State is only mutable via manager API.
const state = {
    initial: true,
    isNew: true,
    mutable: false,
    nested: {
        hasCandy: true
    }
};

// Root state reducer
const reducer = (newState, oldState) => ({
    ...oldState,
    ...newState
});

// Create global application stream (can only run once)
const stream = createStream(reducer, stub.state);

// stream is simply an Erre stream
stream.push({
    initial: false,
    isNew: false
});

// Gets an immutable clone of the current state
console.log(getState());
// > {
//     initial: false,
//     isNew: false,
//     mutable: false,
//     nested: {
//         hasCandy: true
//     }
// }

```

In your `.riot` files:
```html

<myComponent>

    <p if={ hasCandy }>I have candy!</p>

    <script>

        import { connect } from 'riot-meiosis';
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
            }
        }

        export default connect(mapToState)(component);
        // OR
        export default connect(mapToState, mapToComponent)(component);
    </script>
</myComponent>
```

#### In-browser compilation

```html
<body>

    <samplecomponent></samplecomponent>
    <rmdevtools debounce="0"></rmdevtools>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/riot/5.2.0/riot+compiler.min.js"></script>

    <script src="./dist/umd.js"></script>

    <script>
        const state = {
            buttonclicked: 0,
            someInput: '',
            items: [
                { text: 'try riot meioses', checked: true },
                { text: 'try rmdevtools', checked: false }
            ]
        };


        const reducer = (newState, oldState) => ({
            ...oldState,
            ...newState
        });

        RiotMeiosis.createStream(reducer, state);

        (async function main() {
            await riot.compile();

            riot.mount('samplecomponent');

            await riot.register(
                'rmdevtools',
                RiotMeiosis.RMDevTools(RiotMeiosis)
            );

            riot.mount('rmdevtools');

          }())

    </script>
</body>
```