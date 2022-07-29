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
    window.Iodine = new Iodine();
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
    expect(window.Iodine.assertAfter(new Date(year - 1, 12, 17), 'now')).toBe(false);
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
    expect(window.Iodine.assertEmail('m@i.de')).toBe(true);
    expect(window.Iodine.assertEmail('m@i.co.uk')).toBe(true);
    expect(window.Iodine.assertEmail('😃@i.com')).toBe(false);
    expect(window.Iodine.assertEmail('')).toBe(false);
    expect(window.Iodine.assertEmail('john@example.com ')).toBe(false);
    expect(window.Iodine.assertEmail('john@example.com extra')).toBe(false);
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
    expect(window.Iodine.assertJson('1')).toBe(false);
    expect(window.Iodine.assertJson('')).toBe(false);
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
 * Confirm that the '_error' method works correctly.
 *
 */
test('it retrieves formatted error messages for rules', () =>
{
    let time = Date.UTC(2020, 4, 2, 10, 17, 0);

    window.Iodine.setLocale('en-US');

    let hour = new Date(parseInt(time)).getHours();

    expect(window.Iodine._error('array')).toBe('Value must be an array');
    expect(window.Iodine._error('endsWith')).toBe(`Value must end with '[PARAM]'`);
    expect(window.Iodine._error('endsWith:world')).toBe(`Value must end with 'world'`);
    expect(window.Iodine._error('endsWith', 'world')).toBe(`Value must end with 'world'`);
    expect(window.Iodine._error('endsWith', { field : 'Song title' })).toBe(`Song title must end with '[PARAM]'`);
    expect(window.Iodine._error('endsWith:world', { field : 'Song title' })).toBe(`Song title must end with 'world'`);
    expect(window.Iodine._error('endsWith', { field : 'Song title', param : 'world'})).toBe(`Song title must end with 'world'`);
    expect(window.Iodine._error('endsWith', { param : 'world' })).toBe(`Value must end with 'world'`);
    expect(window.Iodine._error(`after:${time}`)).toBe(`The date must be after: 'May 2, 2020, ${hour}:17'`);
    expect(window.Iodine._error(`after`, time)).toBe(`The date must be after: 'May 2, 2020, ${hour}:17'`);
});

/**
 * Confirm that the default error messages can be replaced.
 *
 */
test('it can replace the default error messages', () =>
{
    window.Iodine.setErrorMessages({
        array      : 'Hello world',
        endsWith   : 'Hello, [PARAM]',
        startsWith : "[FIELD]: [PARAM] says, 'hello'",
    });

    expect(window.Iodine._error('array')).toBe('Hello world');
    expect(window.Iodine._error('endsWith:John')).toBe('Hello, John');
    expect(window.Iodine._error('endsWith', 'John')).toBe('Hello, John');
    expect(window.Iodine._error('endsWith', { param : 'John' })).toBe('Hello, John');
    expect(window.Iodine._error('endsWith', 'John')).toBe('Hello, John');
    expect(window.Iodine._error('startsWith:Paul')).toBe(`Value: Paul says, 'hello'`);
    expect(window.Iodine._error('startsWith', 'Paul')).toBe(`Value: Paul says, 'hello'`);
    expect(window.Iodine._error('startsWith', { param : 'Paul' })).toBe(`Value: Paul says, 'hello'`);
    expect(window.Iodine._error('startsWith:Paul', { field : 'Name' })).toBe(`Name: Paul says, 'hello'`);
    expect(window.Iodine._error('startsWith', { field : 'Name', param : 'Paul' })).toBe(`Name: Paul says, 'hello'`);
});

/**
 * Confirm the defualt field name can be replaced.
 *
 */
test('it can replace the default field name', () =>
{
    window.Iodine.setDefaultFieldName('Input');

    expect(window.Iodine._error('array')).toBe('Input must be an array');
    expect(window.Iodine._error('endsWith')).toBe(`Input must end with '[PARAM]'`);
    expect(window.Iodine._error('endsWith:world')).toBe(`Input must end with 'world'`);
    expect(window.Iodine._error('endsWith', { param : 'world' })).toBe(`Input must end with 'world'`);
});

/**
 * Confirm that a single error message can be replaced.
 *
 */
