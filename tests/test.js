/**
 * @jest-environment jsdom
 *
 */
import Iodine from '../src/iodine';

/**
 * Reset the library after each test.
 *
 */
afterEach(() =>
{
    window.Iodine.setErrorMessages(new Iodine()._defaultMessages());
    window.Iodine.setDefaultFieldName(new Iodine()._defaultFieldName());
});

/**
 * Confirm that the 'assertAfter' method works correctly.
 *
 */
test('after date values', () =>
{
    let year = new Date().getFullYear();

    expect(window.Iodine.assertAfter(new Date(year + 1, 12, 18), new Date(year, 12, 18))).toBe(true);
    expect(window.Iodine.assertAfter(new Date(year + 1, 12, 17), Date.now())).toBe(true);
    expect(window.Iodine.assertAfter(new Date(`December 18, ${year + 1} 03:24:00`), new Date(year, 12, 18))).toBe(true);
    expect(window.Iodine.assertAfter(new Date(year - 1, 12, 17), Date.now())).toBe(false);
    expect(window.Iodine.assertAfter(new Date(year - 1, 12, 17), "now")).toBe(false);
    expect(window.Iodine.assertAfter('now', new Date(year - 1, 12, 17))).toBe(false);
    expect(window.Iodine.assertAfter('now', 'now')).toBe(false);
});

/**
 * Confirm that the 'assertAfterOrEqual' method works correctly.
 *
 */
test('after or equal date values', () =>
{
    let year = new Date().getFullYear();

    expect(window.Iodine.assertAfterOrEqual(new Date(year + 1, 12, 18), new Date(year, 12, 18))).toBe(true);
    expect(window.Iodine.assertAfterOrEqual(new Date(year + 1, 12, 17), Date.now())).toBe(true);
    expect(window.Iodine.assertAfterOrEqual(new Date(`December 18, ${year + 1} 03:24:00`), new Date(year, 12, 18))).toBe(true);
    expect(window.Iodine.assertAfterOrEqual(new Date(year, 12, 18), new Date(year, 12, 18))).toBe(true);
    expect(window.Iodine.assertAfterOrEqual(new Date(year - 1, 12, 17), Date.now())).toBe(false);
    expect(window.Iodine.assertAfterOrEqual(new Date(year - 1, 12, 17), 'now')).toBe(false);
    expect(window.Iodine.assertAfterOrEqual('now', new Date(year - 1, 12, 17))).toBe(false);
    expect(window.Iodine.assertAfterOrEqual('now', 'now')).toBe(false);
});

/**
 * Confirm that the 'assertBefore' method works correctly.
 *
 */
test('before date values', () =>
{
    let year = new Date().getFullYear();

    expect(window.Iodine.assertBefore(new Date(year - 1, 12, 18), new Date(year, 12, 18))).toBe(true);
    expect(window.Iodine.assertBefore(new Date(year - 1, 12, 17), Date.now())).toBe(true);
    expect(window.Iodine.assertBefore(new Date(`December 18, ${year - 1} 03:24:00`), new Date(year, 12, 18))).toBe(true);
    expect(window.Iodine.assertBefore(new Date(year + 1, 12, 17), Date.now())).toBe(false);
    expect(window.Iodine.assertBefore(new Date(year + 1, 12, 17), 'now')).toBe(false);
    expect(window.Iodine.assertBefore('now', new Date(year + 1, 12, 17))).toBe(false);
    expect(window.Iodine.assertBefore('now', 'now')).toBe(false);
});

/**
 * Confirm that the 'assertBeforeOrEqual' method works correctly.
 *
 */
test('before or equal date values', () =>
{
    let year = new Date().getFullYear();

    expect(window.Iodine.assertBeforeOrEqual(new Date(year - 1, 12, 18), new Date(year, 12, 18))).toBe(true);
    expect(window.Iodine.assertBeforeOrEqual(new Date(year - 1, 12, 17), Date.now())).toBe(true);
    expect(window.Iodine.assertBeforeOrEqual(new Date(`December 18, ${year - 1} 03:24:00`), new Date(year, 12, 18))).toBe(true);
    expect(window.Iodine.assertBeforeOrEqual(new Date(year, 12, 18), new Date(year, 12, 18))).toBe(true);
    expect(window.Iodine.assertBeforeOrEqual(new Date(year + 1, 12, 17), Date.now())).toBe(false);
    expect(window.Iodine.assertBeforeOrEqual(new Date(year + 1, 12, 17), 'now')).toBe(false);
    expect(window.Iodine.assertBeforeOrEqual('now', new Date(year + 1, 12, 17))).toBe(false);
    expect(window.Iodine.assertBeforeOrEqual('now', 'now')).toBe(false);
});

