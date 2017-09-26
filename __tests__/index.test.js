import matchReplaceAll from '../src/index'

test('replaces all values', () => {
    expect(matchReplaceAll(new RegExp('<a([^>]*)>([^<]+)</a>', 'g'), 'testing <a>first</a> <a target="_blank">second</a>', (match) => {
        const value = match[2]
        const attributes = match[1]
        return `<a href="http://${value}"${attributes}>${value}</a>`
    })).toEqual('testing <a href="http://first">first</a> <a href="http://second" target="_blank">second</a>')
})

test('replaces only links without attributes', () => {
    expect(matchReplaceAll(new RegExp('<a([^>]*)>([^<]+)</a>', 'g'), 'testing <a>first</a> <a target="_blank">second</a>', (match) => {
        const value = match[2]
        const attributes = match[1]

        // Skip links that has attributes
        if (attributes !== '') {
            return false
        }

        return `<a href="http://${value}"${attributes}>${value}</a>`
    })).toEqual('testing <a href="http://first">first</a> <a target="_blank">second</a>')
})

test('do not replace string if original value is same', () => {
    const mock = {
        replace: jest.fn(() => 'mocked'),
        toString: () => {
            return 'testing <a>first</a> <a target="_blank">second</a>'
        }
    }
    expect(matchReplaceAll(new RegExp('<a([^>]*)>([^<]+)</a>', 'g'), mock, (match) => {
        const value = match[2]
        const attributes = match[1]

        // Skip links that has attributes
        if (attributes !== '') {
            return match[0]
        }

        return `<a href="http://${value}"${attributes}>${value}</a>`
    })).toEqual('mocked')
    expect(mock.replace).toHaveBeenCalledTimes(1)
})
