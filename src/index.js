/**
 * Finds all matches and replaces all values. The replaceValueCallback should
 * return new value to replace the original match. Returns new string.
 *
 * @param {RegExp} globalRegex Should have /gm modifiers
 * @param {string} string
 * @param {function} replaceValueCallback Receives the matches array as first argument.
 * @return {string}
 */
export default function matchReplaceAll (globalRegex, string, replaceValueCallback) {
    // A list of values to replace
    let toReplace = []
    let matches

    // Loop all matches and build a map which values to to replace
    while ((matches = globalRegex.exec(string)) !== null) {
        // Create new value
        const originalValue = matches[0]
        const newValue = replaceValueCallback(matches)

        // If the string is same or false is received, skip replacement
        if (newValue === false || originalValue === newValue) {
            continue
        }

        // Store info which part of string to replace
        toReplace.push([
            originalValue,
            newValue
        ])
    }

    // Build the new string
    let theString = string

    // Replace the value - original / new value for all occurrences
    for (let i = 0; i < toReplace.length; i++) {
        const values = toReplace[i]
        theString = theString.replace(values[0], values[1])
    }

    return theString
}