/**
 * Confirm that the 'assertArray' method works correctly.
 *
 */
test('array values', () =>
{
    expect(window.Iodine.assertArray([1, 2, 3])).toBe(true);
    expect(window.Iodine.assertArray(['1', '2', '3'])).toBe(true);
    expect(window.Iodine.assertArray(1)).toBe(false);
    expect(window.Iodine.assertArray('1')).toBe(false);
});

/**
 * Confirm that the 'assertBoolean' method works correctly.
 *
 */
test('boolean values', () =>
{
    expect(window.Iodine.assertBoolean(true)).toBe(true);
    expect(window.Iodine.assertBoolean(false)).toBe(true);
    expect(window.Iodine.assertBoolean(1)).toBe(false);
    expect(window.Iodine.assertBoolean('1')).toBe(false);
});

/**
 * Confirm that the 'assertDate' method works correctly.
 *
 */
test('date values', () =>
{
    expect(window.Iodine.assertDate(new Date(1995, 12, 17))).toBe(true);
    expect(window.Iodine.assertDate(new Date('December 17, 1995 03:24:00'))).toBe(true);
    expect(window.Iodine.assertDate(1)).toBe(false);
    expect(window.Iodine.assertDate('1')).toBe(false);
});

/**
 * Confirm that the 'assertDifferent' method works correctly.
 *
 */
test('different values', () =>
{
    expect(window.Iodine.assertDifferent(1, 2)).toBe(true);
    expect(window.Iodine.assertDifferent('x', 'y')).toBe(true);
    expect(window.Iodine.assertDifferent(1, 1)).toBe(false);
    expect(window.Iodine.assertDifferent('x', 'x')).toBe(false);
});

/**
 * Confirm that the 'assertEndsWith' method works correctly.
 *
 */
test('a value ends with another value', () =>
{
    expect(window.Iodine.assertEndsWith('hello world', 'world')).toBe(true);
    expect(window.Iodine.assertEndsWith('hello universe', 'world')).toBe(false);
});

/**
 * Confirm that the 'assertEmail' method works correctly.
 *
 */
test('email values', () =>
{
    expect(window.Iodine.assertEmail('john@example.com')).toBe(true);
    expect(window.Iodine.assertEmail('m@i.com')).toBe(true);
    expect(window.Iodine.assertEmail('😃@i.com')).toBe(false);
    expect(window.Iodine.assertEmail('')).toBe(false);
    expect(window.Iodine.assertEmail('45454.com')).toBe(false);
    expect(window.Iodine.assertEmail('sdfsf@')).toBe(false);
});

/**
 * Confirm that the 'assertFalsy' method works correctly.
 *
 */
test('falsy values', () =>
{
    expect(window.Iodine.assertFalsy(false)).toBe(true);
    expect(window.Iodine.assertFalsy('false')).toBe(true);
    expect(window.Iodine.assertFalsy(0)).toBe(true);
    expect(window.Iodine.assertFalsy('0')).toBe(true);
    expect(window.Iodine.assertFalsy(true)).toBe(false);
    expect(window.Iodine.assertFalsy('true')).toBe(false);
    expect(window.Iodine.assertFalsy(1)).toBe(false);
    expect(window.Iodine.assertFalsy('1')).toBe(false);
});

/**
 * Confirm that the 'assertIn' method works correctly.
 *
 */
test('in list values', () =>
{
    expect(window.Iodine.assertIn('a', 'a,b,c')).toBe(true);
    expect(window.Iodine.assertIn('a', ['a', 'b', 'c'])).toBe(true);
    expect(window.Iodine.assertIn('d', 'a,b,c')).toBe(false);
    expect(window.Iodine.assertIn('d', ['a', 'b', 'c'])).toBe(false);
});

/**
 * Confirm that the 'assertInteger' method works correctly.
 *
 */
test('integer values', () =>
{
    expect(window.Iodine.assertInteger(1)).toBe(true);
    expect(window.Iodine.assertInteger(1.5)).toBe(false);
    expect(window.Iodine.assertInteger('1')).toBe(false);
});

/**
 * Confirm that the 'assertJson' method works correctly.
 *
 */
