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
    
    /*
    describe('Header', function() {
            
        it('should open when clicked on', function() {
            driver.findElement({ className : 'user-menu' })
                .isDisplayed()
                .then(function(value){ assert.equal(value, false); })
            driver.findElement({ className : 'menu-btn' })
                .click();
            driver.findElement({ className : 'user-menu' })
                .isDisplayed()
                .then(function(value){ assert.equal(value, true); })
            driver.findElement({ className : 'menu-btn' })
                .click();
        });
        
    });
    */
    
    describe('Gallery', function() {
        // These are done in order.
    
        it('defaults to today\'s page, hot section with viral sort', function() {
            driver.findElement({ name : 'section' })
                .getAttribute('value')
                .then(function(value){ assert.equal(value, 'hot'); });
            driver.findElement({ name : 'sort'})
                .getAttribute('value')
                .then(function(value){ assert.equal(value, 'viral'); });
            
            driver.findElement({ className : 'page-header'})
                .getText()
                .then(function(value){ assert.equal(value.indexOf('(today)')!=-1, true); });
        });
        
        
        it('loads yesterday\'s page after scrolling down', function() {
            driver.executeScript('window.scrollBy(0,10000)', '');
            
            // Make sure we've enough time to render the next page before checking...
            driver.wait(function(){
                return driver.findElements({ className : 'page-header'}).then(function(hdr) {
                    return hdr.length > 1;
                });
            }, 5000 ); // wait at most 5 seconds.
            
            driver.findElements({ className : 'page-header' })
                .then(function(headers){
                    headers[1].getText().then(function(value){ assert.equal(value.indexOf('(yesterday)')!=-1, true); });
                });
        });
        
        it('loads the inside gallery when you click on a thumbnail', function() {
            driver.findElement({ className : 'gallery-item'}).findElement({ tagName : 'a' })
                .click();
            
            driver.findElement({ className : 'insideContainer' }).findElement({ className : 'comment-form' })
                .getAttribute('placeholder')
                .then(function(value){
                    assert.equal(value, 'submit a comment');
                });
        });
        
        // On the Inside now
        it('shows login screen when trying to upvote, downvote, or favorite', function() {
            var assertClickGoesToSignInPage = function() {
                
                // todo: turn this into a selector of sorts, maybe rip off jquery selector code? to make life easier?
                var queryResult = driver;
                for(var i=0; i<arguments.length; i++) {
                    queryResult = queryResult.findElement({ className : arguments[i] });
                }
                queryResult.click();
            
                driver.findElement({ name : 'submit' })
                    .getAttribute('value')
                    .then(function(value){
                        assert.equal(value, 'sign in');
                    });
                
                driver.navigate().back();
            };
        
            assertClickGoesToSignInPage('main-button-container', 'upvote');
            assertClickGoesToSignInPage('main-button-container', 'downvote');
            assertClickGoesToSignInPage('favorite-icon');
            
        })
    });

});


describe('Logged in user', function() { });
describe('Logged in pro user', function() { });

