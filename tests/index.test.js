describe('Webseries homepage', function() {
    it('should have a title', function() {
        browser.driver.get('localhost:3000');

        expect(browser.driver.getTitle()).toContain('Webseries');
    });
});