---
id: meiosis-api
title: API
sidebar_label: API
slug: /meiosis/api
---

```js

import { RiotMeiosis } from '@riot-tools/meiosis';

const stateManager = new RiotMeiosis(intialState, {
    statesToKeep?: 5,
    flushOnRead?: false
});

const {
    connect,
    stream,
    dispatch
} = stateManager;

const {
    dispatch,
    addReducer,
    removeReducer,
    addListener,
    removeListener,
    states,
    state,
    flushStates,
    resetState,
    goToState,
    prevState,
    nextState,
    clone
} = stream;

```

### `new RiotMeiosis(initialState: AnyState, options: StateManagerOptions)`

Creates an instance of an application state. Instantiates a class with with `connect`, `stream,` and `dispatch`.

### `stateManager.stream: StateManager`

A state manager instance. This is what you use throughout your app to add listeners, reducers, and dispatch updated. See [Stream API](#stream-api).

### `stateManager.dispatch(value)`

A wrapper for `stateManager.stream.dispatch`.


```html
<samplecomponent>

    <button onclick={ onClick }>ClickMe</button>

    <script>

        import { dispatch } from '../utils/store';

        const component = {

            onClick() {

                dispatch({ clicked: true });
            }
        };

    </script>
</samplecomponent>
```


### `stateManager.connect(mapToState: Function, mapToComponent: Function|Object)(RiotComponent)`

HOC that maps application state into component state. It listens for changes between the mapped state and triggers updates only if there are any changes. Optionally can map actions to the component via an object or function.

> Connect HOC will give `this.dispatch()` function to your component making it simpler to update application state


```html
<samplecomponent>

    ...

    <script>

        import { connect } from '../utils/store';

        const component = {

            onBeforeMount() { /* ... */}
        };

        const mapToState = (appState, ownState, ownProps) => ({
            ...ownState,
            data: ownProps.dogs ? appState.dogs : appState.cats
        });

        return connect(mapToState)(component);

    </script>
</samplecomponent>
```

## Stream API

### `dispatch(update: any)`

Pushes an update to the state.

### `addReducer(...Function[])`

Adds a function that modifies the dispatched state before registering it as a new state item. You can add as many of these as you want.

```js

const usersReducer = function ({ users }, currentState, ignore) {

    if (!users) {
        return ignore;
    }

    currentState.users = {
        ...currentState.users,
        ...users
    };

    return currentState
};

const dataReducer = function ({ data }, currentState, ignore) {

    if (!data) {
        return ignore
    }

    currentState.data = someWeirdProcessing(data, currentState.data);

    return currentState;
};

stream.addReducer(
    usersReducer,
    dataReducer
);
```

### `removeReducer(...Function[])`

Removes reducers from the state stream. They will not longer modify the state once they are removed.

```js
stream.removeReducer(
    usersReducer,
    dataReducer
);
```

### `addListener(...Function[])`

Adds a listener that runs when updates are dispatched

```js
const someListener = (nextState, prevState) => {

    doSomething(nextState);
};

stream.addListener(
    someListener
);
```

### `removeListener(...Function[])`

Removes any attached listeners

```js
stream.removeListener(
    someListener
);
```

### `states()`

Returns an history of all saved states, if any are being kept. The amount returned is affect by `statesToKeep` and `flushOnRead` options.

### `state(): any`

Returns current state

### `flushStates()`

Cleans all stored states, except current state. State is reset if it wasn't on the current state.

### `resetState()`

Sets the current state back to whatever it was. Useful for where stepping forward and backwards between states and then returning to your original state.

### `goToState(stateID)`

Travel to a particular state. Does not work with `flushOnRead` option.

### `prevState()`

Go back 1 state. Does not work with `flushOnRead` option.

### `nextState()`

Go forward 1 state. Does not work with `flushOnRead` option.

### `clone(StateManagerOptions): StateManager`

Creates a child instance of manager. Receives parent's reducers and will update whever parent is updated. Adding reducers and listeners will not affect parent manager instance.

```js

const clone = stream.clone({ bidirectional: true }); // parent receives updates from child


stream.dispatch({ childShouldReceive: true });

expect(clone.state().childShouldReceive).to.be.true();

clone.dispatch({ parentShouldReceive: true });

expect(stream.state().parentShouldReceive).to.be.true();
```
