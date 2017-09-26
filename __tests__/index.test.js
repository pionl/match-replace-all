import matchReplaceAll from '../src/index'

test('replaces all values', () => {
    expect(matchReplaceAll(new RegExp('<a([^>]*)>([^<]+)</a>', 'g'), 'testing <a>first</a> <a target="_blank">second</a>', (match) => {
        const value = match[2]
        const attributes = match[1]
        return `<a href="http://${value}"${attributes}>${value}</a>`
    })).toEqual('testing <a href="http://first">first</a> <a href="http://second" target="_blank">second</a>')
})
