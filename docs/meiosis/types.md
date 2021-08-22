---
id: meiosis-types
title: Types
sidebar_label: Types
slug: /meiosis/types
---

## Library

```ts
declare type AnyState = Object | Array<any> | String | Map<any, any> | Set<any>;

declare class RiotMeiosis {
    stream: StateManager;
    connect: ConnectFunction;
    dispatch: (value: any) => any;
    constructor(initialState: AnyState, options?: StateManagerOptions);
}

declare type StateManagerOptions = {

    /** How many states changes to keep in memory */
    statesToKeep?: number;

    /** Removes states after reading */
    flushOnRead?: boolean;

    /** Parent stream */
    parent?: StateManager;

    /** Child stream should update parent stream */
    bidirectional?: boolean;
};

declare type StateManagerState = {
    state?: any;
    currentState?: number | null;
    latestState?: number | null;
    parentListener?: Function | null;
    childListener?: Function | null;
};

declare type ReducerFunction = (value: any, state?: any, ignore?: symbol) => any;

declare class StateManager {
    _options: StateManagerOptions | null;
    _internals: StateManagerState;
    _states: Map<number, any> | null;
    _reducers: Set<ReducerFunction> | null;
    _listeners: Set<Function> | null;
    _parent: StateManager | null;
    constructor(initialState?: any, options?: StateManagerOptions);
    dispatch(value: any, flow?: StateManager[]): this;
    addReducer(...fns: ReducerFunction[]): this;
    removeReducer(...fns: ReducerFunction[]): this;
    addListener(...fns: Function[]): this;
    removeListener(...fns: Function[]): this;
    states(): any[];
    state(): any;
    flushStates(): void;
    resetState(): void;
    goToState(sid: number): void;
    prevState(): void;
    nextState(): void;
    clone(options?: StateManagerOptions): StateManager;
}

interface ConnectFunction {
    (component: RiotComponentExport): RiotComponentExport;
}

declare const connectFactory: (stateStream: StateManager) => ConnectFunction;
```

## Utils

```ts

declare const isFunctionOrObject: (a: Function | Object) => boolean;

declare const isUndefined: (val: any) => boolean;

declare const assertFunction: (msg: String, func: Function) => void;

declare const definePrivateProperties: (target: object, props: object) => void;

declare const definePrivateGetters: (target: object, props: object) => void;

declare const deepFreeze: (target: object) => void;

declare const generateId: () => string;
```