test('it can replace a default error message', () =>
{
    const total = Object.keys(window.Iodine.messages).length;

    window.Iodine.setErrorMessage('email', 'Does not look like a valid email');

    expect(window.Iodine._error('email')).toBe('Does not look like a valid email');
    expect(Object.keys(window.Iodine.messages).length).toEqual(total);
    expect(window.Iodine._error('date')).toBe('Value must be a date');
});

/**
 * Confirm that a single error message can be added to the set.
 *
 */
test('it can add an error message to the set', () =>
{
    const total = Object.keys(window.Iodine.messages).length;

    window.Iodine.setErrorMessage('passwordConfirmation', 'Password confirmation needs to match');

    expect(window.Iodine._error('passwordConfirmation')).toBe('Password confirmation needs to match');
    expect(Object.keys(window.Iodine.messages).length).toEqual(total + 1);
});

/**
 * Confirm that the 'assert' method works correctly.
 *
 */
test('it can validate a single item against multiple rules', () =>
{
    let pass = {
        valid : true,
        rule  : '',
        error : '',
    };

    let fail = {
        valid : false,
        rule  : 'min:7',
        error : 'Value must be greater than or equal to 7',
    };

    expect(window.Iodine.assert('5', ['required', 'string', 'min:1', 'max:5'])).toStrictEqual(pass);
    expect(window.Iodine.assert(5, ['required', 'integer', 'min:7', 'max:10'])).toStrictEqual(fail);
    expect(window.Iodine.assert(5, ['optional', 'integer', 'min:7', 'max:10'])).toStrictEqual(fail);
    expect(window.Iodine.assert('', ['optional', 'integer', 'min:7', 'max:10'])).toStrictEqual(pass);
    expect(window.Iodine.assert(null, ['optional', 'integer', 'min:7', 'max:10'])).toStrictEqual(pass);
    expect(window.Iodine.assert(undefined, ['optional', 'integer', 'min:7', 'max:10'])).toStrictEqual(pass);
});

/**
 * Confirm that the 'assert' method works correctly.
 *
 */
test('it can validate multiple items against multiple rules', () =>
{
    let result_1 = {
        valid  : false,
        fields : {
            website : {
                valid : false,
                rule  : 'None',
                error : 'Rules exist, but no value was provided to check',
            },
            ping : {
                valid : false,
                rule  : 'None',
                error : 'Rules exist, but no value was provided to check',
            },
        }
    };

    let result_2 = {
        valid  : true,
        fields : {
            email : {
                valid : true,
                rule  : '',
                error : '',
            },
            password : {
                valid : true,
                rule  : '',
                error : '',
            },
            name : {
                valid : true,
                rule  : '',
                error : '',
            },
        }
    };

    let result_3 = {
        valid  : true,
        fields : {
            website : {
                valid : true,
                rule  : '',
                error : '',
            },
        }
    };

    let result_4 = {
        valid  : false,
        fields : {
            website : {
                valid : true,
                rule  : '',
                error : '',
            },
            ping : {
                valid : false,
                rule  : 'integer',
                error : 'Value must be an integer',
            },
        }
    };

    expect(window.Iodine.assert({ }, { website : ['required', 'url'], ping : ['required' , 'integer'] })).toStrictEqual(result_1);
    expect(window.Iodine.assert({ email : 'welcome@to.iodine', password : 'abcdefgh', name : 'John Doe' }, { email : ['required', 'email'], password : ['required', 'minLength:6'], name : ['required', 'minLength:3'] })).toStrictEqual(result_2);
    expect(window.Iodine.assert({ website : 'https://iodine.is', ping : 'ninety' }, { website : ['required', 'url'] })).toStrictEqual(result_3);
    expect(window.Iodine.assert({ website : 'https://iodine.io', ping : 'ninety' }, { website : ['required', 'url'], ping : ['required', 'integer'] })).toStrictEqual(result_4);
});

/**
 * Confirm that the 'assert' method can handle rules that contain semicolons.
 *
 */
test('parameter that contains semicolon(":")', () =>
{
    let pass = {
        valid : true,
        rule  : '',
        error : '',
    };

    let fail = {
        valid : false,
        rule  : "regexMatch:^:\\w$",
        error : "Value must satisify the regular expression: ^:\\w$",
    };

    expect(window.Iodine.assert(':b', ['required', "regexMatch:^:\\w$"])).toStrictEqual(pass);
    expect(window.Iodine.assert('a:b', ['required', "regexMatch:^:\\w$"])).toStrictEqual(fail);
    expect(window.Iodine.assert(':b', ['required', "regexMatch:^:\\w$"])).toStrictEqual(pass);
    expect(window.Iodine.assert('a:b', ['required', "regexMatch:^:\\w$"])).toStrictEqual(fail);
});

