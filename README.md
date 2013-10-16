Selenium Mobile Web Integration Tests
=====================================

WebElement API
http://selenium.googlecode.com/svn/trunk/docs/api/java/org/openqa/selenium/WebElement.html#findElements(org.openqa.selenium.By)

Test suite examples
https://code.google.com/p/selenium/source/browse/javascript/webdriver/test/webdriver_finddomelement_test.html

## Highly useful: API export listings in tests
https://code.google.com/p/selenium/source/browse/javascript/webdriver/exports/exports_test.js

=====================================

# Split into 3 categories
    - `Anonymous user`
    - `Logged in user`
    - `Logged in pro user`

# Running the Tests

`mocha -R list mobileweb.js`

=====================================

# Setup

1. https://pypi.python.org/pypi/setuptools/1.1.6#installing-and-using-setuptools  
`wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py -O - | python`

2. http://www.pip-installer.org/en/latest/installing.html  
`wget https://raw.github.com/pypa/pip/master/contrib/get-pip.py -O - | python`

3. https://code.google.com/p/selenium/wiki/ChromeDriver  
Put the `chromedriver` binary into your PATH ( `/usr/bin/` or wherever, ensure Chrome is already installed )

4. `npm install -g mocha selenium-webdriver`

=====================================

# Selenium 2 API Basics

- There are 2 main abstractions:  
    
    WebDriver Object (represents the browser)
        `browser = webdriver.Firefox()`

    WebElement Object (represents DOM elements)
    	`search_box = browser.find_element_by_name(‘q’)`

- Node.JS bindings for Selenium 2
    `https://code.google.com/p/selenium/wiki/WebDriverJs`

- ChromeDriver API specifics
    `https://code.google.com/p/selenium/wiki/ChromeDriver`
    `http://peter.sh/experiments/chromium-command-line-switches/`
    
=====================================

# Resources

http://nerds.airbnb.com/front-end-testing/

https://sites.google.com/site/imemoryloss/redhat-as-es-centos/install-google-chrome-with-yum-on-fedora-15-14-centos-red-hat-rhel-6

https://www.google.com/search?q=selenium+testing+for+mobile+web&oq=selenium+testing+for+mobile+web&aqs=chrome..69i57j0.8600j0j7&sourceid=chrome&espv=210&es_sm=91&ie=UTF-8#es_sm=91&espv=210&q=selenium+testing+for+mobile+web&safe=off&start=10

http://zooskdev.wordpress.com/2013/05/03/automating-mobile-testing-with-selenium-using-appium/

http://blip.tv/pycon-us-videos-2009-2010-2011/pycon-2011-testing-the-mobile-and-desktop-web-with-selenium-2-0-better-faster-and-more-pythonicly-4901071

http://www.slideshare.net/hugs/selenium2mobilewebtesting

http://docs.seleniumhq.org/

http://appium.io/

https://code.google.com/p/selenium/

http://docs.seleniumhq.org/docs/04_webdriver_advanced.jsp

https://github.com/camme/webdriverjs