test('json values', () =>
{
    expect(window.Iodine.assertJson('{}')).toBe(true);
    expect(window.Iodine.assertJson('{"a" : 3}')).toBe(true);
    expect(window.Iodine.assertJson("1")).toBe(false);
    expect(window.Iodine.assertJson("")).toBe(false);
});

/**
 * Confirm that the 'assertMax' method works correctly.
 *
 */
test('maximum numeric values', () =>
{
    expect(window.Iodine.assertMax(1, 5)).toBe(true);
    expect(window.Iodine.assertMax(5, 5)).toBe(true);
    expect(window.Iodine.assertMax(6, 5)).toBe(false);
    expect(window.Iodine.assertMax('1', 5)).toBe(true);
    expect(window.Iodine.assertMax('5', 5)).toBe(true);
    expect(window.Iodine.assertMax('6', 5)).toBe(false);
});

/**
 * Confirm that the 'assertMin' method works correctly.
 *
 */
test('minimum numeric values', () =>
{
    expect(window.Iodine.assertMin(6, 5)).toBe(true);
    expect(window.Iodine.assertMin(5, 5)).toBe(true);
    expect(window.Iodine.assertMin(4, 5)).toBe(false);
    expect(window.Iodine.assertMin('6', 5)).toBe(true);
    expect(window.Iodine.assertMin('5', 5)).toBe(true);
    expect(window.Iodine.assertMin('4', 5)).toBe(false);
});

/**
 * Confirm that the 'assertMaxLength' method works correctly.
 *
 */
test('maximum string length', () =>
{
    expect(window.Iodine.assertMaxLength(1, 5)).toBe(false);
    expect(window.Iodine.assertMaxLength(5, 5)).toBe(false);
    expect(window.Iodine.assertMaxLength(6, 5)).toBe(false);
    expect(window.Iodine.assertMaxLength('1', 5)).toBe(true);
    expect(window.Iodine.assertMaxLength('12345', 5)).toBe(true);
    expect(window.Iodine.assertMaxLength('123456', 5)).toBe(false);
});

/**
 * Confirm that the 'assertMinLength' method works correctly.
 *
 */
test('minimum string length', () =>
{
    expect(window.Iodine.assertMinLength(6, 5)).toBe(false);
    expect(window.Iodine.assertMinLength(5, 5)).toBe(false);
    expect(window.Iodine.assertMinLength(4, 5)).toBe(false);
    expect(window.Iodine.assertMinLength('123456', 5)).toBe(true);
    expect(window.Iodine.assertMinLength('12345', 5)).toBe(true);
    expect(window.Iodine.assertMinLength('1234', 5)).toBe(false);
});

/**
 * Confirm that the 'assertNotIn' method works correctly.
 *
 */
test('not in list values', () =>
{
    expect(window.Iodine.assertNotIn('d', 'a,b,c')).toBe(true);
    expect(window.Iodine.assertNotIn('d', ['a', 'b', 'c'])).toBe(true);
    expect(window.Iodine.assertNotIn('a', 'a,b,c')).toBe(false);
    expect(window.Iodine.assertNotIn('a', ['a', 'b', 'c'])).toBe(false);
});

/**
 * Confirm that the 'assertNumeric' method works correctly.
 *
 */
test('numeric values', () =>
{
    expect(window.Iodine.assertNumeric(1)).toBe(true);
    expect(window.Iodine.assertNumeric(2.5)).toBe(true);
    expect(window.Iodine.assertNumeric(3.45)).toBe(true);
    expect(window.Iodine.assertNumeric('13')).toBe(true);
    expect(window.Iodine.assertNumeric('14.55')).toBe(true);
    expect(window.Iodine.assertNumeric('17.0')).toBe(true);
    expect(window.Iodine.assertNumeric('abc')).toBe(false);
});

/**
 * Confirm that the 'assertOptional' method works correctly.
 *
 */
test('optional values', () =>
{
    expect(window.Iodine.assertOptional(1)).toBe(false);
    expect(window.Iodine.assertOptional('1')).toBe(false);
    expect(window.Iodine.assertOptional('')).toBe(true);
    expect(window.Iodine.assertOptional(null)).toBe(true);
    expect(window.Iodine.assertOptional(undefined)).toBe(true);
});

/**
 * Confirm that the 'assertRegexMatch' method works correctly.
 *
 */
