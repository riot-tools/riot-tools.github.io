---
id: sak-observable
title: Observable
sidebar_label: Observable
slug: /sak/observable
---


## TODO

## Observable

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

Observer other object-like components wrapping the same observer

```js
const modal = {};

// those events can have prefixes
observer.observe(modal, 'modal');

observer.on('modal-open', () => {});

modal.trigger('open');

// destroy when done;
modal.cleanup();
```

Install on riot components

```js
Riot.install(observer.install);
```

or directly

```html
<script>

    import { observer } from './events';

    export default observer.install({

        onBeforeMount: () => {}
    });
</script>
```
