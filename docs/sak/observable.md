---
id: sak-observable
title: Observable
sidebar_label: Observable
slug: /sak/observable
---

**Credits:** This module is a reimplementation of [Riot Observable](https://github.com/riot/observable) made to support typings, OOP, nested observers, and debugging utility.

The idea behind this refactor is to add a global event emitter to your application and be able to create child-observers that can have their own namespaced events. You can also wrap an existing object and make it observable; it will have the exact same API.

## Example

```js
import { Observable } from '@riot-tools/sak';

const observer = new Observable();

// or

const somethingToMakeAnObserver = {};
const observer = new Observable(somethingToMakeAnObserver);

// with configurable options
const observer = new Observable(null, {

    // Can spy on the observer for debugging
    spy: ({ fn, event, listener, context, args }) => {

        if (fn === 'trigger') {

            console.log(event, args, context);
        }
    }
});

observer.on(ev, fn);
observer.one(ev, fn);
observer.off(ev, fn);
observer.trigger(ev, fn);
```

## Child observers

Once an observer is instantiated, you can observe other components. This gives your component a limited observable API that ties into its parent observer.

```js
const modal = {};

// those events can have namespaced prefixes
observer.observe(modal, 'modal');

observer.on('modal-open', () => {});

// Because modal is namespaced, it will automatically prefix the event name with `modal`
modal.trigger('open');

// destroy when done;
modal.cleanup();
```

## Riot plugin

You can install your observer onto your components as a plugin via `riot.install`.  Any listeners that are attached via `this.on` or `this.one` are automatically cleaned up before a comonent unmounts.

```js
Riot.install(component => observer.install(component));
```

`component.riot`

```html

<something>

    ...

    <script>

        export default {

            onClick() {

                this.trigger('something-clicked');
            },

            onMounted() {

                // will be automatically cleaned up before unmount
                this.on('user-fetched', (user) => this.update({ user }));

                fetchUser();
            }
        }
    </script>
</something>
```

You can also directly install the observer API on a specific component using the same function

```html
<script>

    import { observer } from './events';

    export default observer.install({

        onBeforeMount: () => {}
    });
</script>
```
