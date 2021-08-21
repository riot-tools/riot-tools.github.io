---
id: meiosis-types
title: Types
sidebar_label: Types
slug: /meiosis/types
---

### `createStateStream`

```ts
declare type AnyState = Object | Array<any> | String | Map<any, any> | Set<any>;

declare const createStateStream: (initialState: AnyState, options?: ManagerOptions) => {
    stream: Manager;
    connect: ConnectFunction;
    update: (value: any) => Manager;
};
```

### `Manager`

```ts

declare type ManagerOptions = {
    /** How many states changes to keep in memory */
    statesToKeep?: number;
    /** Removes states after reading */
    flushOnRead?: boolean;
    /** Parent stream */
    parent?: Manager;
    /** Child stream should update parent stream */
    bidirectional?: boolean;
};

declare type ManagerState = {
    state?: any;
    currentState?: number | null;
    latestState?: number | null;
    parentListener?: Function | null;
    childListener?: Function | null;
};

declare type ModifierFunction = (value: any, state?: any, ignore?: symbol) => any;

declare class Manager {
    _options: ManagerOptions | null;
    private _id;
    private _sid;
    private _stateId;
    _internals: ManagerState;
    _states: Map<number, any> | null;
    _modifiers: Set<ModifierFunction> | null;
    _listeners: Set<Function> | null;
    _parent: Manager | null;
    constructor(initialState?: any, options?: ManagerOptions);
    private _setInternals;
    private _addState;
    private _notifyListeners;
    execs: number;
    update(value: any, flow?: Manager[]): this;
    modify(func: ModifierFunction): this;
    unmodify(func: ModifierFunction): this;
    listen(func: Function): this;
    unlisten(func: Function): this;
    states(): any[];
    state(): any;
    flushStates(): void;
    resetState(): void;
    private _stateStepper;
    prevState(): void;
    nextState(): void;
    clone(options?: ManagerOptions): Manager;
    private _setupClone;
}
```

### `ConnectFunction`

```ts
interface ConnectFunction {
    (component: RiotComponentExport): RiotComponentExport;
}
declare const connectFactory: (stateStream: Manager) => ConnectFunction;
```
