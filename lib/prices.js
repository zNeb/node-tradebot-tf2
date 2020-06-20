'use strict'

const config = require('../config')
const request = require('request')
const Trade = require('./index')

const API = 'https://api.prices.tf/items'
const tfPrices = `${API}?src=${config.priceSource}&cur`


Trade.prototype.getBuyPrices = function getBuyPrices(callback) {
    Trade.prototype.getBuyApi(3, (err, data) => { // 3 retries 
        if (err) {
            return this.getBuyPrices(callback)
        }
        console.log('[!] Buy Prices are updated.')
        return callback(data)
    })
}
Trade.prototype.getSellPrices = function getSellPrices(callback) {
    Trade.prototype.getSellApi(3, (err, data) => { // 3 retries 
        if (err) {
            return this.getSellPrices(callback)
        }
        console.log('[!] Sell Prices are updated.')
        return callback(data)
    })
}

Trade.prototype.getBuyApi = function getBuyApi(retries, callback) {
    request(tfPrices, (error, response, body) => {
        const statusCode = (response) ? response.statusCode || false : false
        if(error || response.statusCode !== 200) {
            if(retries > 0) {
                retries--
                Trade.prototype.getBuyApi(retries, callback)
            } else {
                return callback({ error, statusCode })
            }
        } else {
            const json_obj = JSON.parse(body)
			const items = json_obj['items']
			let key = 0;
			let json_output = {"Refined Metal":1,"Reclaimed Metal":0.33,"Scrap Metal":0.11};

			for (const i in items) {
				const item = items[i];
				if (item['sku'] === '5021;6') {
					key = item["sell"]["metal"]
				}
			  }
			for (const i in items) {
				const item = items[i];
				const name = item['name'];
				const buy = item['buy'] === null ? 0 : item['buy'];
				const value = buy['keys'] * key + buy['metal'];
                if(!(name.includes("Killstreak") || name.includes("(Factory New)") || name.includes("(Minimal Wear)") || name.includes("(Field-Tested)") || name.includes("(Well-Worn)") || name.includes("(Battle Scarred)")) && value < config.ignoreItemsAbove && value > config.ignoreItemsBelow) {
                    json_output[name] = value
                }
			}
            return callback(null, json_output)
        }
    })
}
Trade.prototype.getSellApi = function getSellApi(retries, callback) {
    request(tfPrices, (error, response, body) => {
        const statusCode = (response) ? response.statusCode || false : false
        if(error || response.statusCode !== 200) {
            if(retries > 0) {
                retries--
                Trade.prototype.getSellApi(retries, callback)
            } else {
                return callback({ error, statusCode })
            }
        } else {
			const json_obj = JSON.parse(body)
			const items = json_obj['items']
			let key = 0;
			let json_output = {"Refined Metal":1,"Reclaimed Metal":0.33,"Scrap Metal":0.11};

			for (const i in items) {
				const item = items[i];
				if (item['sku'] === '5021;6') {
					key = item["sell"]["metal"]
				}
			  }
			for (const i in items) {
				const item = items[i];
				const name = item['name'];
				const sell = item['sell'] === null ? 0 : item['sell'];
                const value = sell['keys'] * key + sell['metal'];
                if(!(name.includes("Killstreak") || name.includes("(Factory New)") || name.includes("(Minimal Wear)") || name.includes("(Field-Tested)") || name.includes("(Well-Worn)") || name.includes("(Battle Scarred)")) && value < config.ignoreItemsAbove && value > config.ignoreItemsBelow) {
                    json_output[name] = value
                }
            }
            return callback(null, json_output)
        }
    })
}
