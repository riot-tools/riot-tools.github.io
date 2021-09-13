---
id: sak-options-validator
title: Options Validator
sidebar_label: Options Validator
slug: /sak/options-validator
---

## TODO

## Option Validator

```js
import { OptionsValidator } from '@riot-tools/sak';

const schema = {
    opt1: true, // required
    opt2: String, // must be a string
    opt3: Object ,// must be an object
    opt4: (val) => val === 'test' || 'does not eq test', // return true or err message
    opt5: [false, String], // Optional, but must be a string
    opt6: [true, String], // required, and must be a string
    opt7: {
        a: String,
        b: Boolean
    }, // must be an object that matches nested schema
    opt8: [true, {
        a: String,
        b: Boolean
    }] // required and must be an object that matches nested schema
};

const validator = new OptionsValidator(schema, 'my component');

validator.validate(myOptionsObject);

```
