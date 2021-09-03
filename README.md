# React Styleguide 💅
> **Note**: This styleguide only covers React components and Redux state management and effects.

Install this styleguide by adding the following line to your package.json
```diff
"dependencies": {
+  "eslint-config-webiq": "git+ssh://git@github.com/webiq/react.styleguide.git",
}
```
After installating this package you can add this config to the *extends* array:
```diff
module.exports = {
    extends: [
+        'eslint-config-webiq'
    ]
}
```

## Table of Contents
  1. [Programming style](#programming-style)
  2. [Side effects](#side-effects)
  3. [Method chaining](#method-chaining)
  4. [React components](#react-components)
  5. [React props](#react-props)

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

## React component
React components should always be a function component.

```typescript
import React from 'react'
import { Text } from 'react-native'

const HelloWorld: React.FC = () => (
        <Text>Hello, world</Text>
)
```

## React props
All react props should always described using a type.
```typescript
import React from 'react'
import { Text } from 'react-native'

type HelloProps = {
    readonly name: string
}

const Hello: React.FC<HelloProps> = (props) => (
        <Text>Hello, {props.name}</Text>
)
```

When passing an entity (like a product) to a component, don't pass every property with a spread operator but pass the complete entity.
```
// wrong
<ProductCard {...product} />

// good
<ProductCard product={product} />
```

When using callbacks and events, always start the property name with `on`, for example `onClick`
```
// wrong
<Button click={() => {}} />

// good
<Button onClick={() => {}} />
```
