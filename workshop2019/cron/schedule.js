const schedule = require('node-schedule');
const SalesList = require('./apis/SalesList'); 

const debug = require('debug')
const moment = require('moment')
const config = require('./config')
const glob = require('glob')
const path = require('path')
const fs = require('fs')


const shopExJob = async () => {
  let now = new Date().toLocaleString()
  console.log(`${now} Start polling shopex`)

  let options = {};
  let currentDay = moment()
  let currentStr = currentDay.format('YYYY-MM-DD')
  let fiveDaysAgo = currentDay.subtract(5, 'days').format('YYYY-MM-DD')
  options.startDate = fiveDaysAgo
  options.endDate = currentStr
  console.log("polling afterSales")
  const aftersaleslist = new AfterSalesList(options);
  await aftersaleslist.fetchData()

  console.log("polling DeliveryList")
  const deliverylist = new DeliveryList(options);
  await deliverylist.fetchData()


  console.log("polling IostockList")
  const iostocklist = new IostockList(options);
  await iostocklist.fetchData()

  console.log("polling GoodsList")
  const goodslist = new GoodsList(options);
  await goodslist.fetchData()


  console.log("polling OrderList")
  const orderlist = new OrderList(options);
  await orderlist.fetchData();

  console.log("polling PkgList")
  const pkglist = new PkgList(options);
  await pkglist.fetchData()

  console.log("polling SalesList")
  const saleslist = new SalesList(options);
  await saleslist.fetchData()

  console.log("polling StockList")
  const stocklist = new StockList(options);
  await stocklist.fetchData()

  const polist = new PoList(options);
  polist.fetchData();

  const stockdetaillist = new StockDetailList(options);
  stockdetaillist.fetchData();
  now = new Date().toLocaleString()
  debug.log(`${now} End of polling shopex`)

}

const rule = new schedule.RecurrenceRule();
//rule.second = 1
rule.minute = 17;
rule.hour = 8;

var mainSch = schedule.scheduleJob(rule, async function () {
  console.log('Starting importing the csv files:');
  await mainJob()
  console.log('End of importing the csv files');
});

/*
var cleanupSch = schedule.scheduleJob('* * 18 16 * *', async function(){
  console.log('start cleanup');
  await cleanup()
});
*/

const ruleShopEx = new schedule.RecurrenceRule();
//rule.second = 1
ruleShopEx.minute = 2;

var cleanupSch = schedule.scheduleJob('*/10 * * * *', async function () {
  shopExJob()
});
