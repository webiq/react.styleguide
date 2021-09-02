# React StyleGuide 💅
> **Note**: This styleguide only covers React components and Redux state management and effects.

## Table of Contents
  1. [Programming style](#programming-style)
  2. [Side effects](#side-effects)

## Programming Style
The functional programming paradigma should be applied to all front-end code. Sometimes you're forced to work with imperative or object-oriented code (for example a library). Follow [this guide](https://dev.to/gcanti/interoperability-with-non-functional-code-using-fp-ts-432e) on how to handle this.

[🔝back to top](#table-of-contents)

## Side effects
Despite we functional programmers all hate side-effects, we can't live without it.
Every side effect should be encapsulated in an [IO monad](https://gcanti.github.io/fp-ts/modules/IO.ts.html), a [Task](https://gcanti.github.io/fp-ts/modules/Task.ts.html), or a [TaskEither](https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html) (if it's over time).

[🔝back to top](#table-of-contents)
