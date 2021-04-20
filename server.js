let webdriver = require('selenium-webdriver');
let proxy = require('selenium-webdriver/proxy');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
//let proxyAddress = '198.199.86.11:3128' // set proxy address
//let option = new chrome.Options().addArguments(`--proxy-server=http://${proxyAddress}`)
let opts = new chrome.Options();
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
//chrome.setDefaultService(new chrome.Options("chrome.switches","--disable-extensions"))
// options.addArguments("chrome.switches","--disable-extensions");

var driver; 

var errType;

async function setProxy() {
    try {
        let proxyAddress = '68.183.192.29:8080' // set proxy address

        let option = new chrome.Options().addArguments(`--proxy-server=http://${proxyAddress}`)
    
       // opts.setProxy(proxy.manual({ http: '<HOST:PORT>'}));
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .setChromeOptions(option)
        .build();
        await driver.get('https://www.footlocker.com');
    } catch (err) {
        console.log(err)
    }
}

async function example() {
    try {
        await setProxy();
        driver.manage().window().maximize();
        await driver.findElement(webdriver.By.name("query")).sendKeys('41-00714-8-04', webdriver.Key.RETURN);
        await driver.sleep(3000)
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
    try {
        let shoe_size = ["07.5", "09.0", "10.0"]; //Saves users preferred size
        console.log('Not sold out');
    await driver.sleep(3000);
    //Shoe size
    // await driver.findElement(webdriver.By.xpath('//*[@id="ProductDetails"]/div[5]/div[2]/fieldset/div[@class="ProductSize-group"]')).then((element) => {
    //     console.log('Element: ' + element);
    // })
   await driver.findElements(webdriver.By.xpath('//*[@id="ProductDetails"]/div[5]/div[3]/fieldset/div/div[@class="c-form-field c-form-field--radio ProductSize"]')).then(async (element) =>{
        driver.manage().window().maximize();
        driver.actions().sendKeys(webdriver.Key.ESCAPE).perform();
        var i = 0;
        let shoe_available = [];
        element.forEach( async availablesize => {
            availablesize.getText().then(async (shoe_element) => {
                if(shoe_size.includes(shoe_element)){
                    console.log('Tab');
                    availablesize.click();
                    await (await driver.findElement(webdriver.By.xpath('//*[@id="ProductDetails"]/ul/li[@class="col"]'))).click();
                    return
                }
                i++;
            })
        });
    })

        // shoeshize.forEach(async availablesize => {
        //     await availablesize.getText().then(ele => {
        //     his.push(ele)
        //     })
        // })
    console.dir(shoe_size)


    }catch(err){console.log(err)}
}





//Execute the node(run code using "node server.js" in terminal)
example();
