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
	 **/
	constructor()
	{
		this.messages = this._defaultMessages();
	}



	/**
	 * @internal.
	 *
	 **/
	_dateCompare(first, second, type, equals = false)
	{
		if (! this.isDate(first)) return false;

		if (! this.isDate(second) && ! this.isInteger(second)) return false;

		second = typeof second === 'number' ? second : second.getTime();

		if (type === 'less' && equals) return first.getTime() <= second;
		if (type === 'less' && ! equals) return first.getTime() < second;
		if (type === 'more' && equals) return first.getTime() >= second;
		if (type === 'more' && ! equals) return first.getTime() > second;
	}



	/**
	 * @internal.
	 *
	 **/
	_defaultMessages()
	{
		return {
			after         : `The date must be after: '[PARAM]'`,
			afterOrEqual  : `The date must be after or equal to: '[PARAM]'`,
			array         : `Field must be an array`,
			before        : `The date must be before: '[PARAM]'`,
			beforeOrEqual : `The date must be before or equal to: '[PARAM]'`,
			boolean       : `Field must be true or false`,
			date          : `Field must be a date`,
			different     : `Field must be different to '[PARAM]'`,
			endingWith    : `Field must end with '[PARAM]'`,
			email         : `Field must be a valid email address`,
			falsy         : `Field must be a falsy value (false, 'false', 0 or '0')`,
			in     		  : `Field must be one of the following options: [PARAM]`,
			integer       : `Field must be an integer`,
			json          : `Field must be a parsable JSON object string`,
			maximum       : `Field must not be greater than '[PARAM]' in size or character length`,
			minimum       : `Field must not be less than '[PARAM]' in size or character length`,
			notIn         : `Field must not be one of the following options: [PARAM]`,
			numeric       : `Field must be numeric`,
			optional      : `Field is optional`,
			regexMatch    : `Field must satisify the regular expression: [PARAM]`,
			required      : `Field must be present`,
			same          : `Field must be '[PARAM]'`,
			startingWith  : `Field must start with '[PARAM]'`,
			string        : `Field must be a string`,
			truthy        : `Field must be a truthy value (true, 'true', 1 or '1')`,
			url           : `Field must be a valid url`,
			uuid          : `Field must be a valid UUID`,
		};
	}



	/**
	 * Retrieve an error message for the given rule.
	 *
	 **/
	getErrorMessage(rule, arg = null)
	{
		let key   = rule.split(':')[0];
		let param = arg || rule.split(':')[1];

		if (['after', 'afterOrEqual', 'before', 'beforeOrEqual'].includes(key)) {
			param = new Date(parseInt(param)).toLocaleTimeString(undefined, {
				year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: 'numeric'
			});
		}

		return param === undefined
			 ? this.messages[key]
			 : this.messages[key].replace("[PARAM]", param);
	}



	/**
	 * Determine if the given date is after another given date.
	 *
	 **/
	isAfter(value, after)
	{
		return this._dateCompare(value, after, 'more', false);
	}



	/**
	 * Determine if the given date is after or equal to another given date.
	 *
	 **/
	isAfterOrEqual(value, after)
	{
		return this._dateCompare(value, after, 'more', true);
	}



	/**
	 * Determine if the given value is an array.
	 *
	 **/
	isArray(value)
	{
		return Array.isArray(value);
	}



	/**
	 * Determine if the given date is before another given date.
	 *
	 **/
	isBefore(value, before)
	{
		return this._dateCompare(value, before, 'less', false);
	}



	/**
	 * Determine if the given date is before or equal to another given date.
	 *
	 **/
	isBeforeOrEqual(value, before)
	{
		return this._dateCompare(value, before, 'less', true);
	}



	/**
	 * Determine if the given value is a boolean.
	 *
	 **/
	isBoolean(value)
	{
		return [true, false].includes(value);
	}



	/**
	 * Determine if the given value is a date object.
	 *
	 **/
	isDate(value)
	{
		return value && Object.prototype.toString.call(value) === '[object Date]' && ! isNaN(value);
	}



	/**
	 * Determine if the given value is different to another given value.
	 *
	 **/
	isDifferent(value, different)
	{
		return value !== different;
	}



	/**
	 * Determine if the given value ends with another given value.
	 *
	 **/
	isEndingWith(value, sub)
	{
		return this.isString(value) && value.endsWith(sub);
	}



	/**
	 * Determine if the given value is a valid email address.
	 *
	 **/
	isEmail(value)
	{
		return new RegExp('^\\S+@\\S+[\\.][0-9a-z]+$').test(String(value).toLowerCase());
	}



	/**
	 * Determine if the given value is falsy.
	 *
	 **/
	isFalsy(value)
	{
		return [0, '0', false, 'false'].includes(value);
	}



	/**
	 * Determine if the given value is within the given array of options.
	 *
	 **/
	isIn(value, options)
	{
		options = typeof options === 'string'
				? options.split(",")
				: options;

		return options.includes(value);
	}



	/**
	 * Determine if the given value is an integer.
	 *
	 **/
	isInteger(value)
	{
		return Number.isInteger(value) && parseInt(value).toString() === value.toString();
	}



	/**
	 * Determine if the given value is a JSON string.
	 *
	 **/
	isJson(value)
	{
		try {
        	return typeof JSON.parse(value) === 'object';
		} catch (e) {
			return false;
		}
	}



	/**
	 * Determine if the given value meets the given maximum limit.
	 *
	 **/
	isMaximum(value, limit)
	{
		value = typeof value === 'string' ? value.length : value;

		return parseFloat(value) <= limit;
	}



	/**
	 * Determine if the given value meets the given minimum limit.
	 *
	 **/
	isMinimum(value, limit)
	{
		value = typeof value === 'string' ? value.length : value;

		return parseFloat(value) >= limit;
	}



	/**
	 * Determine if the given value is not within the given array of options.
	 *
	 **/
	isNotIn(value, options)
	{
		return ! this.isIn(value, options);
	}



	/**
	 * Determine if the given value is numeric (an integer or a float).
	 *
	 **/
	isNumeric(value)
	{
		return ! isNaN(parseFloat(value)) && isFinite(value);
	}



	/**
	 * Determine if the given value is optional.
	 *
	 **/
	isOptional(value)
	{
		return [null, undefined, ''].includes(value);
	}



	/**
	 * Determine if the given value satisifies the given regular expression.
	 *
	 **/
	isRegexMatch(value, expression)
	{
		return new RegExp(expression).test(String(value).toLowerCase());
	}



	/**
	 * Determine if the given value is present.
	 *
	 **/
	isRequired(value)
	{
		return ! this.isOptional(value);
	}



	/**
	 * Determine if the given value is the same as another given value.
	 *
	 **/
	isSame(value, different)
	{
		return value === different;
	}



	/**
	 * Determine if the given value starts with another given value.
	 *
	 **/
	isStartingWith(value, sub)
	{
		return this.isString(value) && value.startsWith(sub);
	}



	/**
	 * Determine if the given value is a string.
	 *
	 **/
	isString(value)
	{
		return typeof value === 'string';
	}



	/**
	 * Determine if the given value is truthy.
	 *
	 **/
	isTruthy(value)
	{
		return [1, '1', true, 'true'].includes(value);
	}



	/**
	 * Determine if the given value is a valid URL.
	 *
	 **/
	isUrl(value)
	{
		return new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$')
			 .test(String(value).toLowerCase());
	}



	/**
	 * Determine if the given value is a valid UUID.
	 *
	 **/
	isUuid(value)
	{
		return new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
			 .test(String(value).toLowerCase());
	}



	/**
	 * Determine whether the given value meets the given rules.
	 *
	 **/
	is(value, rules = [])
	{
		// Check if no rules were specified
		if (rules.length === 0) return true;

		// Check for an optional value
		if (rules[0] === 'optional' && this.isOptional(value)) return true;

		// Iterate through the rules
		for (let index = 0; index < rules.length; index++) {

			// Ignore optional rules
			if (rules[index] === 'optional') continue;

			// Determine the method to use
			let rule = rules[index].split(':')[0][0].toUpperCase()
					 + rules[index].split(':')[0].slice(1);

			// Validate the value against the method
			let result = this[`is${rule}`].apply(this, [value, rules[index].split(':')[1]]);

			// Check if the value failed validation
			if (! result) return rules[index];

		}

		// Otherwise, the value is valid
		return true;
	}



	/**
	 * Replace the default error messages with a new set.
	 *
	 **/
	setErrorMessages(messages)
	{
		this.messages = messages;
	}

}



/**
 * Create an instance of the library.
 *
 **/
window.Iodine = new Iodine();