# Prettier Plugin Tailwind CSS PX to REM

![npm version](https://img.shields.io/npm/v/prettier-plugin-tailwind-px-to-rem)
![license](https://img.shields.io/npm/l/prettier-plugin-tailwind-px-to-rem)
![downloads](https://img.shields.io/npm/dt/prettier-plugin-tailwind-px-to-rem)

A Prettier plugin that converts pixel (px) values to rem units in Tailwind CSS classes with arbitrary value, ensuring scalable and responsive design.

**Currently, it works only with JSX.**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Limitations](#limitations)
- [Example](#example)
- [Configuration](#configuration)
- [License](#license)

## Installation

You can install the plugin via npm or yarn:

```bash
npm install --save-dev prettier-plugin-tailwind-px-to-rem
```
or
```bash
yarn add --dev prettier-plugin-tailwind-px-to-rem
```

## Usage

Add the plugin to your Prettier configuration file (.prettierrc or prettier.config.js):

```json
{
  "plugins": ["prettier-plugin-tailwind-px-to-rem"]
}
```

## Limitations

Currently, it works only with JSX.

## Example

#### React.js

Input:

```jsx
import React from 'react';

const Greeting = () => {
  return (
    <h1 className="p-[5px] m-[10px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">Hello, world!</h1>
  );
};

export default Greeting;
```

Output:

```jsx
import React from 'react';

const Greeting = () => {
  return (
    <h1 className="p-[0.3125rem] m-[0.625rem] shadow-[0_2.1875rem_3.75rem_-0.9375rem_rgba(0,0,0,0.3)]">Hello, world!</h1>
  );
};

export default Greeting;
```

Now, when you run Prettier, the plugin will automatically convert px values to rem units in your Tailwind CSS classes with arbitrary value.

## Configuration

By default, the plugin uses a base pixel value of 16px for conversion. If you want to change the base value, you can add a configuration option to your Prettier config:

```json
{
  "plugins": ["prettier-plugin-tailwind-px-to-rem"],
  "tailwindcssPxToRemBaseValue": 16
}
```

## License

This project is licensed under the ISC License.