test('regular expression values', () =>
{
    expect(window.Iodine.assertRegexMatch('P54655465', "^P\\d{3,}$")).toBe(true);
    expect(window.Iodine.assertRegexMatch('1234', "^\\S+@\\S+[\\.][0-9a-z]+$")).toBe(false);
    expect(window.Iodine.assertRegexMatch('john@example.com', "^\\S+@\\S+[\\.][0-9a-z]+$")).toBe(true);
});

/**
 * Confirm that the 'assertRequired' method works correctly.
 *
 */
test('required values', () =>
{
    expect(window.Iodine.assertRequired(1)).toBe(true);
    expect(window.Iodine.assertRequired('1')).toBe(true);
    expect(window.Iodine.assertRequired('')).toBe(false);
    expect(window.Iodine.assertRequired(null)).toBe(false);
    expect(window.Iodine.assertRequired(undefined)).toBe(false);
});

/**
 * Confirm that the 'assertSame' method works correctly.
 *
 */
test('same values', () =>
{
    expect(window.Iodine.assertSame(1, 1)).toBe(true);
    expect(window.Iodine.assertSame('x', 'x')).toBe(true);
    expect(window.Iodine.assertSame(1, 2)).toBe(false);
    expect(window.Iodine.assertSame('x', 'y')).toBe(false);
});

/**
 * Confirm that the 'assertStartsWith' method works correctly.
 *
 */
test('a value starts with another value', () =>
{
    expect(window.Iodine.assertStartsWith('bye world', 'hello')).toBe(false);
    expect(window.Iodine.assertStartsWith('hello world', 'hello')).toBe(true);
});

/**
 * Confirm that the 'assertString' method works correctly.
 *
 */
test('string values', () =>
{
    expect(window.Iodine.assertString(1)).toBe(false);
    expect(window.Iodine.assertString('1')).toBe(true);
});

/**
 * Confirm that the 'assertTruthy' method works correctly.
 *
 */
test('truthy values', () =>
{
    expect(window.Iodine.assertTruthy(true)).toBe(true);
    expect(window.Iodine.assertTruthy('true')).toBe(true);
    expect(window.Iodine.assertTruthy(1)).toBe(true);
    expect(window.Iodine.assertTruthy('1')).toBe(true);
    expect(window.Iodine.assertTruthy(false)).toBe(false);
    expect(window.Iodine.assertTruthy('false')).toBe(false);
    expect(window.Iodine.assertTruthy(0)).toBe(false);
    expect(window.Iodine.assertTruthy('0')).toBe(false);
});

/**
 * Confirm that the 'assertUrl' method works correctly.
 *
 */
test('url values', () =>
{
    expect(window.Iodine.assertUrl('1234')).toBe(false);
    expect(window.Iodine.assertUrl('http://www.google.com')).toBe(true);
});

/**
 * Confirm that the 'assertUuid' method works correctly.
 *
 */
test('UUID values', () =>
{
    expect(window.Iodine.assertUuid('9034dfa4-49d9-4e3f-9c6d-bc6a0e2233d1')).toBe(true);
    expect(window.Iodine.assertUuid('XAZLYYZeNu75xkicYcPoBWhAW0AX2HRlbqbK')).toBe(false);
});

/**
 * Confirm that the 'getErrorMessage' method works correctly.
 *
 */
test('it retrieves formatted error messages for rules', () =>
{
    let time = Date.UTC(2020, 4, 2, 10, 17, 0);

    window.Iodine.setLocale('en-US');

    let hour = new Date(parseInt(time)).getHours();

    expect(window.Iodine.getErrorMessage('array')).toBe('Value must be an array');
    expect(window.Iodine.getErrorMessage('endsWith')).toBe(`Value must end with '[PARAM]'`);
    expect(window.Iodine.getErrorMessage('endsWith:world')).toBe(`Value must end with 'world'`);
    expect(window.Iodine.getErrorMessage('endsWith', 'world')).toBe(`Value must end with 'world'`);
    expect(window.Iodine.getErrorMessage('endsWith', { field : 'Song title' })).toBe(`Song title must end with '[PARAM]'`);
    expect(window.Iodine.getErrorMessage('endsWith:world', { field : 'Song title' })).toBe(`Song title must end with 'world'`);
    expect(window.Iodine.getErrorMessage('endsWith', { field : 'Song title', param : 'world'})).toBe(`Song title must end with 'world'`);
    expect(window.Iodine.getErrorMessage('endsWith', { param : 'world' })).toBe(`Value must end with 'world'`);
    expect(window.Iodine.getErrorMessage(`after:${time}`)).toBe(`The date must be after: 'May 2, 2020, ${hour}:17'`);
    expect(window.Iodine.getErrorMessage(`after`, time)).toBe(`The date must be after: 'May 2, 2020, ${hour}:17'`);
});

