<!-- Screenshot -->
<p align="center">
    <img src="resources/example.png" alt="Code example">
</p>

<!-- Badges -->
<p align="center">
  <img src="resources/build.svg" alt="Build">
  <img src="resources/coverage.svg" alt="Coverage">
  <img src="resources/version.svg" alt="Version">
  <img src="resources/license.svg" alt="License">
</p>

# Iodine

Iodine.js is a micro client-side validation library. It has no dependencies and can be used in isolation or as part of a framework. Iodine also supports chainable rules, allowing you to verify that a piece of data satisfies multiple criteria.

## Upgrading

Version 8+ of Iodine involved a major rewrite with numerous breaking changes. It is therefore recommended that existing projects continue to use [version 7](README-V7.MD) (or lower), while version 8 (or higher) should be reserved for newer projects.

If you wish to upgrade an existing project from an earlier version of Iodine (7 or less), then you should follow the steps outlined in the [upgrade guide](UPGRADE.MD).

## Installation

The easiest way to pull Iodine into your project is via a CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/mattkingshott/iodine/dist/iodine.min.umd.js" defer></script>
```

You can also pull Iodine into your project via NPM:

```js
npm i @kingshott/iodine
```

## Usage

Iodine is automatically added to the `window` namespace, making it available anywhere. This is the recommended way to use Iodine if your project does not involve compilation or imports. Even if your project does involve compilation, it is often easier to just use the instance added to the `window` namespace.

Alternatively, if you are comfortable using imports, or you want to create your own instance, then you can import Iodine like so:

```js
import Iodine from '@kingshott/iodine';

const instance = new Iodine();
```

## Single Checks

Iodine's rules are prefixed with the `assert` keyword. So, to check if an item is an `integer`, you'd use the following code:

```js
let item_1 = 7;
let item_2 = 'string';

Iodine.assertInteger(item_1); // true
Iodine.assertInteger(item_2); // false
```

Single checks return a `true` or `false` value, indicating whether the item passed validation.

## Multiple Checks

If you want to verify whether an item passes a set of rules, you can use the `validate` method. This method accepts two parameters. The first, is the item you want to check. The second, is an array of rules that should be run in sequence e.g.

```js
let item_1 = 7;
let item_2 = 'string';

Iodine.validate(item_1, ['required', 'integer']); // true
Iodine.validate(item_2, ['required', 'integer']); // string - 'integer'
```

The `validate` method will return `true` if the item passes every rule.

If the item fails to validate, the first rule that it failed to satisfy will be returned e.g. `'integer'`.

If you only need to know if the validation succeeded (and don't care which rule failed), then you can use the `passes` method instead. This will return `true` or `false` depending on the outcome:

```js
let item_1 = 7;
let item_2 = 'string';

Iodine.passes(item_1, ['required', 'integer']); // true
Iodine.passes(item_2, ['required', 'integer']); // false
```

## Additional parameters

Some rules require extra parameters e.g.

```js
let item_1 = 7;
let item_2 = 4;

Iodine.assertMin(item_1, 5); // true
Iodine.assertMin(item_2, 5); // false
```

For multiple checks, you can supply the parameters by appending them to the rule with a semicolon separator e.g.

```js
let item_1 = 7;
let item_2 = 4;

Iodine.validate(item_1, ['required', 'integer', 'min:5']); // true
Iodine.validate(item_2, ['required', 'integer', 'min:5']); // string - 'min:5'
```

## Optional values

When performing multiple checks, you may wish to allow for optional values. Iodine supports this with the `optional` rule:

```js
let item_1 = 7;
let item_2 = null;
let item_3 = 'string';

Iodine.validate(item_1, ['optional', 'integer']); // true
Iodine.validate(item_2, ['optional', 'integer']); // true
Iodine.validate(item_3, ['optional', 'integer']); // string - 'integer'
```

**IMPORTANT**: If you wish to allow for optional values, then you must supply `'optional'` as the first rule in the list.

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
Iodine.getErrorMessage('min:7', { field : ''}); // string
Iodine.getErrorMessage('min', { field : '', param : 7}); // string
```

## Custom messages (localisation)

You can easily replace the default error messages with your own via the `setErrorMessages` method. This method requires a single parameter, which is an `object` containing the messages. See the [_defaultMessages](src/iodine.js) method for an example of this.

Iodine will automatically swap the `[FIELD]` and `[PARAM]` placeholders with the parameters supplied in the `getErrorMessage` method. As such, you should insert this placeholder at the appropriate position in your new error message e.g.

