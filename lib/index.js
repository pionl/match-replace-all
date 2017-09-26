"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = matchReplaceAll;
/**
 * Finds all matches and replaces all values. The replaceValueCallback should
 * return new value to replace the original match. Returns new string.
 *
 * @param {RegExp} globalRegex Should have /gm modifiers
 * @param {string} string
 * @param {function} replaceValueCallback Receives the matches array as first argument.
 * @return {string}
 */
function matchReplaceAll(globalRegex, string, replaceValueCallback) {
    // A list of values to replace
    var toReplace = [];
    var matches = void 0;

    // Loop all matches and build a map which values to to replace
    while ((matches = globalRegex.exec(string)) !== null) {
        // Create new value
        var newValue = replaceValueCallback(matches);

        // Store info which part of string to replace
        toReplace.push([matches[0], newValue]);
    }

    // Build the new string
    var theString = string;

    // Replace the value - original / new value for all occurrences
    for (var i = 0; i < toReplace.length; i++) {
        var values = toReplace[i];
        theString = theString.replace(values[0], values[1]);
    }

    return theString;
}