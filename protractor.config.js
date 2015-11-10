exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests/*.test.js'],
    capabilities: {
        browserName: 'firefox'
    }
};