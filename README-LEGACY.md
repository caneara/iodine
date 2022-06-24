> WARNING: This readme is for an older version of Iodine. If you are using Iodine in a new project, then review the latest [readme](README.MD) instead.

# Iodine

Iodine.js is a micro client-side validation library. It has no dependencies and can be used in isolation or as part of a framework. Iodine also supports chainable rules, allowing you to verify that a piece of data satisfies multiple criteria.

## Installation

The easiest way to pull Iodine into your project is via a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@kingshott/iodine@7.0.2/dist/iodine.min.umd.js" defer></script>
```

You can also pull Iodine into your project via NPM:

```js
npm i @kingshott/iodine
```

## Usage

Iodine is automatically added to the `window` namespace, making it available anywhere. This is the recommended way to use Iodine if your project does not involve compilation or imports.

Alternatively, if you are comfortable using imports, or your project uses a build tool, then you can import Iodine like so:

```js
import { Iodine } from '@kingshott/iodine';

const iodine = new Iodine();
```

## Single checks

Iodine's rules are prefixed with the `is` keyword. So, to check if an item is an `integer`, you'd use the following code:

```js
let item_1 = 7;
let item_2 = 'string';

Iodine.isInteger(item_1); // true
Iodine.isInteger(item_2); // false
```

Single checks return a `true` or `false` value, indicating whether the item passed validation.

## Multiple checks

If you want to verify whether an item passes a set of rules, you can use the main `is` method. This method accepts two parameters. The first, is the item you want to check. The second, is an array of rules that should be run in sequence e.g.

```js
let item_1 = 7;
let item_2 = 'string';

Iodine.is(item_1, ['required', 'integer']); // true
Iodine.is(item_2, ['required', 'integer']); // string - 'integer'
```

The `is` method will return `true` if the item passes every rule.

If the item fails to validate, the first rule that it failed to satisfy will be returned e.g. `'integer'`.

> Version 1 of Iodine only returned the rule name e.g. 'minimum'. Version 2+ returns the rule name and any supplied parameter e.g. 'minimum:7'.

### Strict checking

If you want to know whether the value has passed the validation checks and don't care about which rule failed (if any), in other words you want the result purely as a `boolean`, then you can use the `isValid` helper method:

```js
let item_1 = 7;
let item_2 = 'string';

Iodine.isValid(item_1, ['required', 'integer']); // true
Iodine.isValid(item_2, ['required', 'integer']); // false
```

### Schema validation

If you want to compare an object against a schema. In other words, you want to run a list of checks against a list of values, then you can use the `isValidSchema` helper method. **Note** : This method uses `isValid`under the hood, hence it returns a `boolean`.

```js
Iodine.isValidSchema({
    email    : 'welcome@to.iodine',
    password : 'abcdefgh',
    fullname : 'John Doe',
}, {
    email    : ['required', 'email'],
    password : ['required', 'minLength:6'],
    fullname : ['required', 'minLength:3'],
}); // true
```

## Additional parameters

Some rules require extra parameters e.g.

```js
let item_1 = 7;
let item_2 = 4;

Iodine.isMin(item_1, 5); // true
Iodine.isMin(item_2, 5); // false
```

For multiple checks, you can supply the parameters by appending them to the rule with a semicolon separator e.g.

```js
let item_1 = 7;
let item_2 = 4;

Iodine.is(item_1, ['required', 'integer', 'min:5']); // true
Iodine.is(item_2, ['required', 'integer', 'min:5']); // string - 'min:5'
```

## Optional values

When performing multiple checks, you may wish to allow for optional values. Iodine supports this with the `optional` rule:

```js
let item_1 = 7;
let item_2 = null;
let item_3 = 'string';

Iodine.is(item_1, ['optional', 'integer']); // true
Iodine.is(item_2, ['optional', 'integer']); // true
Iodine.is(item_3, ['optional', 'integer']); // string - 'integer'
```

**IMPORTANT**: If you wish to allow for optional values, then you must supply `'optional'` as the first rule in the list.

## Asynchronous rules

Iodine supports the use of asynchronous custom rules using `async / await`.

To add an asynchronous rule, simply create a custom rule that returns a `Promise` e.g:

```js
Iodine.addRule('timeoutEquals', (value, param) => new Promise(resolve => setTimeout(resolve(value == param), 10)));
```

You may then test a value against the rule by using the `await` keyword:

```js
let result = await Iodine.isTimeoutEquals(1, 1);
```

You can also use multiple asynchronous rules when testing a value, or mix and match synchronous and asynchronous rules. One thing to keep in mind though, is that if any of the rules you want to use are asynchronous, then you must use the `asyncIs` or `asyncIsValid` methods e.g.

```js
// Right
await Iodine.asyncIs(1, ['required', 'timeoutEquals:1']));
await Iodine.asyncIsValid(1, ['required', 'integer', 'timeoutEquals:1']));

// Wrong
await Iodine.Is(1, ['required', 'timeoutEquals:1']));
await Iodine.IsValid(1, ['required', 'integer', 'timeoutEquals:1']));

