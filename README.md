# React Styleguide 💅
> **Note**: This styleguide only covers React components and Redux state management and effects.

Install this styleguide by adding the following line to your package.json
```diff
"dependencies": {
+  "eslint-config-webiq": "git+ssh://git@github.com/webiq/react.styleguide.git",
}
```
After installing this package you can add this config to the *extends* array:
```diff
module.exports = {
    extends: [
+        'eslint-config-webiq',
    ],
}
```

## Table of Contents
  1. [Programming style](#programming-style)
  2. [Side effects](#side-effects)
  3. [Method chaining](#method-chaining)
  4. [React components](#react-components)
  5. [React props](#react-props)
  6. [Selectors](#selectors)
  7. [External data](#external-data)
  8. [Component structure](#component-structure)
  9. [Storybook](#storybook)
  

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

## React components
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
```typescript
// wrong
<ProductCard {...product} />

// good
<ProductCard product={product} />
```

When using callbacks and events, always start the property name with `on`, for example `onClick`
```typescript
// wrong
<Button click={() => {}} />

// good
<Button onClick={() => {}} />
```

## Selectors
Use the package [reselect](https://github.com/reduxjs/reselect) for writing selectors.
Every selector should return an [Option](https://gcanti.github.io/fp-ts/modules/Option.ts.html).

Example:
```typescript
import { createSelector } from 'reselect'
import { Option } from 'fp-ts/Option'

export type Selector<R> = ReselectSelector<AppState, Option<R>>

// this selector returns a Option that could be true or false
const selector: Selector<boolean> = createSelector(
	...
)
```

## External data
Data from external sources can never be trusted. Therefore one should always use the type `unknown` as type for external data (from a HTTP request for example).
The `unknown` type can be converted to a typed object using [io-ts](https://github.com/gcanti/io-ts).

```typescript
import * as t from 'io-ts'

const User = t.type({
	email: t.string,
	name: t.string,
	age: t.number,
})

const data: unknown = getDataFromExternalDataSource()

User.decode(data) // returns an Either with a user or an error
```

## Component structure
Every component should have its own folder.

```
project
│ README.md
│
└───components
│   │
│   └───header
│       │   index.ts
│       │   Header.tsx
│       │   SimpleHeader.tsx
│       │   Header.stories.tsx
│       │   style.ts
```

The file `index.ts` exports all the components, so they can be easily imported elsewhere.
```typescript
import Header from './Header'
import SimpleHeader from './SimpleHeader'

export { Header, SimpleHeader }
```

The file `style.ts` contains all styling related code.


## Storybook
For every react component there should always be a story be made. Always Include the story in the directory of the component.
Remember to make a story for every variation of a component

```typescript
import React from 'react';
// import the 2 types that storybook uses 
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from './Button';

export default {
    title: 'Components/ui/Button',
    component: Button,
    argTypes: {},
} as Meta;

// Set the default template for your story 
const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// Make a new story and pass the props the component needs 
export const Primary = Template.bind({});
Primary.args = {
    children: 'Klik hier!',
    // if there is a onClick function always make this a alert so there is a 
    onClick: () => alert('Click!'),
    color: COLORS.PRIMARY,
};
```