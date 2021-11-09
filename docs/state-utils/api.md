---
id: state-utils-api
title: API
sidebar_label: API
slug: /state-utils/api
---


## `clone(value: T): T`

Deep clones objects, arrays, maps and sets

```ts

const clonedObject = clone({ x: true });
const clonedArr = clone([{ x: true }, { y: true }]);
const clonedMap = clone(new Map([['test', true]]));
const clonedSet = clone(new Set([1, 2, '1', '2']));

```

## `deepEqual(a: any, b: any): boolean`

Recursively checks if there are changes in the current structure. Returns immediately after detecting a single change.

```ts

const eqObj = deepEqual({ y: true }, { y: false });
// > false

const eqArr = deepEqual([{ y: true }], [{ y: false }]);
// > false

const eqMap = deepEqual(
    new Map([['test', [{ y: true  }]]]), 
    new Map([['test', [{ y: false }]]])
);
// > false

const eqSet = deepEqual(
    new Set(['test', 1]), 
    new Set(['test', 2])
);
// > false

```

## `merge(a: T, b: U, options?: MergeOptions): T & U`

Deep merges objects, arrays, maps and sets. Merging can passed options that dictate how arrays and sets are handled. Defaults may also be set.

```ts

const eqObj = merge({ y: true }, { y: false });
// { y: false }

const eqArr = merge([{ y: true }], [{ y: false }]);
// [{ y: true }, { y: false }]


const eqMap = merge(
    new Map([['test', [{ y: true  }]]]), 
    new Map([['test', [{ y: false }]]])
);
// > Map(1) { 'test' => [ { y: false } ] }

const eqSet = merge(
    new Set(['test', 1]), 
    new Set(['test', 2])
);
// > Set(2) { 'test', 1, 2 }

```

### Merge arrays

```ts

const x = { arr: [1, 2] };
const y = { arr: [3, 4] };

merge(x, y, { mergeArrays: false });
// > { arr: [3, 4] }

merge(x, y, { mergeArrays: true });
// > { arr: [1, 2, 3, 4] }

```

### Merge sets

```ts

const x = { _set: new Set([1, 2]) };
const y = { _set: new Set([3, 4]) };

merge(x, y, { mergeSets: false });
// > { _set: Set(2) { 3, 4 } }

merge(x, y, { mergeSets: true });
// > { _set: Set(2) { 1, 2, 3, 4 } }

```

### Override defaults

Original defaults:

```ts
merge._defaults = {

    mergeArrays: true,
    mergeSets: true
};
```

Override:

```ts

merge.setDefaults({

    mergeArrays: false,
    mergeSets: false
});

```
