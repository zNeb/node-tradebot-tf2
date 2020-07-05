'use strict'

const config = require('../config')
const async = require('async')

function Trade(params) {
    this.buyPrices = {}
	this.sellPrices = {}
    this.floats = {}
    this.instances = []

    this.io = params.io || false

    this.getBuyPrices((prices) => {
        this.buyPrices = prices
    })
	this.getSellPrices((prices) => {
        this.sellPrices = prices
    })
    setInterval(() => {
        this.getBuyPrices((prices) => {
        this.buyPrices = prices
		})
		this.getSellPrices((prices) => {
        this.sellPrices = prices
		})
    }, 3600000)

    this.startBots(() => {
        this.addBotListeners()
        setInterval(() => this.reloadBotSessions(), 3600000)
    })
}

function checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size;
}

Trade.prototype.getBuyPriceList = function getBuyPriceList() {
    return this.buyPrices
}

Trade.prototype.getSellPriceList = function getSellPriceList() {
	return this.sellPrices
}

Trade.prototype.getFloatValues = function getFloatValues() {
    return this.floats
}

Trade.prototype.getBuyPrice = function getBuyPrice(name) {
    const price = this.buyPrices[name] || 0
    return price
}
Trade.prototype.getSellPrice = function getSellPrice(name) {
    const price = this.sellPrices[name] || 0
    return price
}
Trade.prototype.getUserRates = function getUserRates() {
    return config.rates.user
}

Trade.prototype.getBotRates = function getBotRates() {
    return config.rates.bot
}

Trade.prototype.validateOffer = function validateOffer(object, callback) {
    const self = this

    let userValue = 0
    let botValue = 0
    let userCount = 0
    let botCount = 0

    const obj = object
    obj.user = obj.user.filter(Boolean)
    obj.bot = obj.bot.filter(Boolean)

    if (!obj.user.length) {
        return callback('(╯°□°）╯︵ ┻━┻ How about no?')
    }
    return self.getInventory(obj.steamID64, config.appID, config.contextID, (err, data) => {
        if (err) {
            return callback('Could not verify inventory contents for the trade. Please try again later!')
        }
        const userInventory = data
        var userItem = []
        return async.forEach(Object.keys(userInventory), (index, cb) => {
            const item = userInventory[index]
            if (obj.user.indexOf(item.assetid) !== -1) {
                const price = self.getBuyPrice(item.data.market_hash_name, 'user', item.item_type)
                userCount += 1
                userValue += price
                var TotalRef =  Math.trunc(userValue);
                var TotalScrap = (userValue % 1).toFixed(2);
                if (TotalScrap > 0.05 && TotalScrap < 0.11) {
                    TotalScrap = 0.11;
                } else if (TotalScrap > 0.11 && TotalScrap < 0.22) {
                    TotalScrap = 0.22;
                } else if (TotalScrap > 0.22 && TotalScrap < 0.33) {
                    TotalScrap = 0.33;
                } else if (TotalScrap > 0.33 && TotalScrap < 0.44) {
                    TotalScrap = 0.44;
                } else if (TotalScrap > 0.44 && TotalScrap < 0.55) {
                    TotalScrap = 0.55;
                } else if (TotalScrap > 0.55 && TotalScrap < 0.66) {
                    TotalScrap = 0.66;
                } else if (TotalScrap > 0.66 && TotalScrap < 0.77) {
                    TotalScrap = 0.77;
                } else if (TotalScrap > 0.77 && TotalScrap < 0.88) {
                    TotalScrap = 0.88;
                } else if (TotalScrap > 0.88 && TotalScrap < 1) {
                    TotalScrap = 1;
                }
                userValue = parseFloat(TotalRef) +  parseFloat(TotalScrap);
                if(item.data.market_hash_name !== "Refined Metal" && item.data.market_hash_name !== "Reclaimed Metal" && item.data.market_hash_name !== "Scrap Metal") {
                    userItem.push(item.data.market_hash_name);
                }
            }
            cb()
        }, () => {
            if (obj.bot.length) {
                console.log(obj.bot)
                if (typeof config.bots[obj.bot_id] === 'undefined') {
                    return callback('(╯°□°）╯︵ ┻━┻ How about no?')
                }
                self.getInventory(config.bots[obj.bot_id].steamID64, config.appID, config.contextID, (invErr, invData) => {
                    if (invErr) {
                        return callback('Could not verify inventory contents for the trade. Please try again later!')
                    }
                    const botInventory = invData
                    return async.forEach(Object.keys(botInventory), (index, cb) => {
                        const item = botInventory[index]
                        if (obj.bot.indexOf(item.assetid) !== -1) {
                            const price = self.getSellPrice(item.data.market_hash_name, 'bot', item.item_type)
                            botCount += 1
                            botValue += price
                            var TotalRef =  Math.trunc(botValue);
                            var TotalScrap = (botValue % 1).toFixed(2);
                            if (TotalScrap > 0.05 && TotalScrap < 0.11) {
                                TotalScrap = 0.11;
                            } else if (TotalScrap > 0.11 && TotalScrap < 0.22) {
                                TotalScrap = 0.22;
                            } else if (TotalScrap > 0.22 && TotalScrap < 0.33) {
                                TotalScrap = 0.33;
                            } else if (TotalScrap > 0.33 && TotalScrap < 0.44) {
                                TotalScrap = 0.44;
                            } else if (TotalScrap > 0.44 && TotalScrap < 0.55) {
                                TotalScrap = 0.55;
                            } else if (TotalScrap > 0.55 && TotalScrap < 0.66) {
                                TotalScrap = 0.66;
                            } else if (TotalScrap > 0.66 && TotalScrap < 0.77) {
                                TotalScrap = 0.77;
                            } else if (TotalScrap > 0.77 && TotalScrap < 0.88) {
                                TotalScrap = 0.88;
                            } else if (TotalScrap > 0.88 && TotalScrap < 1) {
                                TotalScrap = 1;
                            }
                            botValue = parseFloat(TotalRef) +  parseFloat(TotalScrap);
                            if (price === 0) {
                                return cb('Could not get a price for item(s). Trade has been cancelled.')
                            }
                        }
                        return cb()
                    }, (cbError) => {
                        if (cbError) {
                            return callback(cbError)
                        }
                        if (botCount !== obj.bot.length) {
                            return callback('Some items were not found in bots inventory!')
                        }
                        if (parseFloat(userValue.toFixed(2)) < parseFloat(botValue.toFixed(2))) {
                            return callback('You do not have enough value!')
                        }
                        if (checkIfArrayIsUnique(userItem) === false) {
                            return callback('You are trading multiple items, make sure you only include 1 of any non metal item on the user side!')
                        }
                        for (const i in botInventory) {
                            if (userItem.includes(botInventory[i].data.market_hash_name)) {
                                return callback('You are trading an overstocked item!')
                            }
                        }
                        return callback(null, true)
                    })
                })
            } else {
                if (userCount !== obj.user.length) {
                    console.log(userCount, obj.user.length, obj.user)
                    return callback('Some items were not found in users inventory!')
                }
                return callback(null, true)
            }
            return false
        })
    })
}

module.exports = Trade

require('./bots')
require('./inv')
require('./prices')
