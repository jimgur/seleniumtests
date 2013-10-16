var assert = require('assert');
var webdriver = require('selenium-webdriver');

// Use describe / it functions without a namespace.
(function(m){ for(var k in m) { global[k] = m[k]; } })(require('selenium-webdriver/testing'));

var capabilities = webdriver.Capabilities.chrome();
capabilities.set('chrome.switches', [
    '--enabled',
    '--simulate-touch-screen-with-mouse',
    '--window-size=640,960' // iPhone 4 size
]);
// capabilities.setCapability("chrome.binary", "/usr/lib/chromium-browser/chromium-browser");

var URL = 'http://m.jim.imgur-dev.com/';
var by = webdriver.By;
var WAITLENGTH = 10000; // 10 seconds timeout on DOM elements being accessible.

var createDriver = function() {
    var driver = new webdriver.Builder().withCapabilities(capabilities).build();
    // How long to wait for DOM elements before we throw an exception.
    driver.manage().timeouts().implicitlyWait(WAITLENGTH);
    return driver;
};

describe('Anonymous user', function() {

    var driver;

    before(function(){ driver = createDriver(); driver.get(URL); });
    after(function(){ driver.quit(); });
    
    describe('Header', function() {
            
        it('should open when clicked on', function() {
            driver.findElement(by.className('user-menu')).isDisplayed().then(function(value){ assert.equal(value, false); })
            driver.findElement(by.className('menu-btn')).click();
            driver.findElement(by.className('user-menu')).isDisplayed().then(function(value){ assert.equal(value, true); })
            driver.findElement(by.className('menu-btn')).click();
        });
        
    });
    
    describe('Gallery', function() {
    
        it('should default to today, hot section with viral sort', function() {
            driver.findElement(by.name('section')).getAttribute('value').then(function(value){ assert.equal(value, 'hot'); });
            driver.findElement(by.name('sort')).getAttribute('value').then(function(value){ assert.equal(value, 'viral'); });
            
            driver.findElement(by.className('page-header')).getText().then(function(value){ assert.equal(value.indexOf('(today)')!=-1, true); });
        });
        
        
        it('should load yesterday\'s page after scrolling down', function() {
            driver.executeScript('window.scrollBy(0,10000)', '');
            
            // Make sure we've enough time to render the next page before checking...
            driver.wait(function(){
                return driver.findElements(by.className('page-header')).then(function(hdr) {
                    return hdr.length > 1;
                });
            }, 5000 );
            
            driver.findElements(by.className('page-header'))
                .then(function(headers){
                    headers[1].getText().then(function(value){ assert.equal(value.indexOf('(yesterday)')!=-1, true); });
                });
        });
    });

});


describe('Logged in user', function() { });
describe('Logged in pro user', function() { });

