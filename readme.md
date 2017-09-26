# Match all occurrences in string and replace it
Finds all occurrences in the string for given regex and replaces the value with a new string (using callback function).

## Install

```bash
npm install match-replace-all
```

## Usage

- Create a new RegExp object with `global` and `multiline` option.
- Provide a callback that will receive match array and return a new string that will replace the **original string**.
- Callback can return `false` to skip replacement.
- If the new value is same as original, no replacement is done.

```javascript
import matchReplaceAll from 'match-replace-all'

const regex = new RegExp('<a([^>]*)>([^<]+)</a>', 'gm')
const string = 'testing <a>first</a> <a target="_blank">second</a>'
// Add href attribute to link with the links value
const newString = matchReplaceAll(regex, string, (match) => {
        const value = match[2]
        const attributes = match[1]
        return `<a href="http://${value}"${attributes}>${value}</a>`
    })
console.log(newString)
``` 

Result:
```bash
Result: testing <a href="http://first">first</a> <a href="http://second" target="_blank">second</a>
```