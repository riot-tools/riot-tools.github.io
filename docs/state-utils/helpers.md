---
id: state-utils-helpers
title: Helpers
sidebar_label: Helpers
slug: /state-utils/helpers
---

## `isNonIterable(val: any): boolean`
 
Checks if value is non-iterable: null, undefined, String, Number, Boolean, Symbol

## `isNonObject(val: any): boolean`

Checks if value is a type that does not have a constructor

## `oneIsNonIterable(value: any, compare: any): boolean`

Checks if either value is non iterable

## `hasSameConstructor(value: any, compare: any): boolean`

Checks if both values have the same constructor

## `isSameLength(value: any, compare: any): boolean`

Checks if both values are the length (or size). Values can be any iterable with the property `length` or `size`.

## `isFunction(fn): boolean`

Checks if value is instance of a function

## `forInIsEqual(item: any, check: { (v: any, i: number|string): boolean}): boolean`

Performs a for-in loop that breaks the instance `check` function returns false. Used to check that a value is in another item.

## `forOfIsEqual(item: any, check: { (v: any): boolean }): boolean`

Performs a for-of loop that breaks the instance `check` function returns false. Used to check that a value is in another item.

## `_nextTick(fn: Function)`

Browser implementation of `process.nextTick`;