```js
Iodine.setErrorMessages({ same : `Field must be '[PARAM]'` });   // English
Iodine.setErrorMessages({ same : `Champ doit être '[PARAM]'` }); // French
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

| Rule                              | Description                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------- |
| assertAfter(date/integer)         | Verify that the item is a `Date` after a given `Date` or timestamp
| assertAfterOrEqual(date/integer)  | Verify that the item is a `Date` after or equal to a given `Date` or timestamp
| assertArray                       | Verify that the item is an `array`
| assertBefore(date/integer)        | Verify that the item is a `Date` before a given `Date` or timestamp
| assertBeforeOrEqual(date/integer) | Verify that the item is a `Date` before or equal to a given `Date` or timestamp
| assertBoolean                     | Verify that the item is either `true` or `false`
| assertDate                        | Verify that the item is a `Date` object
| assertDifferent(value)            | Verify that the item is different to the supplied value (uses loose compare)
| assertEnds(value)                 | Verify that the item ends with the given value
| assertEmail                       | Verify that the item is a valid email address
| assertFalsy                       | Verify that the item is either `false`, `'false'`, `0` or `'0'`
| assertIn(array)                   | Verify that the item is within the given `array`
| assertInteger                     | Verify that the item is an `integer`
| assertJson                        | Verify that the item is a parsable JSON object `string`
| assertMaxLength(limit)            | Verify that the item's character length does not exceed the given limit
| assertMinLength(limit)            | Verify that the item's character length is not under the given limit
| assertMax(limit)                  | Verify that the item's numerical value does not exceed the given limit
| assertMin(limit)                  | Verify that the item's numerical value is not under the given limit
| assertNotIn(array)                | Verify that the item is not within the given `array`
| assertNumeric                     | Verify that the item is `number` or a numeric `string`
| assertOptional                    | Allow for optional values (only for use with multiple checks)
| assertRegexMatch(exp)             | Verify that the item satisfies the given regular expression
| assertRequired                    | Verify that the item is not `null`, `undefined` or an empty `string`
| assertSame(value)                 | Verify that the item is the same as the supplied value (uses loose compare)
| assertStartsWith(value)           | Verify that the item starts with the given value
| assertString                      | Verify that the item is a `string`
| assertTruthy                      | Verify that the item is either `true`, `'true'`, `1` or `'1'`
| assertUrl                         | Verify that the item is a valid URL
| assertUuid                        | Verify that the item is a `UUID`

Examine the tests for examples of how to use each rule.

## Custom rules

Iodine allows you to add your own custom validation rules through the `addRule` method. This method accepts two parameters. The first, is the name of the rule. The second, is the `closure` that Iodine should execute when calling the rule e.g.

```js
Iodine.addRule('lowerCase', (value) => value === value.toLowerCase());
```

**IMPORTANT**: Iodine will automatically make the first letter of the rule's name uppercase and prefix it with 'assert'. You should therefore avoid adding the prefix yourself e.g.

```js
Iodine.addRule('lowerCase');       // right
Iodine.addRule('assertLowerCase'); // wrong
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

## Asynchronous rules

Iodine supports the use of asynchronous custom rules using `async / await`. To add an asynchronous rule, simply create a custom rule that returns a `Promise` e.g:

```js
Iodine.addRule('timeoutEquals', (value, param) => new Promise(resolve => setTimeout(resolve(value == param), 10)));
```

You may then test a value against the rule by using the `await` keyword:

```js
let result = await Iodine.assertTimeoutEquals(1, 1);
```

You can also use multiple asynchronous rules when testing a value, or mix and match synchronous and asynchronous rules. One thing to keep in mind though, is that if any of the rules you want to use are asynchronous, then you must use the `validateAsync` or `passesAsync` methods e.g.

```js
// Right
await Iodine.validateAsync(1, ['required', 'timeoutEquals:1']));
await Iodine.passesAsync(1, ['required', 'integer', 'timeoutEquals:1']));

// Wrong
await Iodine.validate(1, ['required', 'timeoutEquals:1']));
await Iodine.passes(1, ['required', 'integer', 'timeoutEquals:1']));

// Wrong
Iodine.validate(1, ['required', 'timeoutEquals:1']));
Iodine.passesAsync(1, ['required', 'integer', 'timeoutEquals:1']));
```

> None of the standard rules included in the library are asynchronous, so unless you want to use Promise-based rules, then you can safely ignore this section on asynchronous rules.

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
