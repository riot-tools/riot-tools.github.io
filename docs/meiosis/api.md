---
id: meiosis-api
title: API
sidebar_label: API
slug: /meiosis/api
---

```js
const {
    createStream,
    connect,
    update,
    getState,
    getStream,
    utils
} = 'riot-meiosis';
```


### `createStream(reducer, initialState)`

Simply put, this function returns an [Erre stream](https://github.com/GianlucaGuarini/erre#api) and sets your global application state. Both `stream` and `state` are only ever defined once, so you cannot run this function twice.

Both `reducer()` and `initialState` are required. You can set `initialState` to anything except `null` or `undefined`.

* `reducer` *function, required* - Reducer that transforms incoming payloads into global state
* `initialState` *any, required* - Initial app state. Can be set to anything except `null` or `undefined`.


### `connect(mapToState, mapToComponent)(MyComponent)`

Decorator for implement state management on a Riot component. Application state is mapped to Component state, stream updates generate component updates only when there are changes to the relevant state, and component cleans up and  stops listening to state changes `onBeforeUnmount`.

* `mapToState(appState, ownState, ownProps)` *function, required* - Function to reduce application state to relevant app state
* `mapToComponent`: Optional
    - *object* - Map an object to component
    - *function* - `(ownProps, ownState) => ({})` - Map a function's return value to component. Receives component props and state. Should return an object.

**Returns**

Function to pass your component into. The result value is used to `export default` inside your Riot component and have a component that is conditionally connected to global state.

### `update(newState)`

Pushes an update through your reducer. This is a helper for `getStream().push(newState)`


### `getState()`

Returns the application state.


### `getStream()`

Returns the application state stream.
