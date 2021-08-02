import { Iodine as Library } from "../src/iodine";

window.Iodine = new Library();
const defaultMessages = Iodine.messages;

/**
 * The library is being mutated throughout the tests for example by replacing
 * the default messages. We ensure that for each test, we have the default version
 * of the messages
 **/
afterEach(() => {
  Iodine.setErrorMessages(defaultMessages);
});

describe("validate available rules", () => {
  /**
   * Confirm that the 'isAfter' method works correctly.
   *
   **/
  test("after date values", () => {
    let year = new Date().getFullYear();
    expect(
      Iodine.isAfter(new Date(year + 1, 12, 18), new Date(year, 12, 18))
    ).toBe(true);
    expect(Iodine.isAfter(new Date(year + 1, 12, 17), Date.now())).toBe(true);
    expect(
      Iodine.isAfter(
        new Date(`December 18, ${year + 1} 03:24:00`),
        new Date(year, 12, 18)
      )
    ).toBe(true);
    expect(Iodine.isAfter(new Date(year - 1, 12, 17), Date.now())).toBe(false);
    expect(Iodine.isAfter(new Date(year - 1, 12, 17), "now")).toBe(false);
    expect(Iodine.isAfter("now", new Date(year - 1, 12, 17))).toBe(false);
    expect(Iodine.isAfter("now", "now")).toBe(false);
  });

  /**
   * Confirm that the 'isAfterOrEqual' method works correctly.
   *
   **/
  test("after or equal date values", () => {
    let year = new Date().getFullYear();
    expect(
      Iodine.isAfterOrEqual(new Date(year + 1, 12, 18), new Date(year, 12, 18))
    ).toBe(true);
    expect(Iodine.isAfterOrEqual(new Date(year + 1, 12, 17), Date.now())).toBe(
      true
    );
    expect(
      Iodine.isAfterOrEqual(
        new Date(`December 18, ${year + 1} 03:24:00`),
        new Date(year, 12, 18)
      )
    ).toBe(true);
    expect(
      Iodine.isAfterOrEqual(new Date(year, 12, 18), new Date(year, 12, 18))
    ).toBe(true);
    expect(Iodine.isAfterOrEqual(new Date(year - 1, 12, 17), Date.now())).toBe(
      false
    );
    expect(Iodine.isAfterOrEqual(new Date(year - 1, 12, 17), "now")).toBe(
      false
    );
    expect(Iodine.isAfterOrEqual("now", new Date(year - 1, 12, 17))).toBe(
      false
    );
    expect(Iodine.isAfterOrEqual("now", "now")).toBe(false);
  });

  /**
   * Confirm that the 'isBefore' method works correctly.
   *
   **/
  test("before date values", () => {
    let year = new Date().getFullYear();
    expect(
      Iodine.isBefore(new Date(year - 1, 12, 18), new Date(year, 12, 18))
    ).toBe(true);
    expect(Iodine.isBefore(new Date(year - 1, 12, 17), Date.now())).toBe(true);
    expect(
      Iodine.isBefore(
        new Date(`December 18, ${year - 1} 03:24:00`),
        new Date(year, 12, 18)
      )
    ).toBe(true);
    expect(Iodine.isBefore(new Date(year + 1, 12, 17), Date.now())).toBe(false);
    expect(Iodine.isBefore(new Date(year + 1, 12, 17), "now")).toBe(false);
    expect(Iodine.isBefore("now", new Date(year + 1, 12, 17))).toBe(false);
    expect(Iodine.isBefore("now", "now")).toBe(false);
  });

  /**
   * Confirm that the 'isBeforeOrEqual' method works correctly.
   *
   **/
  test("before or equal date values", () => {
    let year = new Date().getFullYear();
    expect(
      Iodine.isBeforeOrEqual(new Date(year - 1, 12, 18), new Date(year, 12, 18))
    ).toBe(true);
    expect(Iodine.isBeforeOrEqual(new Date(year - 1, 12, 17), Date.now())).toBe(
      true
    );
    expect(
      Iodine.isBeforeOrEqual(
        new Date(`December 18, ${year - 1} 03:24:00`),
        new Date(year, 12, 18)
      )
    ).toBe(true);
    expect(
      Iodine.isBeforeOrEqual(new Date(year, 12, 18), new Date(year, 12, 18))
    ).toBe(true);
    expect(Iodine.isBeforeOrEqual(new Date(year + 1, 12, 17), Date.now())).toBe(
      false
    );
    expect(Iodine.isBeforeOrEqual(new Date(year + 1, 12, 17), "now")).toBe(
      false
    );
    expect(Iodine.isBeforeOrEqual("now", new Date(year + 1, 12, 17))).toBe(
      false
    );
    expect(Iodine.isBeforeOrEqual("now", "now")).toBe(false);
  });

  /**
   * Confirm that the 'isArray' method works correctly.
   *
   **/
  test("array values", () => {
    expect(Iodine.isArray([1, 2, 3])).toBe(true);
    expect(Iodine.isArray(["1", "2", "3"])).toBe(true);
    expect(Iodine.isArray(1)).toBe(false);
    expect(Iodine.isArray("1")).toBe(false);
  });

  /**
   * Confirm that the 'isBoolean' method works correctly.
   *
   **/
  test("boolean values", () => {
    expect(Iodine.isBoolean(true)).toBe(true);
    expect(Iodine.isBoolean(false)).toBe(true);
    expect(Iodine.isBoolean(1)).toBe(false);
    expect(Iodine.isBoolean("1")).toBe(false);
  });

  /**
   * Confirm that the 'isDate' method works correctly.
   *
   **/
  test("date values", () => {
    expect(Iodine.isDate(new Date(1995, 12, 17))).toBe(true);
    expect(Iodine.isDate(new Date("December 17, 1995 03:24:00"))).toBe(true);
    expect(Iodine.isDate(1)).toBe(false);
    expect(Iodine.isDate("1")).toBe(false);
  });

  /**
   * Confirm that the 'isDifferent' method works correctly.
   *
   **/
  test("different values", () => {
    expect(Iodine.isDifferent(1, 2)).toBe(true);
    expect(Iodine.isDifferent("x", "y")).toBe(true);
    expect(Iodine.isDifferent(1, 1)).toBe(false);
    expect(Iodine.isDifferent("x", "x")).toBe(false);
  });

  /**
   * Confirm that the 'isEndingWith' method works correctly.
   *
   **/
  test("a value ends with another value", () => {
    expect(Iodine.isEndingWith("hello world", "world")).toBe(true);
    expect(Iodine.isEndingWith("hello universe", "world")).toBe(false);
  });

  /**
   * Confirm that the 'isEmail' method works correctly.
   *
   **/
  test("email values", () => {
    expect(Iodine.isEmail("john@example.com")).toBe(true);
    expect(Iodine.isEmail("m@i.com")).toBe(true);
    expect(Iodine.isEmail("😃@i.com")).toBe(true);
    expect(Iodine.isEmail("")).toBe(false);
    expect(Iodine.isEmail("45454.com")).toBe(false);
    expect(Iodine.isEmail("sdfsf@")).toBe(false);
  });

  /**
   * Confirm that the 'isFalsy' method works correctly.
   *
   **/
  test("falsy values", () => {
    expect(Iodine.isFalsy(false)).toBe(true);
    expect(Iodine.isFalsy("false")).toBe(true);
    expect(Iodine.isFalsy(0)).toBe(true);
    expect(Iodine.isFalsy("0")).toBe(true);
    expect(Iodine.isFalsy(true)).toBe(false);
    expect(Iodine.isFalsy("true")).toBe(false);
    expect(Iodine.isFalsy(1)).toBe(false);
    expect(Iodine.isFalsy("1")).toBe(false);
  });

  /**
   * Confirm that the 'isIn' method works correctly.
   *
   **/
  test("in list values", () => {
    expect(Iodine.isIn("a", "a,b,c")).toBe(true);
    expect(Iodine.isIn("a", ["a", "b", "c"])).toBe(true);
    expect(Iodine.isIn("d", "a,b,c")).toBe(false);
    expect(Iodine.isIn("d", ["a", "b", "c"])).toBe(false);
  });

  /**
   * Confirm that the 'isInteger' method works correctly.
   *
   **/
  test("integer values", () => {
    expect(Iodine.isInteger(1)).toBe(true);
    expect(Iodine.isInteger(1.5)).toBe(false);
    expect(Iodine.isInteger("1")).toBe(false);
  });

  /**
   * Confirm that the 'isJson' method works correctly.
   *
   **/
  test("json values", () => {
    expect(Iodine.isJson("{}")).toBe(true);
    expect(Iodine.isJson('{"a" : 3}')).toBe(true);
    expect(Iodine.isJson("1")).toBe(false);
    expect(Iodine.isJson("")).toBe(false);
  });

  /**
   * Confirm that the 'isMaximum' method works correctly.
   *
   **/
  test("maximum values", () => {
    expect(Iodine.isMaximum(1, 5)).toBe(true);
    expect(Iodine.isMaximum(5, 5)).toBe(true);
    expect(Iodine.isMaximum(6, 5)).toBe(false);
    expect(Iodine.isMaximum("1", 5)).toBe(true);
    expect(Iodine.isMaximum("12345", 5)).toBe(true);
    expect(Iodine.isMaximum("123456", 5)).toBe(false);
  });

  /**
   * Confirm that the 'isMinimum' method works correctly.
   *
   **/
  test("minimum values", () => {
    expect(Iodine.isMinimum(6, 5)).toBe(true);
    expect(Iodine.isMinimum(5, 5)).toBe(true);
    expect(Iodine.isMinimum(4, 5)).toBe(false);
    expect(Iodine.isMinimum("123456", 5)).toBe(true);
    expect(Iodine.isMinimum("12345", 5)).toBe(true);
    expect(Iodine.isMinimum("1234", 5)).toBe(false);
  });

  /**
   * Confirm that the 'isNotIn' method works correctly.
   *
   **/
  test("not in list values", () => {
    expect(Iodine.isNotIn("d", "a,b,c")).toBe(true);
    expect(Iodine.isNotIn("d", ["a", "b", "c"])).toBe(true);
    expect(Iodine.isNotIn("a", "a,b,c")).toBe(false);
    expect(Iodine.isNotIn("a", ["a", "b", "c"])).toBe(false);
  });

  /**
   * Confirm that the 'isNumeric' method works correctly.
   *
   **/
  test("numeric values", () => {
    expect(Iodine.isNumeric(1)).toBe(true);
    expect(Iodine.isNumeric(2.5)).toBe(true);
    expect(Iodine.isNumeric(3.45)).toBe(true);
    expect(Iodine.isNumeric("13")).toBe(true);
    expect(Iodine.isNumeric("14.55")).toBe(true);
    expect(Iodine.isNumeric("17.0")).toBe(true);
    expect(Iodine.isNumeric("abc")).toBe(false);
  });

  /**
   * Confirm that the 'isOptional' method works correctly.
   *
   **/
  test("optional values", () => {
    expect(Iodine.isOptional(1)).toBe(false);
    expect(Iodine.isOptional("1")).toBe(false);
    expect(Iodine.isOptional("")).toBe(true);
    expect(Iodine.isOptional(null)).toBe(true);
    expect(Iodine.isOptional(undefined)).toBe(true);
  });

  /**
   * Confirm that the 'isRegexMatch' method works correctly.
   *
   **/
  test("regular expression values", () => {
    expect(Iodine.isRegexMatch("P54655465", "^P\\d{3,}$")).toBe(true);
    expect(
      Iodine.isRegexMatch("john@example.com", "^\\S+@\\S+[\\.][0-9a-z]+$")
    ).toBe(true);
    expect(Iodine.isRegexMatch("1234", "^\\S+@\\S+[\\.][0-9a-z]+$")).toBe(
      false
    );
  });

  /**
   * Confirm that the 'isRequired' method works correctly.
   *
   **/
  test("required values", () => {
    expect(Iodine.isRequired(1)).toBe(true);
    expect(Iodine.isRequired("1")).toBe(true);
    expect(Iodine.isRequired("")).toBe(false);
    expect(Iodine.isRequired(null)).toBe(false);
    expect(Iodine.isRequired(undefined)).toBe(false);
  });

  /**
   * Confirm that the 'isSame' method works correctly.
   *
   **/
  test("same values", () => {
    expect(Iodine.isSame(1, 1)).toBe(true);
    expect(Iodine.isSame("x", "x")).toBe(true);
    expect(Iodine.isSame(1, 2)).toBe(false);
    expect(Iodine.isSame("x", "y")).toBe(false);
  });

  /**
   * Confirm that the 'isStartingWith' method works correctly.
   *
   **/
  test("a value starts with another value", () => {
    expect(Iodine.isStartingWith("hello world", "hello")).toBe(true);
    expect(Iodine.isStartingWith("bye world", "hello")).toBe(false);
  });

  /**
   * Confirm that the 'isString' method works correctly.
   *
   **/
  test("string values", () => {
    expect(Iodine.isString(1)).toBe(false);
    expect(Iodine.isString("1")).toBe(true);
  });

  /**
   * Confirm that the 'isTruthy' method works correctly.
   *
   **/
  test("truthy values", () => {
    expect(Iodine.isTruthy(true)).toBe(true);
    expect(Iodine.isTruthy("true")).toBe(true);
    expect(Iodine.isTruthy(1)).toBe(true);
    expect(Iodine.isTruthy("1")).toBe(true);
    expect(Iodine.isTruthy(false)).toBe(false);
    expect(Iodine.isTruthy("false")).toBe(false);
    expect(Iodine.isTruthy(0)).toBe(false);
    expect(Iodine.isTruthy("0")).toBe(false);
  });

  /**
   * Confirm that the 'isUrl' method works correctly.
   *
   **/
  test("url values", () => {
    expect(Iodine.isUrl("http://www.google.com")).toBe(true);
    expect(Iodine.isUrl("1234")).toBe(false);
  });

  /**
   * Confirm that the 'isUuid' method works correctly.
   *
   **/
  test("UUID values", () => {
    expect(Iodine.isUuid("9034dfa4-49d9-4e3f-9c6d-bc6a0e2233d1")).toBe(true);
    expect(Iodine.isUuid("XAZLYYZeNu75xkicYcPoBWhAW0AX2HRlbqbK")).toBe(false);
  });
});

