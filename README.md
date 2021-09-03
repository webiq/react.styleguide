# React StyleGuide 💅
> **Note**: This styleguide only covers React components and Redux state management and effects.

## Table of Contents
  1. [Programming style](#programming-style)
  2. [Side effects](#side-effects)
  3. [Method chaining](#method-chaining)

## Programming Style
The functional programming paradigma should be applied to all front-end code.
Sometimes you're forced to work with imperative or object-oriented code (for example a library). Follow [this guide](https://dev.to/gcanti/interoperability-with-non-functional-code-using-fp-ts-432e) on how to handle this.
Immutability and the use of classes and interfaces is not in line with the styleguide.

```typescript
const user = {
    firstname: 'John',
    lastname: 'Coltrane',
}

// wrong
user.firstname = 'Alice'

// good
const newUser = {
    ...user,
    firstname: 'Alice',
}
```

## Side effects
Despite we functional programmers all hate side-effects, we can't live without it.
Every side effect should be encapsulated in an [IO monad](https://gcanti.github.io/fp-ts/modules/IO.ts.html), a [Task](https://gcanti.github.io/fp-ts/modules/Task.ts.html), or a [TaskEither](https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html) (if it's over time).

## Method chaining
Function composition is always prefered over method chaining due to reusability, referentional transparency and no prototype pollution.

```typescript
const numbers = [1, 2, 3, 4, 5]

// wrong
const result = numbers
    .map((n) => n * 2)
    .reduce((sum, cur) => sum + cur, 0)

// good
import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/ReadonlyArray'

const result = pipe(
    numbers,
    A.map((n) => n * 2),
    A.reduce(0, (sum, cur) => sum + cur),
)
```