/**
 * Confirm that the default error messages can be replaced.
 *
 */
test('it can replace the default error messages', () =>
{
    window.Iodine.setErrorMessages({
        array      : "Hello world",
        endsWith   : "Hello, [PARAM]",
        startsWith : "[FIELD]: [PARAM] says, 'hello'",
    });

    expect(window.Iodine.getErrorMessage('array')).toBe('Hello world');
    expect(window.Iodine.getErrorMessage('endsWith:John')).toBe('Hello, John');
    expect(window.Iodine.getErrorMessage('endsWith', 'John')).toBe('Hello, John');
    expect(window.Iodine.getErrorMessage('endsWith', { param : 'John' })).toBe('Hello, John');
    expect(window.Iodine.getErrorMessage('endsWith', 'John')).toBe('Hello, John');
    expect(window.Iodine.getErrorMessage('startsWith:Paul')).toBe(`Value: Paul says, 'hello'`);
    expect(window.Iodine.getErrorMessage('startsWith', 'Paul')).toBe(`Value: Paul says, 'hello'`);
    expect(window.Iodine.getErrorMessage('startsWith', { param : 'Paul' })).toBe(`Value: Paul says, 'hello'`);
    expect(window.Iodine.getErrorMessage('startsWith:Paul', { field : 'Name' })).toBe(`Name: Paul says, 'hello'`);
    expect(window.Iodine.getErrorMessage('startsWith', { field : 'Name', param : 'Paul' })).toBe(`Name: Paul says, 'hello'`);
});

/**
 * Confirm the defualt field name can be replaced.
 *
 */
test('it can replace the default field name', () =>
{
    window.Iodine.setDefaultFieldName('Input');

    expect(window.Iodine.getErrorMessage('array')).toBe('Input must be an array');
    expect(window.Iodine.getErrorMessage('endsWith')).toBe(`Input must end with '[PARAM]'`);
    expect(window.Iodine.getErrorMessage('endsWith:world')).toBe(`Input must end with 'world'`);
    expect(window.Iodine.getErrorMessage('endsWith', { param : 'world' })).toBe(`Input must end with 'world'`);
});

/**
 * Confirm that a single error message can be replaced.
 *
 */
test('it can replace a default error message', () =>
{
    const messagesCount = Object.keys(window.Iodine.messages).length;

    window.Iodine.setErrorMessage('email', "Does not look like a valid email");

    expect(window.Iodine.getErrorMessage('email')).toBe('Does not look like a valid email');
    expect(Object.keys(window.Iodine.messages).length).toEqual(messagesCount);
    expect(window.Iodine.getErrorMessage('date')).toBe('Value must be a date');
});

/**
 * Confirm that a single error message can be added to the set.
 *
 */
test('it can add an error message to the set', () =>
{
    const messagesCount = Object.keys(window.Iodine.messages).length;

    window.Iodine.setErrorMessage('passwordConfirmation', "Password confirmation needs to match");

    expect(window.Iodine.getErrorMessage('passwordConfirmation')).toBe('Password confirmation needs to match');
    expect(Object.keys(window.Iodine.messages).length).toEqual(messagesCount + 1);
});

/**
 * Confirm that the 'validate' method works correctly.
 *
 */
test('it can validate input against multiple rules', () => {
  expect(window.Iodine.validate('5', ['required', 'string', 'min:1', 'max:5'])).toBe(true);
  expect(window.Iodine.validate(5, ['required', 'integer', 'min:7', 'max:10'])).toBe('min:7');
  expect(window.Iodine.validate(5, ['optional', 'integer', 'min:7', 'max:10'])).toBe('min:7');
  expect(window.Iodine.validate('', ['optional', 'integer', 'min:7', 'max:10'])).toBe(true);
  expect(window.Iodine.validate(null, ['optional', 'integer', 'min:7', 'max:10'])).toBe(true);
  expect(window.Iodine.validate(undefined, ['optional', 'integer', 'min:7', 'max:10'])).toBe(true);
});

/**
 * Confirm that the 'validate' method can handle rules that contain semicolons.
 *
 */