describe("validate values against multiple rules", () => {
  /**
   * Confirm that the 'is' method works correctly.
   *
   **/
  test("return true/failed rule", () => {
    expect(
      Iodine.is("5", ["required", "string", "minimum:1", "maximum:5"])
    ).toBe(true);
    expect(
      Iodine.is(5, ["required", "integer", "minimum:7", "maximum:10"])
    ).toBe("minimum:7");
    expect(
      Iodine.is(5, ["optional", "integer", "minimum:7", "maximum:10"])
    ).toBe("minimum:7");
    expect(
      Iodine.is("", ["optional", "integer", "minimum:7", "maximum:10"])
    ).toBe(true);
    expect(
      Iodine.is(null, ["optional", "integer", "minimum:7", "maximum:10"])
    ).toBe(true);
    expect(
      Iodine.is(undefined, ["optional", "integer", "minimum:7", "maximum:10"])
    ).toBe(true);
  });

  /**
   * Confirm that the 'isValid' method returns the right value against multiple rules.
   *
   **/
  test("return true/false", () => {
    expect(
      Iodine.isValid("5", ["required", "string", "minimum:1", "maximum:5"])
    ).toBe(true);
    expect(
      Iodine.isValid(5, ["required", "integer", "minimum:7", "maximum:10"])
    ).toBe(false);
    expect(
      Iodine.isValid(5, ["optional", "integer", "minimum:7", "maximum:10"])
    ).toBe(false);
    expect(
      Iodine.isValid("", ["optional", "integer", "minimum:7", "maximum:10"])
    ).toBe(true);
    expect(
      Iodine.isValid(null, ["optional", "integer", "minimum:7", "maximum:10"])
    ).toBe(true);
    expect(
      Iodine.isValid(undefined, [
        "optional",
        "integer",
        "minimum:7",
        "maximum:10",
      ])
    ).toBe(true);
  });

  test('parameter that contains semicolon(":")', () => {
    expect(Iodine.is(":b", ["required", "regexMatch:^:\\w$"])).toBe(true);
    expect(Iodine.is("a:b", ["required", "regexMatch:^:\\w$"])).not.toBe(true);
    expect(Iodine.is(":b", ["required", "regexMatch:^:\\w$"])).toBe(true);
    expect(Iodine.is("a:b", ["required", "regexMatch:^:\\w$"])).not.toBe(true);
  });
});

