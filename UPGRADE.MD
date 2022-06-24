# Upgrade Guide

Version 8 of Iodine represents a major rewrite of the library and it has several breaking changes. As a result, it is recommended that existing projects remain on version 7 (or lower) and only newer projects use version 8 (or higher).

If you still wish to upgrade, here are the steps to take:

- Replace all `Iodine.is*` methods with `Iodine.assert*`.
- Rename `isStartingWith` method to `assertStartsWith`.
- Rename `isEndingWith` method to `assertEndsWith`.
- Rename `isValid` method to `passes`.
- Rename `is` method to `validate`.
- Rename `asyncIs` method to `validateAsync`.
- Rename `asyncIsValid` method to `passesAsync`.
- Remove `isValidSchema`. This method originally only worked for 'isValid'. It needs to also work for `validate` and for async `validate` and `passes`. I'm happy to accept a PR for this, or I'll try to add it at a future date.

The `assertEmail` method uses a different regular expression, which should be more accurate, but it does not require any userland changes.