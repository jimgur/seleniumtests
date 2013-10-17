var assert = require('assert');
var webdriver = require('selenium-webdriver');

// Use describe / it functions without a namespace.
(function(m){ for(var k in m) { global[k] = m[k]; } })(require('selenium-webdriver/testing'));

var capabilities = webdriver.Capabilities.chrome();
// TODO: For some reason these flags are not honored. look into this
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
    
    // Selector function, instead of awkward chaining.
    // todo: change this to a jquery style selector
    global.$ = function(){
        var queryResult = driver;
        for(var i=0; i<arguments.length; i++) {
            var arg = arguments[i];
            var findElementParams = (typeof arg === 'string') ? { 'className' : arg } : arg;
            queryResult = queryResult.findElement(findElementParams);
        }
        return queryResult;
    };
    
    describe('Header', function() {
            
        before(function(){ driver = createDriver(); driver.get(URL); });
        after(function(){ driver.quit(); });
    
        it('opens/closes menu when menu button is clicked', function() {
            $('user-menu')
                .isDisplayed()
                .then(function(value){ assert.equal(value, false); })
            
            $('menu-btn')
                .click();
                
            $('user-menu')
                .isDisplayed()
                .then(function(value){ assert.equal(value, true); })
                
            $('menu-btn')
                .click();
        });
        
        it('goes to upload page when upload button is clicked', function(){
            $('upload-btn')
                .click();
            $('upload-view')
                .isDisplayed()
                .then(function(value){ assert.equal(value, true); });
            // Mobile Web only has device and URL
            $({ id : 'device-button' })
                .isDisplayed()
                .then(function(value){ assert.equal(value, true); });
            $({ id : 'upload-url' })
                .isDisplayed()
                .then(function(value){ assert.equal(value, true); });
                
            driver.navigate().back();
        });
        
        //it('goes to user submitted gallery when section is changed', function(){
        //});
        
    });
    
    describe('Gallery', function() {
    
        before(function(){ driver = createDriver(); driver.get(URL); });
        after(function(){ driver.quit(); });
    
        it('defaults to today\'s page, hot section with viral sort', function() {
            $({ name : 'section' })
                .getAttribute('value')
                .then(function(value){ assert.equal(value, 'hot'); });
            $({ name : 'sort'})
                .getAttribute('value')
                .then(function(value){ assert.equal(value, 'viral'); });
            
            $('page-header')
                .getText()
                .then(function(value){ assert.equal(value.indexOf('(today)')!=-1, true); });
        });
        
        
        it('loads yesterday\'s page after scrolling down', function() {
            driver.executeScript('window.scrollBy(0,10000)', '');
            
            // Make sure we've enough time to render the next page before checking...
            driver.wait(function(){
                return driver.findElements({ className : 'page-header'})
                    .then(function(hdr) {
                        return hdr.length > 1;
                    });
            }, WAITLENGTH ); // wait at most 5 seconds.
            
            driver.findElements({ className : 'page-header'})
                .then(function(headers){
                    headers[1].getText().then(function(value){ assert.equal(value.indexOf('(yesterday)')!=-1, true); });
                });
        });
        
        it('hides the header when after scrolling down', function(){
            $({ id : 'header'})
                .isDisplayed()
                .then(function(value){ assert.equal(value, false); });
        });
        
        it('shows the header when after scrolling back up', function(){
            driver.executeScript('window.scrollBy(0,-200)', '');
            $({ id : 'header'})
                .isDisplayed()
                .then(function(value){ assert.equal(value, true); });
        });
        
        it('loads the inside gallery when you click on a thumbnail', function() {
            $('gallery-item', { tagName : 'a' })
                .click();
            
            $('insideContainer', 'comment-form')
                .getAttribute('placeholder')
                .then(function(value){
                    assert.equal(value, 'submit a comment');
                });
        });
        
        // On the Inside now
        it('shows login screen when trying to upvote, downvote, favorite, comment', function() {
            var assertClickGoesToSignInPage = function(el) {
                // Need this otherwise it errors out because element is not clickable.
                driver.executeScript('window.scrollTo(0,'+(el.getLocation().y)+')');
                driver.sleep(200);
                el.click();
            
                driver.wait(function(){
                    return $({ name : 'submit' })
                        .getAttribute('value')
                        .then(function(value){
                            assert.equal(value, 'sign in');
                            return true;
                        });    
                }, WAITLENGTH);
                
                driver.navigate().back();
            };
        
            assertClickGoesToSignInPage($('main-button-container', 'upvote'));
            assertClickGoesToSignInPage($('main-button-container', 'downvote'));
            assertClickGoesToSignInPage($('favorites', 'favorite-icon'));
            assertClickGoesToSignInPage($('insideContainer', 'comment-form'));
            
            
        });
    });

});


describe('Logged in user', function() { });
describe('Logged in pro user', function() { });