/**
 * Confirm that the 'assert' method can accept rules as objects.
 *
 */
test('it can accept rules as objects', () =>
{
    let pass = {
        valid : true,
        rule  : '',
        error : '',
    };

    let fail_1 = {
        valid : false,
        rule  : 'min:7',
        error : 'Value must be greater than or equal to 7'
    };

    let fail_2 = {
        valid : false,
        rule  : 'in:7,8,9',
        error : 'Value must be one of the following options: 7,8,9'
    };

    let fail_3 = {
        valid  : false,
        fields : {
            hello     : { error : '', rule : '', valid : true },
            not_valid : { error : 'Value must be greater than or equal to 12', rule : 'min:12', valid : false },
        },
    };

    let rules = {
        hello     : ['required', { rule : 'string' }],
        not_valid : ['required', { rule : 'min', param : 12 }]
    };

    expect(window.Iodine.assert(8, ['required', { rule : 'min', param : 7 }, 'max:10'])).toStrictEqual(pass);
    expect(window.Iodine.assert(2, ['required', { rule : 'min', param : 7 }, 'max:10'])).toStrictEqual(fail_1);
    expect(window.Iodine.assert(5, ['required', { rule : 'in', param : [ 7, 8, 9 ] }, 'max:10'])).toStrictEqual(fail_2);
    expect(window.Iodine.assert(8, ['required', { rule : 'in', param : [ 7, 8, 9 ] }, 'max:10'])).toStrictEqual(pass);
    expect(window.Iodine.assert({ hello : 'string', not_valid : 10 }, rules)).toStrictEqual(fail_3);
});

/**
 * Confirm that the 'rule' method works correctly for simple rules.
 *
 */
test('it can add simple custom rules', () =>
{
    window.Iodine.rule('lowerCase', (value) => value === value.toLowerCase());

    window.Iodine.setErrorMessages({ lowerCase : 'Value must be in lower case' });

    let pass = {
        valid : true,
        rule  : '',
        error : '',
    };

    let fail = {
        valid : false,
        rule  : 'lowerCase',
        error : 'Value must be in lower case',
    };

    expect(window.Iodine.assertLowerCase('hello')).toBe(true);
    expect(window.Iodine.assertLowerCase('Hello')).toBe(false);
    expect(window.Iodine.assertLowerCase('HELLO')).toBe(false);
    expect(window.Iodine.assert('hello', ['required', 'lowerCase'])).toStrictEqual(pass);
    expect(window.Iodine.assert('Hello', ['required', 'lowerCase'])).toStrictEqual(fail);
    expect(window.Iodine.assert('HELLO', ['required', 'lowerCase'])).toStrictEqual(fail);
    expect(window.Iodine._error('lowerCase')).toBe('Value must be in lower case');
});

/**
 * Confirm that the 'rule' method works correctly for advanced rules.
 *
 */
test('it can add advanced custom rules', () =>
{
    window.Iodine.rule('equals', (value, param) => value == param);

    window.Iodine.setErrorMessages({ equals : "Value must be equal to '[PARAM]'" });

    let pass = {
        valid : true,
        rule  : '',
        error : '',
    };

    let fail_1 = {
        valid : false,
        rule  : 'equals:2',
        error : "Value must be equal to '2'",
    };

    let fail_2 = {
        valid : false,
        rule  : 'equals:3',
        error : "Value must be equal to '3'",
    };

    expect(window.Iodine.assertEquals(1, 1)).toBe(true);
    expect(window.Iodine.assertEquals(1, 2)).toBe(false);
    expect(window.Iodine.assertEquals(1, 3)).toBe(false);
    expect(window.Iodine.assert(1, ['required', 'equals:1'])).toStrictEqual(pass);
    expect(window.Iodine.assert(1, ['required', 'equals:2'])).toStrictEqual(fail_1);
    expect(window.Iodine.assert(1, ['required', 'equals:3'])).toStrictEqual(fail_2);
    expect(window.Iodine._error('equals:2')).toBe("Value must be equal to '2'");
    expect(window.Iodine._error('equals', 2)).toBe("Value must be equal to '2'");
});