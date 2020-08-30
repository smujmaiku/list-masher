# List Masher

Do you have a lot string you want to mash together?
Would you like to slightly obfuscate this data just enough?
Do you miss long NES passwords?

Mash your list!

## Installation

`npm i list-masher`

## Usage

### encode

```js
encode(['some', 'mock', '', 'data']));
// 'BABzbQBkb29hbWN0ZWth'
```

### decode

```js
decode('BABzbQBkb29hbWN0ZWth');
// ['some', 'mock', '', 'data']
]
```

## License

Copyright (c) 2020, Michael Szmadzinski. (MIT License)
