exports.config = {
    framework: 'jasmine2',
    specs: ['tests/*.test.js'],
    capabilities: {
        browserName: 'firefox'
    },
    directConnect: true
};