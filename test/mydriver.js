const { Builder, By, Key, util } = require("selenium-webdriver");

module.exports.driver = new Builder().forBrowser("chrome").build();
