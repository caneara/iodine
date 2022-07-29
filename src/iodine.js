/*
|--------------------------------------------------------------------------
| Iodine - JavaScript Library
|--------------------------------------------------------------------------
|
| This library contains a collection of useful validation rules that can
| be used to quickly verify whether items meet certain conditions.
|
*/
export default class Iodine
{
    /**
     * Constructor.
     *
     */
    constructor()
    {
        this.locale = undefined;

        this.messages = {
            after         : "The date must be after: '[PARAM]'",
            afterOrEqual  : "The date must be after or equal to: '[PARAM]'",
            array         : "[FIELD] must be an array",
            before        : "The date must be before: '[PARAM]'",
            beforeOrEqual : "The date must be before or equal to: '[PARAM]'",
            boolean       : "[FIELD] must be true or false",
            date          : "[FIELD] must be a date",
            different     : "[FIELD] must be different to '[PARAM]'",
            endsWith      : "[FIELD] must end with '[PARAM]'",
            email         : "[FIELD] must be a valid email address",
            falsy         : "[FIELD] must be a falsy value (false, 'false', 0 or '0')",
            in            : "[FIELD] must be one of the following options: [PARAM]",
            integer       : "[FIELD] must be an integer",
            json          : "[FIELD] must be a parsable JSON object string",
            max           : "[FIELD] must be less than or equal to [PARAM]",
            min           : "[FIELD] must be greater than or equal to [PARAM]",
            maxLength     : "[FIELD] must not be greater than '[PARAM]' in character length",
            minLength     : "[FIELD] must not be less than '[PARAM]' character length",
            notIn         : "[FIELD] must not be one of the following options: [PARAM]",
            numeric       : "[FIELD] must be numeric",
            optional      : "[FIELD] is optional",
            regexMatch    : "[FIELD] must satisify the regular expression: [PARAM]",
            required      : "[FIELD] must be present",
            same          : "[FIELD] must be '[PARAM]'",
            startsWith    : "[FIELD] must start with '[PARAM]'",
            string        : "[FIELD] must be a string",
            truthy        : "[FIELD] must be a truthy value (true, 'true', 1 or '1')",
            url           : "[FIELD] must be a valid url",
            uuid          : "[FIELD] must be a valid UUID",
        };
    }

    /**
     * @internal.
     *
     */
    _compare(first, second, type, equals = false)
    {
        if (! this.assertDate(first)) return false;

        if (! this.assertDate(second) && ! this.assertInteger(second)) return false;

        second = typeof second === 'number' ? second : second.getTime();

        if (type === 'less' && equals)   return first.getTime() <= second;
        if (type === 'less' && ! equals) return first.getTime() < second;
        if (type === 'more' && equals)   return first.getTime() >= second;
        if (type === 'more' && ! equals) return first.getTime() > second;
    }

    /**
     * @internal.
     *
     */
    _error(rule, args = undefined)
    {
        let { param, field } = typeof args === 'object' ? args : { param : args, field : undefined };

        const chunks = rule.split(':');

        let key = chunks.shift();

        param = param || chunks.join(':');

        if (['after', 'afterOrEqual', 'before', 'beforeOrEqual'].includes(key)) {
            param = new Date(parseInt(param)).toLocaleTimeString(this.locale, {
                year   : 'numeric',
                month  : 'short',
                day    : 'numeric',
                hour   : '2-digit',
                minute : 'numeric',
                hour12 : false,
            });
        }

        let message = [null, undefined, ''].includes(param)
            ? this.messages[key]
            : this.messages[key].replace('[PARAM]', param);

        return [null, undefined, ''].includes(field)
            ? message.replace('[FIELD]', this.default_field_name ?? 'Value')
            : message.replace('[FIELD]', field);
    }

    /**
     * @internal.
     *
     */
    _missing()
    {
        return {
            valid : false,
            rule  : 'None',
            error : 'Rules exist, but no value was provided to check',
        };
    }

    /**
     * @internal.
     *
     */
    _prepare(value, rules = [])
    {
        if (! rules.length) return [];

        if (rules[0] === 'optional' && this.assertOptional(value)) return [];

        return rules.filter(rule => rule !== 'optional').map(rule =>
            typeof(rule) === 'string'
            ? [rule, this._title(rule.split(':').shift()), rule.split(':').slice(1).join(':')]
            : [`${ rule.rule }:${ rule.param }`, this._title(rule.rule), rule.param]
        );
    }

    /**
     * @internal.
     *
     */
    _title(value)
    {
        return `${value[0].toUpperCase()}${value.slice(1)}`;
    }

    /**
     * @internal.
     *
     */
    _validate(value, rules)
    {
        for (let index in rules = this._prepare(value, rules)) {
            if (! this[`assert${rules[index][1]}`].apply(this, [value, rules[index][2]])) {
                return {
                    valid : false,
                    rule  : rules[index][0],
                    error : this._error(rules[index][0]),
                };
            }
        }

        return {
            valid : true,
            rule  : '',
            error : '',
        };
    }

    /**
     * Determine if the given content matches the given schema.
     *
     */
    assert(values, schema)
    {
        if (Array.isArray(schema)) {
            return this._validate(values, schema);
        }

        let keys = Object.keys(schema);

        let result = { valid : true, fields : { } };

        for (let i = 0; i < keys.length; i++) {
            result.fields[keys[i]] = values.hasOwnProperty(keys[i])
                ? this._validate(values[keys[i]], schema[keys[i]])
                : this._missing();

            if (! result.fields[keys[i]].valid) {
                result.valid = false;
            }
        }

        return result;
    }

    /**
     * Determine if the given date is after another given date.
     *
     */
    assertAfter(value, after)
    {
        return this._compare(value, after, 'more', false);
    }

