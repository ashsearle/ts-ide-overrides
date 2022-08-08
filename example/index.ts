/*
 * Edit this file to add or remove comments starting with  @ts-ide- directives.
 *
 * All strict optiosn are available as enable and disable directives:
 * - @ts-ide-enable-strict
 * - @ts-ide-enable-always-strict
 * - @ts-ide-enable-strict-null-checks
 * - @ts-ide-enable-strict-bind-call-apply
 * - @ts-ide-enable-strict-function-types
 * - @ts-ide-enable-strict-property-initialization
 * - @ts-ide-enable-no-implicit-any
 * - @ts-ide-enable-no-implicit-this
 * - @ts-ide-enable-use-unknown-in-catch-variables
 *
 * Examples of code to trigger each type of error are copied from TypeScript documentation.
 */

// Example for strictBindCallApply
function fn(x: string) {
  return parseInt(x);
}

const n1 = fn.call(undefined, "10");

// expected-error "Argument of type 'boolean' is not assignable to parameter of type 'string'"
const n2 = fn.call(undefined, false);

// Example for strictFunctionTypes
function fn2(x: string) {
  console.log("Hello, " + x.toLowerCase());
}

type StringOrNumberFunc = (ns: string | number) => void;

// Example for Unsafe assignment
// expected-error "Type '(x: string) => void' is not assignable to type 'StringOrNumberFunc'."
let func: StringOrNumberFunc = fn2;
// Unsafe call - will crash
func(10);

// Example for strictNullChecks
declare const loggedInUsername: string;

const users = [
  { name: "Oby", age: 12 },
  { name: "Heera", age: 32 },
];

const loggedInUser = users.find((u) => u.name === loggedInUsername);
// expected-error "Object is possibly 'undefined'."
console.log(loggedInUser.age);

// Example for strictPropertyInitialization
class UserAccount {
  name: string;
  accountType = "user";

  // expected-error "Property 'email' has no initializer and is not definitely assigned in the constructor."
  email: string;
  address: string | undefined;

  constructor(name: string) {
    this.name = name;
    // Note that this.email is not set
  }
}

// Example for useUnknownInCatchVariables
try {
  // ...
} catch (err) {
  // expected-error "...?"
  console.log(err.message);
  // We have to verify err is an
  // error before using it as one.
  if (err instanceof Error) {
    console.log(err.message);
  }
}