test('parameter that contains semicolon(":")', () => {
  expect(window.Iodine.validate(':b', ['required', "regexMatch:^:\\w$"])).toBe(true);
  expect(window.Iodine.validate('a:b', ['required', "regexMatch:^:\\w$"])).not.toBe(true);
  expect(window.Iodine.validate(':b', ['required', "regexMatch:^:\\w$"])).toBe(true);
  expect(window.Iodine.validate('a:b', ['required', "regexMatch:^:\\w$"])).not.toBe(true);
});

/**
 * Confirm that the 'passes' method returns the right value against multiple rules.
 *
 */
test('it can determine if input is valid', () => {
  expect(window.Iodine.passes('5', ['required', 'string', 'min:1', 'max:5'])).toBe(true);
  expect(window.Iodine.passes(5, ['required', 'integer', 'min:7', 'max:10'])).toBe(false);
  expect(window.Iodine.passes(5, ['optional', 'integer', 'min:7', 'max:10'])).toBe(false);
  expect(window.Iodine.passes('', ['optional', 'integer', 'min:7', 'max:10'])).toBe(true);
  expect(window.Iodine.passes(null, ['optional', 'integer', 'min:7', 'max:10'])).toBe(true);
  expect(window.Iodine.passes(undefined, ['optional', 'integer', 'min:7', 'max:10'])).toBe(true);
});

/**
 * Confirm that the 'addRule' method works correctly for simple rules.
 *
 */
test('it can add simple custom rules', () =>
{
    window.Iodine.addRule('lowerCase', (value) => value === value.toLowerCase());

    window.Iodine.setErrorMessages({ lowerCase : "Value must be in lower case" });

    expect(window.Iodine.assertLowerCase('hello')).toBe(true);
    expect(window.Iodine.assertLowerCase('Hello')).toBe(false);
    expect(window.Iodine.assertLowerCase('HELLO')).toBe(false);
    expect(window.Iodine.validate('hello', ['required', 'lowerCase'])).toBe(true);
    expect(window.Iodine.validate('Hello', ['required', 'lowerCase'])).toBe('lowerCase');
    expect(window.Iodine.validate('HELLO', ['required', 'lowerCase'])).toBe('lowerCase');
    expect(window.Iodine.getErrorMessage('lowerCase')).toBe('Value must be in lower case');
});

/**
 * Confirm that the 'addRule' method works correctly for advanced rules.
 *
 */
test('it can add advanced custom rules', () =>
{
    window.Iodine.addRule('equals', (value, param) => value == param);

    window.Iodine.setErrorMessages({ equals : "Value must be equal to '[PARAM]'" });

    expect(window.Iodine.assertEquals(1, 1)).toBe(true);
    expect(window.Iodine.assertEquals(1, 2)).toBe(false);
    expect(window.Iodine.assertEquals(1, 3)).toBe(false);
    expect(window.Iodine.validate(1, ['required', 'equals:1'])).toBe(true);
    expect(window.Iodine.validate(1, ['required', 'equals:2'])).toBe('equals:2');
    expect(window.Iodine.validate(1, ['required', 'equals:3'])).toBe('equals:3');
    expect(window.Iodine.getErrorMessage('equals:2')).toBe(`Value must be equal to '2'`);
    expect(window.Iodine.getErrorMessage('equals', 2)).toBe(`Value must be equal to '2'`);
});

/**
 * Confirm that the 'addRule' method works correctly for asynchronous rules.
 *
 */
test('it can add asynchronous custom rules', async () => {
  window.Iodine.addRule('timeoutEquals', (value, param) => new Promise(resolve => setTimeout(resolve(value == param), 10)));

  window.Iodine.setErrorMessages({ timeoutEquals : "Value must be equal to '[PARAM]' after 10ms" });

  expect(await window.Iodine.assertTimeoutEquals(1, 1)).toBe(true);
  expect(await window.Iodine.assertTimeoutEquals(1, 2)).toBe(false);
  expect(await window.Iodine.validateAsync(1, ['required', 'timeoutEquals:1'])).toBe(true);
  expect(await window.Iodine.validateAsync(1, ['required', 'timeoutEquals:2'])).toBe('timeoutEquals:2');
  expect(await window.Iodine.passesAsync(1, ['required', 'integer', 'timeoutEquals:1'])).toBe(true);
  expect(await window.Iodine.passesAsync(1, ['required', 'integer', 'timeoutEquals:2'])).toBe(false);
});
