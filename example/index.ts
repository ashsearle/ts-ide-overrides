/*
 * Edit this file to check kebab-case comment directives are recognized properly.
 * Examples of code to trigger each type of error are copied from TypeScript documentation.
 *
 * All options can be enabled or disabled via kebab-case comments, e.g.:
 * - @ts-ide-enable-strict
 * - @ts-ide-disable-strict-null-checks
 *
 * The "strict mode family" options:
 * strict
 * alwaysStrict - always-strict
 * strictNullChecks - strict-null-checks
 * strictBindCallApply - strict-bind-call-apply
 * strictFunctionTypes - strict-function-types
 * strictPropertyInitialization - strict-property-initialization
 * noImplicitAny - no-implicit-any
 * noImplicitThis - no-implicit-this
 * useUnknownInCatchVariables - use-unknown-in-catch-variables
 *
 * Other boolean type-checking options:
 * allowUnreachableCode - allow-unreachable-code
 * allowUnusedLabels - allow-unused-labels
 * exactOptionalPropertyTypes - exact-optional-property-types
 * noFallthroughCasesInSwitch - no-fallthrough-cases-in-switch
 * noImplicitOverride - no-implicit-override
 * noImplicitReturns - no-implicit-returns
 * noPropertyAccessFromIndexSignature - no-property-access-from-index-signature
 * noUncheckedIndexedAccess - no-unchecked-indexed-access
 * noUnusedLocals - no-unused-locals
 * noUnusedParameters - no-unused-parameters
 */
/// Examples for "strict mode family" options:
// Example for strictBindCallApply
function fn(x: string) {
  return parseInt(x);
}

const n1 = fn.call(undefined, '10');

// expected-error "Argument of type 'boolean' is not assignable to parameter of type 'string'"
const n2 = fn.call(undefined, false);

// Example for strictFunctionTypes
function fn2(x: string) {
  console.log('Hello, ' + x.toLowerCase());
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
  { name: 'Oby', age: 12 },
  { name: 'Heera', age: 32 },
];

const loggedInUser = users.find((u) => u.name === loggedInUsername);
// expected-error "Object is possibly 'undefined'."
console.log(loggedInUser.age);

// Example for strictPropertyInitialization
class UserAccount {
  name: string;
  accountType = 'user';

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

/// Examples for other boolean type-checking options:
// Example for allowUnreachableCode: boolean | undefined
function unreachableExample(n: number) {
  if (n > 5) {
    return true;
  } else {
    return false;
  }
  // enable option to suppress 'Unreachable code detected.' tooltip
  return true;
}

// Example for allowUnusedLabels: boolean | undefined
function verifyAge(age: number) {
  // Forgot 'return' statement
  if (age > 18) {
    // enable option to suppress 'Unused label.' warning
    verified: true;
  }
}

// Example for exactOptionalPropertyTypes: boolean
interface UserDefaults {
  // The absence of a value represents 'system'
  colorThemeOverride?: 'dark' | 'light';
}
const getSettings = (): UserDefaults => {
  const settings: UserDefaults = {};
  // expected-error "...?"
  settings.colorThemeOverride = undefined;
  return settings;
};
const settings = getSettings();

// Example for noFallthroughCasesInSwitch: boolean
switch (settings.colorThemeOverride) {
  // expected-error "Fallthrough case in switch."
  case 'dark':
    console.log('dark');
  case 'light':
    console.log('here');
    break;
}

// Example for noImplicitOverride: boolean
class Album {
  setup() {}
}
class MLAlbum extends Album {
  override setup() {}
}
class SharedAlbum extends Album {
  // expected-error This member must have an 'override' modifier because it overrides a member in the base class 'Album'.
  setup() {}
}

// Example for noImplicitReturns: boolean
function lookupHeadphonesManufacturer(color: 'blue' | 'black'): unknown {
  // expected-error "Not all code paths return a value."
  if (color === 'blue') {
    return 'beats';
  } else {
    ('bose');
  }
}

// Example for noPropertyAccessFromIndexSignature
interface GameSettings {
  predefined: 'classic' | 'modern';
  [key: string]: string;
}
const gameSettings: GameSettings = { predefined: 'modern' };
// expected-error "Property 'username' comes from an index signature, so it must be accessed with ['username']."
gameSettings.username = 'foo';

// Example for noUncheckedIndexedAccess: boolean
interface EnvironmentVars {
  NAME: string;
  OS: string;

  // Unknown properties are covered by this index signature.
  [propName: string]: string;
}
declare const env: EnvironmentVars;
// no error, but hover over to see if type is "string | undefined" with noUncheckedIndexedAccess enabled
const nodeEnv = env.NODE_ENV;

// Example for noUnusedLocals: boolean
const someFn = () => {
  // expected-error "'unused' is declared but its value is never read."
  const unused = 3;
};

// Example for noUnusedParameters: boolean
// expected-error "'typed' is declared but its value is never read."
const foo = (typed: string) => {};
