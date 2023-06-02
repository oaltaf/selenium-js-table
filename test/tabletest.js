const { Builder, By, Key, util } = require("selenium-webdriver");
const { expect, assert, should } = require("chai");
const chrome = require("selenium-webdriver/chrome");
const { describe, beforeEach, before, it } = require("mocha");
const { potble } = require("../pageObjects/poTable");
const poTable = require("../pageObjects/poTable");
const { driver } = require("../test/mydriver");
const config = require("../config/config");

describe("verify js code for table", () => {
  it("TC1 - verify user table attribute ", async () => {
    await driver.get(config.url);
    console.log(`po table id string is ${poTable.tbid}`);
    let tableAttribute = await driver.findElement(By.xpath(`${poTable.tbid}`));
    let attName = await tableAttribute.getAttribute("data-testid");
    assert.equal(attName, "users-table", "Table attribute name is not correct");
  });

  it("TC2 - verify each row attribute is data-testid with numeric value ", async () => {
    let tableRows = await driver.findElements(
      By.xpath('//table[@data-testid="users-table"]/tbody/tr')
    );

    for (let e of tableRows) {
      let number = await e.getAttribute("data-testid");
      // console.log("Type of NUMBER is " + typeof number);
      number = await parseInt(number);

      // await console.log("Type of NUMBER after parse int " + typeof number);
      if (Number.isInteger(number)) {
        assert.typeOf(number, "number", "This is not a number");
      }
      // console.log(await e.getAttribute("data-testid"));
    }
  });

  it("TC3 - verify table all column names ", async () => {
    let firstColName = await driver
      .findElement(By.xpath(`${poTable.table1stcolname}`))
      .getText();

    // console.log("first col name is --- " + firstColName);

    assert.equal(firstColName, "Name", "Name is not the name of 1st column");

    let secondColName = await driver
      .findElement(By.xpath(`${poTable.table2ndcolname}`))
      .getText();

    // console.log("2nd col name is --- " + secondColName);

    assert.equal(secondColName, "Email", "Email is not the name of 2nd column");

    let thirdColName = await driver
      .findElement(By.xpath(`${poTable.table3rdcolname}`))
      .getText();

    // console.log("3rd col name is --- " + thirdColName);

    assert.equal(thirdColName, "Role", "Role is not the name of 3rd column");
  });

  it("TC4 - verify column 1 must contain the property Name ", async () => {
    let tableColumn1Header = await driver.findElement(
      By.xpath("//table/thead/tr/th[1]")
    );
    let getTextOfColumn1 = await tableColumn1Header.getText();
    assert.equal(
      getTextOfColumn1,
      "Name",
      "1st Column Heading name is not NAME"
    );
  });

  it("TC5 - verify column 2nd must contain the property Email ", async () => {
    let tableColumn2Header = await driver.findElement(
      By.xpath("//table/thead/tr/th[2]")
    );
    let getTextOfColumn2 = await tableColumn2Header.getText();
    assert.equal(
      getTextOfColumn2,
      "Email",
      "1st Column Heading name is not EMAIL"
    );
  });

  it("TC6 - verify column 3 must contain the property Role ", async () => {
    let tableColumn3Header = await driver.findElement(
      By.xpath("//table/thead/tr/th[3]")
    );
    let getTextOfColumn3 = await tableColumn3Header.getText();
    assert.equal(
      getTextOfColumn3,
      "Role",
      "1st Column Heading name is not ROLE"
    );
  });

  it("TC7 - verify css property of admin is 700 ", async () => {
    let elements = await driver.findElements(
      By.xpath("//table[@data-testid='users-table']/tbody/tr/td[3]")
    );

    let i = 0;
    while (i < elements.length) {
      let element = await driver.findElement(
        By.xpath(`//table[@data-testid="users-table"]/tbody/tr[${i + 1}]/td[3]`)
      );
      let roleName = element.getText();
      if ((await roleName).match("admin")) {
        console.log("MATCHES");
        let checkNameCss = await driver.findElement(
          By.xpath(
            `//table[@data-testid="users-table"]/tbody/tr[${i + 1}]/td[1]`
          )
        );
        let cssValue = await checkNameCss.getCssValue("font-weight");
        cssValue = await parseInt(cssValue);
        await console.log(
          "CSS VALUE IS === " +
            cssValue +
            " and Type of CSSVALUE is " +
            typeof cssValue
        );
        assert.equal(cssValue, 700, "CSS font-weight is not equal to 700");
      }
      i++;
    }
  });

  it("TC 8 - verify total number of records ", async () => {
    let tableCaption = await driver.findElement(By.xpath("//table/caption"));
    tableCaption = await tableCaption.getText();
    await console.log(
      "TABLE CAPTION TEXT is " +
        tableCaption +
        " AND Type of " +
        typeof tableCaption
    );

    const replaced = tableCaption.replace(/\D/g, "");
    let newNumberFromString = parseInt(replaced);
    await console.log(
      "TABLE CAPTION Record is " +
        newNumberFromString +
        " AND TYPE OF replaced is = " +
        typeof newNumberFromString
    );

    let totalUsers = await driver.findElements(
      By.xpath(`${poTable.alltablerows}`)
    );
    let totalSizeOfUsers = await totalUsers.length;

    assert.equal(
      newNumberFromString,
      totalSizeOfUsers,
      "Total number of users are not correct"
    );

    await driver.quit();
  });
});