describe("error messages", () => {
  /**
   * Confirm that the 'getErrorMessage' method works correctly.
   *
   **/
  test("it retrieves formatted error messages for rules", () => {
    let time = Date.UTC(2020, 4, 2, 10, 17, 0);

    Iodine.setLocale("en-US");

    let hour = new Date(parseInt(time)).getHours();

    expect(Iodine.getErrorMessage("array")).toBe("Value must be an array");
    expect(Iodine.getErrorMessage("endingWith")).toBe(
      `Value must end with '[PARAM]'`
    );
    expect(Iodine.getErrorMessage("endingWith:world")).toBe(
      `Value must end with 'world'`
    );
    expect(Iodine.getErrorMessage("endingWith", "world")).toBe(
      `Value must end with 'world'`
    );

    expect(Iodine.getErrorMessage("endingWith", { field: 'Song title'})).toBe(
      `Song title must end with '[PARAM]'`
    );
    expect(Iodine.getErrorMessage("endingWith:world", { field: 'Song title' })).toBe(
      `Song title must end with 'world'`
    );
    expect(Iodine.getErrorMessage("endingWith", { field: 'Song title', param: 'world'})).toBe(
      `Song title must end with 'world'`
    );
    expect(Iodine.getErrorMessage("endingWith", { param: 'world'})).toBe(
      `Value must end with 'world'`
    );

    expect(Iodine.getErrorMessage(`after:${time}`)).toBe(
      `The date must be after: 'May 2, 2020, ${hour}:17'`
    );
    expect(Iodine.getErrorMessage(`after`, time)).toBe(
      `The date must be after: 'May 2, 2020, ${hour}:17'`
    );
  });

  /**
   * Confirm that the default error messages can be replaced.
   *
   **/
  test("it can replace the default error messages", () => {
    Iodine.setErrorMessages({
      array: "Hello world",
      endingWith: "Hello, [PARAM]",
      startingWith: "[FIELD]: [PARAM] says, 'hello'"
    });
    expect(Iodine.getErrorMessage("array")).toBe("Hello world");
    expect(Iodine.getErrorMessage("endingWith:John")).toBe("Hello, John");
    expect(Iodine.getErrorMessage("endingWith", "John")).toBe("Hello, John");
    expect(Iodine.getErrorMessage("endingWith", { param: "John" })).toBe("Hello, John");
    expect(Iodine.getErrorMessage("endingWith", "John")).toBe("Hello, John");
    expect(Iodine.getErrorMessage("startingWith:Paul")).toBe("Value: Paul says, 'hello'");
    expect(Iodine.getErrorMessage("startingWith", "Paul")).toBe("Value: Paul says, 'hello'");
    expect(Iodine.getErrorMessage("startingWith", { param: "Paul" })).toBe("Value: Paul says, 'hello'");
    expect(Iodine.getErrorMessage("startingWith:Paul", { field: "Name" })).toBe("Name: Paul says, 'hello'");
    expect(Iodine.getErrorMessage("startingWith", { field: "Name", param: "Paul" })).toBe("Name: Paul says, 'hello'");
  });

  /**
   * Confirm that a single error message can be replaced.
   *
   **/
  test("it can replace a default error message", () => {
    const messagesCount = Object.keys(Iodine.messages).length;

    Iodine.setErrorMessage("email", "Does not look like a valid email");
    expect(Iodine.getErrorMessage("email")).toBe(
      "Does not look like a valid email"
    );

    // Sanity checks the we have not replaced all error messages
    expect(Object.keys(Iodine.messages).length).toEqual(messagesCount);
    expect(Iodine.getErrorMessage("date")).toBe("Value must be a date");
  });

  /**
   * Confirm that a single error message can be added to the set.
   *
   **/
  test("it can add an error message to the set", () => {
    const messagesCount = Object.keys(Iodine.messages).length;

    Iodine.setErrorMessage(
      "passwordConfirmation",
      "Password confirmation needs to match"
    );
    expect(Iodine.getErrorMessage("passwordConfirmation")).toBe(
      "Password confirmation needs to match"
    );
    expect(Object.keys(Iodine.messages).length).toEqual(messagesCount + 1);
  });
});

