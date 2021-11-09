---
id: sak-queryable
title: Queryable
sidebar_label: Queryable
slug: /sak/queryable
---

This module adds functionality to riot components that allow them to set its own state to `isFetching` while an async call is being made. Any errors are recorded in the state's `fetchError` property.

The component state becomes the following:

```ts
type QueryableState<S> = S & {
    isFetching?: boolean,
    fetchError?: Error|null;
};
```

## Example 

```html
<something>
    
    <div if={ state.isFetching }>loading...</div>
    
    <div if={ state.fetchError }>
        { state.fetchError.message }
    </div>

    <script>

        import { makeQueryable } from '@riot-tools/sak';

        export default makeQueryable({

            // Makes the function names in the component fetchables
            makeFetching: ['onSubmit'],

            async onSubmit(values) {

                await api.post('/submit', values);
            },

            async someOtherFunction(check) {

                if (check) {

                    await this.setFetching(() => check());
                }

                // ... stuff
            },

            onMounted() {

                // for when you to make a function fetchable at a later time
                this.someFn = this.fnWillFetch(
                    () => { /* ... */ }
                );
            }
        })
    </script>
</something>
```

## `setFetching(fn: Function): Promise<any>`

Updates the component fetching state and reset fetch errors. Whatever `fn` returns will be spread onto the state.

```ts

makeQueryable({
    state: {
        test: 1
    },

    onMounted() {

        this.setFetching(async () => {

            const data = await api.get('/something');

            // state will update to
            // { data, test: 1, isFetching: false, fetchError: null }
            return { data };
        });
    }
})

```

## `fnWillFetch(fn: Function): Function`

Wraps a function with `setFetching()` so it becomes a fetchable function.

```ts
import { makeQueryable } from '@riot-tools/sak';

export default makeQueryable({

    onMounted() {
        this.someFn = this.fnWillFetch(
            () => { /* ... */ }
        );
    }
})
```

## `makeFetching: string[]`

Property you can add on a component which signals to wrap functions with `fnWillFetch()`.

```ts
export default makeQueryable({

    makeFetching: [
        'onSubmit',
        'onMounted',
    ],

    async onSubmit(values) {

        await api.post('/submit', values);
    },

    async onMounted() {
        
        const user = await api.get('/user');
        const payments = await api.get('/payments');
        const music = await api.get('/music');

        // merge to state
        return { user, payments, music }
    }
});
```


## Riot plugin

```ts
import { makeQueryable } from '@riot-tools/sak';
import { install } from 'riot';

install(component => makeQueryable(component));

```