    /**
     * Determine if the given date is after or equal to another given date.
     *
     */
    assertAfterOrEqual(value, after)
    {
        return this._compare(value, after, 'more', true);
    }

    /**
     * Determine if the given value is an array.
     *
     */
    assertArray(value)
    {
        return Array.isArray(value);
    }

    /**
     * Determine if the given date is before another given date.
     *
     */
    assertBefore(value, before)
    {
        return this._compare(value, before, 'less', false);
    }

    /**
     * Determine if the given date is before or equal to another given date.
     *
     */
    assertBeforeOrEqual(value, before)
    {
        return this._compare(value, before, 'less', true);
    }

    /**
     * Determine if the given value is a boolean.
     *
     */
    assertBoolean(value)
    {
        return [true, false].includes(value);
    }

    /**
     * Determine if the given value is a date object.
     *
     */
    assertDate(value)
    {
        return (value && Object.prototype.toString.call(value) === '[object Date]' && ! isNaN(value));
    }

    /**
     * Determine if the given value is different to another given value.
     *
     */
    assertDifferent(value, different)
    {
        return value != different;
    }

    /**
     * Determine if the given value ends with another given value.
     *
     */
    assertEndsWith(value, sub)
    {
        return this.assertString(value) && value.endsWith(sub);
    }

    /**
     * Determine if the given value is a valid email address.
     *
     */
    assertEmail(value)
    {
        let regex = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";

        return new RegExp(regex).test(String(value).toLowerCase());
    }

    /**
     * Determine if the given value is falsy.
     *
     */
    assertFalsy(value)
    {
        return [0, '0', false, 'false'].includes(value);
    }

    /**
     * Determine if the given value is within the given array of options.
     *
     */
    assertIn(value, options)
    {
        return (typeof options === 'string' ? options.split(',') : options).includes(value);
    }

    /**
     * Determine if the given value is an integer.
     *
     */
    assertInteger(value)
    {
        return Number.isInteger(value) && parseInt(value).toString() === value.toString();
    }

    /**
     * Determine if the given value is a JSON string.
     *
     */
    assertJson(value)
    {
        try {
            return typeof JSON.parse(value) === 'object';
        } catch (e) {
            return false;
        }
    }

    /**
     * Determine if the given number is less than or equal to the maximum limit.
     *
     */
    assertMax(value, limit)
    {
        return parseFloat(value) <= limit;
    }

    /**
     * Determine if the given number is greater than or equal to the minimum limit.
     *
     */
    assertMin(value, limit)
    {
        return parseFloat(value) >= limit;
    }

    /**
     * Determine if the given value string length is less than or equal to the maximum limit.
     *
     */
    assertMaxLength(value, limit)
    {
        return typeof value === 'string' ? value.length <= limit : false;
    }

    /**
     * Determine if the given value string length is greater than or equal to the minimum limit.
     *
     */
    assertMinLength(value, limit)
    {
        return typeof value === 'string' ? value.length >= limit : false;
    }

    /**
     * Determine if the given value is not within the given array of options.
     *
     */
    assertNotIn(value, options)
    {
        return ! this.assertIn(value, options);
    }

    /**
     * Determine if the given value is numeric (an integer or a float).
     *
     */
    assertNumeric(value)
    {
        return ! isNaN(parseFloat(value)) && isFinite(value);
    }

    /**
     * Determine if the given value is optional.
     *
     */
    assertOptional(value)
    {
        return [null, undefined, ''].includes(value);
    }

    /**
     * Determine if the given value satisifies the given regular expression.
     *
     */
    assertRegexMatch(value, expression)
    {
        return new RegExp(expression).test(String(value));
    }

    /**
     * Determine if the given value is present.
     *
     */
    assertRequired(value)
    {
        return ! this.assertOptional(value);
    }

    /**
     * Determine if the given value is the same as another given value.
     *
     */
    assertSame(value, same)
    {
        return value == same;
    }

    /**
     * Determine if the given value starts with another given value.
     *
     */
    assertStartsWith(value, sub)
    {
        return this.assertString(value) && value.startsWith(sub);
    }

    /**
     * Determine if the given value is a string.
     *
     */
    assertString(value)
    {
        return typeof value === 'string';
    }

    /**
     * Determine if the given value is truthy.
     *
     */
    assertTruthy(value)
    {
        return [1, '1', true, 'true'].includes(value);
    }

    /**
     * Determine if the given value is a valid URL.
     *
     */
    assertUrl(value)
    {
        let regex = "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$";

        return new RegExp(regex).test(String(value).toLowerCase());
    }

    /**
     * Determine if the given value is a valid UUID.
     *
     */
    assertUuid(value)
    {
        let regex = "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$";

        return new RegExp(regex).test(String(value).toLowerCase());
    }

    /**
     * Attach a custom validation rule to the library.
     *
     */
    rule(name, closure)
    {
        Iodine.prototype[`assert${this._title(name)}`] = closure;
    }

    /**
     * Replace the default error messages with a new set.
     *
     */
    setErrorMessages(messages)
    {
        this.messages = messages;
    }

    /**
     * Add or replace an error message.
     *
     */
    setErrorMessage(key, message)
    {
        this.messages[key] = message;
    }

    /**
     * Replace the default locale with a new value.
     *
     */
    setLocale(locale)
    {
        this.locale = locale;
    }

    /**
     * Replace the default field name with a new value.
     *
     */
    setDefaultFieldName(fieldName)
    {
        this.default_field_name = fieldName;
    }
}

/**
 * Create an instance of the library.
 *
 */
if (typeof window !== 'undefined') {
    window.Iodine = new Iodine();
}
