var assert = require('assert');
var webdriver = require('selenium-webdriver');

// Use describe / it functions without a namespace.
(function(m){ for(var k in m) { global[k] = m[k]; } })(require('selenium-webdriver/testing'));

var capabilities = webdriver.Capabilities.chrome();
capabilities.set('chrome.switches', [
    '--enabled',
    '--simulate-touch-screen-with-mouse',
    '--touch-events',
    '--emulate-touch-events'
]);
// capabilities.setCapability("chrome.binary", "/usr/lib/chromium-browser/chromium-browser");

var URL = 'http://m.jim.imgur-dev.com/';
var by = webdriver.By;
var WAITLENGTH = 10000; // 10 seconds timeout on DOM elements being accessible.

var createDriver = function() {
    var driver = new webdriver.Builder().withCapabilities(capabilities).build();
    driver.manage().timeouts().implicitlyWait(WAITLENGTH);
    return driver;
};

describe('Anonymous user', function() {

    var driver;

    before(function(){ driver = createDriver(); });
    after(function(){ driver.quit(); });
    
    describe('Gallery', function() {
        it('should default to hot section with viral sort', function() {
            driver.get(URL);
            driver.findElement(by.name('section')).getAttribute('value').then(function(value){ assert.equal(value, 'hot'); });
            driver.findElement(by.name('sort')).getAttribute('value').then(function(value){ assert.equal(value, 'viral'); });
        });
    });

    describe('Header', function() {

        it('should open when clicked on', function() {
            driver.get(URL)
            driver.findElement(by.className('menu-btn')).click();
            driver.findElement(by.className('user-menu')).getAttribute('class').then(function(value){ assert.equal(value.indexOf('open')!=-1, true); });
        });
        
    });

});


describe('Logged in user', function() { });
describe('Logged in pro user', function() { });

