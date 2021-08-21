---
id: final-form-api
title: API
sidebar_label: API
slug: /final-form/api
---


## `withFinalForm(component)`

Creates a final form wrapper for a component. Automatically unsubscribes and removes form when component unmounts. Configuration callbacks are all called bound to the riot component, so the lexical `this` will be the same as `onMounted`. The following configuration options are available:

| Param                                   | Type                              | Description                                                                                                                                       |
| --------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `component.formElement`                 | `function`                        | Required function that returns the form element to bind to                                                                                        |
| `component.onSubmit`                    | `function`                        | Final Form submit function. Prevents defeault behavior. If undefined, default DOM behavior will occur. |
| `component.initialValues`               | `object`                          | Final Form initialValues                                                                                                                          |
| `component.validate`                    | `function`                        | Form validate function                                                                                                                            |
| `component.onFormChange`                | [`onFormChange`](#onFormChange)   | Final Form listener that passes form state                                                                                                        |
| `component.onFormMutated`               | [`onFormMutated`](#onFormMutated) | MutationObserver that listens for changes in the HTML form                                                                                        |
| `component.formSubscriptions`           | `object`                          | Final Form subscriptions                                                                                                                          |
| `component.formConfig`                  | `object`                          | Final Form configs                                                                                                                                |
| `component.onFieldChange`               | [`onFieldChange`](#onFieldChange) | Callback ran when a field changes                                                                                                                 |
| `component.fieldSubscriptions`          | `object`                          | Final Form field subscriptions                                                                                                                    |
| `component.fieldConfigs`                | `object`                          | Final Form field configs                                                                                                                          |
| `component.manuallyInitializeFinalForm` | `boolean`                         | In case you want to manually initialize final form after some async event. [Read more about this flag](#manuallyInitializeFinalForm).             |

## onFormChange : `function`

Form change callback

| Param       | Type     | Description      |
| ----------- | -------- | ---------------- |
| `formState` | `object` | final form state |

## onFormMutated : `function`

Mutation observer callback

| Param                 | Type     | Description                                    |
| --------------------- | -------- | ---------------------------------------------- |
| `formMutationOptions` | `object` | Options to perform changes to final form state |

```html
<script>

    withFinalForm({

        // ...

        onFormMutated(formMutationOptions) {

            const {
                // Mutation observer callback
                mutationsList,
                observer,

                // Map of registrations (Map<HTMLElement, deregisterFunction()>)
                registrations,

                // Final form API
                form,

                // registerField(field: HTMLFormInputElement)
                registerField
            } = formMutationOptions;


            for (const mutations of mutationsList) {

                const {
                    addedNodes,
                    removedNodes
                } = mutation;

                for (const el of [...addedNodes]) {

                    if (/^(?:input|select|textarea)$/i.test(el.nodeName)) {

                        registerField(el);
                    }
                }

                for (const el of [...removedNodes]) {

                    if (registrations.has(el)) {

                        const unregister = registrations.get(el);
                        unregister();
                    }
                }
            }
        }

        // ...

    });
</script>
```

## onFieldChange : `function`

Field change callback

| Param      | Type          | Description            |
| ---------- | ------------- | ---------------------- |
| field      | `HTMLElement` | form field             |
| fieldState | `object`      | final form field state |