// Wrong
Iodine.Is(1, ['required', 'timeoutEquals:1']));
Iodine.IsValid(1, ['required', 'integer', 'timeoutEquals:1']));
```

> None of the standard rules included in the library are asynchronous, so unless you want to use Promise-based rules, then you can safely ignore this section on asynchronous rules.

## Error messages

Iodine includes a default set of error messages for the English language. To retrieve an error message for a rule, use the `getErrorMessage` method:

```js
Iodine.getErrorMessage('array'); // string
```

When dealing with rules that have parameters, the `getErrorMessage` method allows you to supply the rule either as a combined `string` or as two arguments (the rule and parameter) e.g.

```js
Iodine.getErrorMessage('min:7');  // string
Iodine.getErrorMessage('min', 7); // string
```

If you want the field name to appear within the error message, you can pass an object as the second parameter to the `getErrorMessage` method.

```js
Iodine.getErrorMessage('min:7', { field: ''}); // string
Iodine.getErrorMessage('min', { field: '', param: 7}); // string
```

## Custom messages (localisation)

You can easily replace the default error messages with your own via the `setErrorMessages` method. This method requires a single parameter, which is an `object` containing the messages. See the [_defaultMessages](src/iodine.js) method for an example of this.

Iodine will automatically swap the `[FIELD]` and `[PARAM]` placeholders with the parameters supplied in the `getErrorMessage` method. As such, you should insert this placeholder at the appropriate position in your new error message e.g.

```js
Iodine.setErrorMessages({ same: `Field must be '[PARAM]'` });   // English
Iodine.setErrorMessages({ same: `Champ doit être '[PARAM]'` }); // French
```

If no field name is provided when calling `getErrorMessage`, by default it will be replaced with "Value". You can change this by calling `setDefaultFieldName`

```js
Iodine.setDefaultFieldName('Valeur');
```

You can also add or update a single error
```js
Iodine.setErrorMessage("passwordConfirmation", "Does not match password");
```

## Available rules

The following validation rules are available:

| Rule                          | Description                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------- |
| isAfter(date/integer)         | Verify that the item is a `Date` after a given `Date` or timestamp
| isAfterOrEqual(date/integer)     | Verify that the item is a `Date` after or equal to a given `Date` or timestamp
| isArray                         | Verify that the item is an `array`
| isBefore(date/integer)         | Verify that the item is a `Date` before a given `Date` or timestamp
| isBeforeOrEqual(date/integer) | Verify that the item is a `Date` before or equal to a given `Date` or timestamp
| isBoolean                     | Verify that the item is either `true` or `false`
| isDate                        | Verify that the item is a `Date` object
| isDifferent(value)               | Verify that the item is different to the supplied value (uses loose compare)
| isEndingWith(value)              | Verify that the item ends with the given value
| isEmail                        | Verify that the item is a valid email address
| isFalsy                       | Verify that the item is either `false`, `'false'`, `0` or `'0'`
| isIn(array)                   | Verify that the item is within the given `array`
| isInteger                     | Verify that the item is an `integer`
| isJson                         | Verify that the item is a parsable JSON object `string`
| isMaxLength(limit)              | Verify that the item's character length does not exceed the given limit
| isMinLength(limit)              | Verify that the item's character length is not under the given limit
| isMax(limit)                  | Verify that the item's numerical value does not exceed the given limit
| isMin(limit)              | Verify that the item's numerical value is not under the given limit
| isNotIn(array)                   | Verify that the item is not within the given `array`
| isNumeric                     | Verify that the item is `number` or a numeric `string`
| isOptional                    | Allow for optional values (only for use with multiple checks)
| isRegexMatch(exp)                | Verify that the item satisfies the given regular expression
| isRequired                    | Verify that the item is not `null`, `undefined` or an empty `string`
| isSame(value)                   | Verify that the item is the same as the supplied value (uses loose compare)
| isStartingWith(value)            | Verify that the item starts with the given value
| isString                      | Verify that the item is a `string`
| isTruthy                      | Verify that the item is either `true`, `'true'`, `1` or `'1'`
| isUrl                            | Verify that the item is a valid URL
| isUuid                        | Verify that the item is a `UUID`

Examine the tests for examples of how to use each rule.

## Deprecated Rules

The following rules are deprecated and should not be used:

| Rule                          | Description                                                                     | Replacement                                                 |
| ----------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| isMaximum(limit)              | Verify that the item does not exceed the given limit (number or char length)    | isMax for numerical value. isMaxLength for character length
| isMinimum(limit)              | Verify that the item is not under the given limit (number or char length)       | isMin for numerical value. isMinLength for character length


## Custom rules

Iodine allows you to add your own custom validation rules through the `addRule` method. This method excepts two parameters. The first, is the name of the rule. The second, is the `closure` that Iodine should execute when calling the rule e.g.

```js
Iodine.addRule('lowerCase', (value) => value === value.toLowerCase());
```

**IMPORTANT**: Iodine will automatically make the first letter of the rule's name uppercase and prefix it with 'is'. You should therefore avoid adding the prefix yourself e.g.

```js
Iodine.addRule('lowerCase');   // correct
Iodine.addRule('isLowerCase'); // wrong
```

If your rule needs to accept a parameter, simply include it in your `closure` as the second argument e.g.

```js
Iodine.addRule('equals', (value, param) => value == param);
```

You can also add error messages for your custom rules e.g.

```js
Iodine.addRule('equals', (value, param) => value == param);
Iodine.setErrorMessages({ equals : `[FIELD] must be equal to '[PARAM]'` });
```

## Contributing

Thank you for considering a contribution to Iodine. You are welcome to submit a PR containing additional rules, however to be accepted, they must explain what they do, be useful to others, and include a suitable test to confirm they work correctly.

After pulling the project, to install the dependencies:

```bash
npm install
```

To run the tests
```bash
npm run test
```

## Support the project

If you'd like to support the development of Iodine, then please consider [sponsoring me](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBEHLHPF3GUVY&source=url). Thanks so much!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
