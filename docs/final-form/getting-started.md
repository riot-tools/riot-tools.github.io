---
id: final-form-getting-started
title: Getting Started
sidebar_label: Getting Started
slug: /final-form/getting-started
---

If you don't know what [Final Form](https://final-form.org/) is, you are either probably a masochist, or have never dealt with forms on web pages. If you come from the world of React, you might be familiar with this tool already. It is similar to Formik and React Hook Form.

To sum it up, it is a framework-agnostic, minimalistic form validation library. For us it was a no-brainer to implement this for Riot. You should understand Final Form first before you attempt to use this tool with Riot so you are not confused as to the implementation.

## Usage

```sh
npm i -S @riot-tools/final-form
```

```html
<some-form>

    <form>

        <div class="field">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" />
            <div class="error"></div>
        </div>
        <div class="field">
            <label for="age">Age</label>
            <input type="text" id="age" name="age" />
            <div class="error"></div>
        </div>

        <div class="field">
            <label for="address">Address</label>
            <input type="text" id="address" name="address" />
            <div class="error"></div>
        </div>

        <div class="field">
            <label for="password">This element will be ignored</label>
            <input type="password" id="password" name="password" ignore />
            <div class="error"></div>
        </div>

        <div>
            <div class="col w-50">
                <button type='reset'>Reset</button>
            </div>
            <div class="col w-50 text-right">
                <button type="submit">Submit</button>
            </div>
        </div>
    </form>

    <script>

        import withFinalForm from '@riot-tools/final-form';

        export default withFinalForm({

            onUpdated() {

                // this.finalForm becomes available after
                // component has mounted. This gives direct
                // access to the instantiated final form object
                const form = this.finalForm();

                if (this.state.likesCheese) {
                    form.batch(() => {
                        form.change('name', 'pepelepew');
                        form.change('age', 77);
                    })
                }
            },

            formElement() {
                return this.$('form');
            },

            // https://final-form.org/docs/final-form/types/Config#onsubmit
            onSubmit(values) {
                $api.post('/stuff', values);
            },

            // https://final-form.org/docs/final-form/types/Config#initialvalues
            initialValues: {
                name: '',
                age: null,
                address: ''
            },

            // https://final-form.org/docs/final-form/types/Config#validate
            validate(values) {
                const errors = {};
                if (!values.name) errors.name = 'name is required';
                if (!values.age) errors.age = 'age is required';
                if (!/^\d+$/.test(values.age)) errors.age = 'age must be a number';
                return errors;
            },

            // https://final-form.org/docs/final-form/types/FormApi#subscribe
            // https://final-form.org/docs/final-form/types/FormState
            onFormChange(formState) {
                const submit = this.formElement().querySelector('[type=submit]');
                submit.disabled = !formState.valid;
            },

            // https://final-form.org/docs/final-form/types/FormApi#registerfield
            // `subscriber: FieldState => void`
            // Omits `blur, change, focus` keys
            onFieldChange(field, { touched, error, valid, visited, dirty }) {

                const errorEl = field.parentElement.querySelector('.error');

                if (touched && error) {
                    if (errorEl) errorEl.innerHTML = error;
                    field.parentElement.classList.add('error');
                } else {
                    if (errorEl) errorEl.innerHTML = '';
                    field.parentElement.classList.remove('error');
                }
            },

            // https://final-form.org/docs/final-form/types/Config
            // validate, initialValues, onSubmit, and destroyOnUnregister cannot be overwritten. `destroyOnUnregister` is always true.
            formConfig: {
                debug: true
            },

            // can be one of: active, dirty, dirtyFields, dirtySinceLastSubmit, error, errors, hasSubmitErrors, hasValidationErrors, initialValues, invalid, modified, pristine, submitting, submitError, submitErrors, submitFailed, submitSucceeded, touched, valid, validating, values, visited
            formSubscriptions: {
                visited: true,
                dirty: true
            },

            // https://final-form.org/docs/final-form/types/FormApi#registerfield
            // `subscription: { [string]: boolean }`
            fieldSubscriptions: {
                name: {
                    pristine: true,
                    valid: true
                },
                age: {
                    submitFailed: true,
                    valid: true
                }
            },
            // https://final-form.org/docs/final-form/types/FieldConfig
            // Based on a name basis. If your field name is `nested.stuff[0]`, then your config is `{ 'nested.stuff[0]': { ... } }`
            fieldConfigs: {
                address: {
                    afterSubmit: () => console.log('afterSubmit yay!!')
                }
            }
        });
    </script>
</some-form>
```

## Manually initialize final form

There may be cases where you want to manually initialize FF, such as when you depend on an XHR request to load initial values. For these scenarios, you can use the `manuallyInitializeFinalForm` flag on your component, and manually trigger `component.initializeFinalForm();` inside of a lifecycle hook. Be cautious not to lose the lexical `this` of the `initializeFinalForm()` function. If you need to deeply nest or pass a callback that later calls this, you can do so by extracting into self `const self = this;` and binding it `initializeFinalForm.bind(self)`.

### Example

```html
<some-form>

    ...

    <script>

        export default withFinalForm({
            manuallyInitializeFinalForm: true,

            // Simple async or sync usage
            async onMounted() {

                this.initialValues = await getStateFromSomewhere();

                if (specificCondition) {

                    this.validate = otherValidationFunction
                }

                this.initializeFinalForm();
            }

            // Nested lexical this
            onMounted() {

                // Reference component
                const self = this;

                getData().then((data) => {

                    getMoreData().then(data2 => {

                        self.initialValues = someData;

                        // Must pass component for cases where you cannot
                        // depend on lexical this
                        self.initializeFinalForm.apply(self);
                    })
                });
            }

            // External configuration
            onMounted() {

                const self = this;

                const callback = () => self.initializeFinalForm.apply(self);

                // Dynamically configure any final form configs before applyings
                dynamicallyConfigure(self, callback);
            }
        })
    </script>
</some-form>
```

***Notes:***

> `e.preventDefault()` is called on submit unless explicitly specified otherwise. [See this](#enableDefaultBehaviorOption)

> Input fields can have an `ignore` attribute attached to them which will flag them to be skipped for registration by final form. For example:
> ```html
> <input type='hidden' name='csrf_token' value='abc123' ignore />
> <input type='hidden' name='post_id' value='1' ignore />
> ```

