---
id: final-form-types
title: Types
sidebar_label: Types
slug: /final-form/types
---


```ts

const withFinalForm: (component: WithFinalFormOpts) => InitializedComponent;

function initializeForm(component: InitializedComponent, state: InitializeFormState): void;

declare type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function registerField(component: InitializedComponent, state: InitializeFormState, field: FormElement): void;

declare type RffFieldRegistrations = Map<HTMLElement, Function>;

declare type OnFormMutatedArgument = {
    mutationsList: MutationRecord[];
    observer: MutationObserver;
    registrations: RffFieldRegistrations;
    form: FormApi;
    registerField: (HTMLElement: any) => void;
};

type WithFinalFormOpts = RiotComponent & {
    initialValues: object;
    formConfig?: Config;
    formSubscriptions?: FormSubscription;
    manuallyInitializeFinalForm?: boolean;
    mutatorOptions?: MutationObserverInit;
    formElement: () => HTMLFormElement;
    validate?: (errors: object) => object;
    onSubmit?: (values: object) => void;
    onFormChange?: (formState: FormApi) => void;
    onFieldChange?: (field: HTMLElement, fieldState: FieldState<any>) => void;
    onFormMutated?: (opts: OnFormMutatedArgument) => void;
    fieldConfigs?: {
        [key: string]: FieldConfig<any>;
    };
    fieldSubscriptions?: {
        [key: string]: FieldSubscription;
    };
};

type InitializedComponent = WithFinalFormOpts & {
    finalForm: () => FormApi;
    initializeFinalForm: () => void;
};

type InitializeFormState = {
    form: FormApi;
    registered: {
        [key: string]: boolean;
    };
    registrations: RffFieldRegistrations;
    enableDefaultBehavior?: boolean;
    observer?: MutationObserver;
    mutatorOptions?: MutationObserverInit;
    unsubscribe?: Function;
};

const isNotFunction: (fn: any) => boolean;
const requiredFnValidate: (fn: Function) => boolean;
const optionalFnValidate: (fn: Function) => boolean;
const assertProperConfig: (component: WithFinalFormOpts) => void;
const isNotRegisterableField: (field: any) => any;

```