describe("custom rules", () => {
  /**
   * Confirm that the 'addRule' method works correctly for simple rules.
   *
   **/
  test("it can add simple custom rules", () => {
    Iodine.addRule("lowerCase", (value) => value === value.toLowerCase());
    Iodine.setErrorMessages({ lowerCase: "Value must be in lower case" });
    expect(Iodine.isLowerCase("hello")).toBe(true);
    expect(Iodine.isLowerCase("Hello")).toBe(false);
    expect(Iodine.isLowerCase("HELLO")).toBe(false);
    expect(Iodine.is("hello", ["required", "lowerCase"])).toBe(true);
    expect(Iodine.is("Hello", ["required", "lowerCase"])).toBe("lowerCase");
    expect(Iodine.is("HELLO", ["required", "lowerCase"])).toBe("lowerCase");
    expect(Iodine.getErrorMessage("lowerCase")).toBe(
      "Value must be in lower case"
    );
  });

  /**
   * Confirm that the 'addRule' method works correctly for advanced rules.
   *
   **/
  test("it can add advanced custom rules", () => {
    Iodine.addRule("equals", (value, param) => value == param);
    Iodine.setErrorMessages({ equals: `Value must be equal to '[PARAM]'` });
    expect(Iodine.isEquals(1, 1)).toBe(true);
    expect(Iodine.isEquals(1, 2)).toBe(false);
    expect(Iodine.isEquals(1, 3)).toBe(false);
    expect(Iodine.is(1, ["required", "equals:1"])).toBe(true);
    expect(Iodine.is(1, ["required", "equals:2"])).toBe("equals:2");
    expect(Iodine.is(1, ["required", "equals:3"])).toBe("equals:3");
    expect(Iodine.getErrorMessage("equals:2")).toBe(
      `Value must be equal to '2'`
    );
    expect(Iodine.getErrorMessage("equals", 2)).toBe(
      `Value must be equal to '2'`
    );
  });
});
