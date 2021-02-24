let webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
var driver = new webdriver.Builder()
             .withCapabilities(webdriver.Capabilities.chrome())
             .build();

var errType;

async function example() {
    await driver.get('https://www.footlocker.ca/');
    await driver.findElement(webdriver.By.name("query")).sendKeys('41-00714-8-04', webdriver.Key.RETURN);
    await driver.sleep(3000)
    try {
        checkAvalable();
    } catch(err) {
        console.log(err);
    }
}


async function checkAvalable(){
    try {
        await driver.findElement(webdriver.By.xpath('//*[@id="main"]/div[@class="Page-wrapper Page--large ProductSearch--noResults"]')).then(() => {
            console.log('Resulut not found');
            return true; //found
        },(err) => {
            if(err instanceof webdriver.error.NoSuchElementError){
                shoeSoldOut();
                return false;
            }else { console.log('i am here'); webdriver.promise.rejected(err);}
        });
        // let soldOut =  await driver.findElement(webdriver.By.xpath('')); //*[@id="main"]/div[@class="Page-wrapper Page--large ProductSearch--noResults"]
        // let notSoldOut = await driver.findElement(webdriver.By.xpath(''));
        //console.log('not found', searchNotFound);

    }catch(err) {
        console.log('ERROR:' + err);
    }
}


async function shoeSoldOut(){
    await await driver.findElement(webdriver.By.xpath('//*[@id="main"]/div[@class="Page-wrapper Page--large Page--productNotFound"]')).then(() => {
        console.log('Result sold out');
        return true;
    },(err) => {
        if(err instanceof webdriver.error.NoSuchElementError){
            notSoldOut();
            return false;
        }else { console.log('i am here'); webdriver.promise.rejected(err);}
    })
}


async function notSoldOut() {
    console.log('Not sold out');

    //Shoe size
    //await driver.findElement(webdriver.By.xpath('//*[@id="ProductDetails"]/div[5]/div[2]/fieldset/div[@class="ProductSize-group"]'));
}


async function selectShoeSize(){
    
}



//Execute the node(run code using "node server.js" in terminal)
example();