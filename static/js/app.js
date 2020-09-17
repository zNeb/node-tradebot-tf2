$(function() {
    var app = new Vue({
        el: '#app',
        data: {
            buyPriceList: {},
			sellPriceList: {},
            rates: {
                user: {},
                bot: {}
            },
            disableUserReload: true,
            disableBotReload: true,
            disableTrade: true,
            // bot
            floats: {},
            selectedBot: 'All Bots',
            botInventories: {},
            botInventory: [],
            botInventorySelected: [],
            botInventorySelectedValue: 0,
            botEmpty: true,
            // user
            userInventory: [],
            userInventorySelected: [],
            userInventorySelectedValue: 0,
            userEmpty: true,
            // auth
            user: false,
            // site
            site: {
                header: '',
                steamGroup: '#',
                copyrights: ''
            },
            // trade
            offerStatus: {},
            invalidTradelink: false
        },
        methods: {
            setInventorySort: function(who, value) {
                if(who == 'bot') {
                    this.botInventory = this.sortInventory(this.botInventory, value);
                } else {
                    this.userInventory = this.sortInventory(this.userInventory, value);
                }
            },
            sortInventory: function(inventory, desc) {
                return inventory.sort(function(a, b) {
                    if(desc) {
                        return b.price - a.price;
                    } else {
                        return a.price - b.price;
                    }
                });
            },
            addItem: function(who, id, assetid, price) {
                if(typeof price === 'undefined') {
                    price = assetid;
                    assetid = id;
                }
                if(who == 'bot') {
                    this.botEmpty = false;
                    if(this.selectedBot !== id) {
                        this.activeBot(id);
                    }
                    var botInventorySelected = this.botInventorySelected;
                    botInventorySelected.push(assetid);
                    this.botInventorySelected = botInventorySelected;
                    this.botInventorySelectedValue += parseFloat(price);
                    var TotalRef =  Math.trunc(this.botInventorySelectedValue);
                    var TotalScrap = (this.botInventorySelectedValue % 1).toFixed(2);
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
                    this.botInventorySelectedValue = parseFloat(TotalRef) + parseFloat(TotalScrap);
                } else {
                    this.userEmpty = false;
                    var userInventorySelected = this.userInventorySelected;
                    userInventorySelected.push(assetid);
                    this.userInventorySelected = userInventorySelected;
                    this.userInventorySelectedValue += parseFloat(price);
                    var TotalRef =  Math.trunc(this.userInventorySelectedValue);
                    var TotalScrap = (this.userInventorySelectedValue % 1).toFixed(2);
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
                    this.userInventorySelectedValue = parseFloat(TotalRef) + parseFloat(TotalScrap);
                }
                this.checkTradeable();
            },
            removeItem: function(who, id, assetid, price) {
                if(typeof price === 'undefined') {
                    price = assetid;
                    assetid = id;
                }
                if(who == 'bot') {
                    this.botInventorySelected.splice($.inArray(assetid, this.botInventorySelected),1);
                    this.botInventorySelectedValue -= price;
                    var TotalRef =  Math.trunc(this.botInventorySelectedValue);
                    var TotalScrap = (this.botInventorySelectedValue % 1).toFixed(2);
                    if (TotalScrap > 0.05 && TotalScrap < 0.11) {
                        TotalScrap = 0;
                    } else if (TotalScrap > 0.11 && TotalScrap < 0.22) {
                        TotalScrap = 0.11;
                    } else if (TotalScrap > 0.22 && TotalScrap < 0.33) {
                        TotalScrap = 0.22;
                    } else if (TotalScrap > 0.33 && TotalScrap < 0.44) {
                        TotalScrap = 0.33;
                    } else if (TotalScrap > 0.44 && TotalScrap < 0.55) {
                        TotalScrap = 0.44;
                    } else if (TotalScrap > 0.55 && TotalScrap < 0.66) {
                        TotalScrap = 0.55;
                    } else if (TotalScrap > 0.66 && TotalScrap < 0.77) {
                        TotalScrap = 0.66;
                    } else if (TotalScrap > 0.77 && TotalScrap < 0.88) {
                        TotalScrap = 0.77;
                    } else if (TotalScrap > 0.88 && TotalScrap < 1) {
                        TotalScrap = 0.88;
                    }
                    this.botInventorySelectedValue = parseFloat(TotalRef) + parseFloat(TotalScrap);
                    if (this.botInventorySelectedValue == 0) {
                        this.botEmpty = true;
                    }
                } else {
                    this.userInventorySelected.splice($.inArray(assetid, this.userInventorySelected),1);
                    this.userInventorySelectedValue -= price;
                    var TotalRef =  Math.trunc(this.userInventorySelectedValue);
                    var TotalScrap = (this.userInventorySelectedValue % 1).toFixed(2);
                    if (TotalScrap > 0.05 && TotalScrap < 0.11) {
                        TotalScrap = 0;
                    } else if (TotalScrap > 0.11 && TotalScrap < 0.22) {
                        TotalScrap = 0.11;
                    } else if (TotalScrap > 0.22 && TotalScrap < 0.33) {
                        TotalScrap = 0.22;
                    } else if (TotalScrap > 0.33 && TotalScrap < 0.44) {
                        TotalScrap = 0.33;
                    } else if (TotalScrap > 0.44 && TotalScrap < 0.55) {
                        TotalScrap = 0.44;
                    } else if (TotalScrap > 0.55 && TotalScrap < 0.66) {
                        TotalScrap = 0.55;
                    } else if (TotalScrap > 0.66 && TotalScrap < 0.77) {
                        TotalScrap = 0.66;
                    } else if (TotalScrap > 0.77 && TotalScrap < 0.88) {
                        TotalScrap = 0.77;
                    } else if (TotalScrap > 0.88 && TotalScrap < 1) {
                        TotalScrap = 0.88;
                    }
                    this.userInventorySelectedValue = parseFloat(TotalRef) + parseFloat(TotalScrap);
                    if(this.userInventorySelectedValue <= 0) {
                        this.userInventorySelectedValue = 0;
                    }
                    if (this.userInventorySelectedValue == 0) {
                        this.userEmpty = true;
                    }
                }
                this.checkTradeable();
            },
            addMetal: function() {
                if (this.selectedBot === 'All Bots') {this.selectedBot = 'bot_1'}
                if (this.userInventorySelectedValue > this.botInventorySelectedValue) {
                    for (i in this.botInventory) {
                        if(this.botInventory[i].data.market_hash_name === 'Refined Metal' && (this.userInventorySelectedValue - this.botInventorySelectedValue) > 0.99 && !(this.botInventorySelected.includes(this.botInventory[i].assetid))) {
                            this.addItem('bot', this.selectedBot, this.botInventory[i].assetid, '1.00');
                        } else if(this.botInventory[i].data.market_hash_name === 'Reclaimed Metal' && (this.userInventorySelectedValue - this.botInventorySelectedValue) > 0.32 && !(this.botInventorySelected.includes(this.botInventory[i].assetid))) {
                            this.addItem('bot', this.selectedBot, this.botInventory[i].assetid, '0.33');
                        } else if(this.botInventory[i].data.market_hash_name === 'Scrap Metal' && (this.userInventorySelectedValue - this.botInventorySelectedValue) > 0.10 && !(this.botInventorySelected.includes(this.botInventory[i].assetid))) {
                            this.addItem('bot', this.selectedBot, this.botInventory[i].assetid, '0.11');
                        }
                    }
                } else if(this.userInventorySelectedValue < this.botInventorySelectedValue) {
                    for (i in this.userInventory) {
                        if(this.userInventory[i].data.market_hash_name === 'Refined Metal' && (this.botInventorySelectedValue - this.userInventorySelectedValue) > 0.99 && !(this.userInventorySelected.includes(this.userInventory[i].assetid))) {
                            this.addItem('user', undefined, this.userInventory[i].assetid, '1.00');
                        } else if(this.userInventory[i].data.market_hash_name === 'Reclaimed Metal' && (this.botInventorySelectedValue - this.userInventorySelectedValue) > 0.32 && !(this.userInventorySelected.includes(this.userInventory[i].assetid))) {
                            this.addItem('user', undefined, this.userInventory[i].assetid, '0.33');
                        } else if(this.userInventory[i].data.market_hash_name === 'Scrap Metal' && (this.botInventorySelectedValue - this.userInventorySelectedValue) > 0.10 && !(this.userInventorySelected.includes(this.userInventory[i].assetid))) {
                            this.addItem('user', undefined, this.userInventory[i].assetid, '0.11');
                        }
                    }
                } 
            },
            removeMetal: function() {
                if (this.botInventorySelected.length !== 0) {
                    for (i in this.botInventory) {
                        if(this.botInventory[i].data.market_hash_name === 'Refined Metal' && this.botInventorySelected.includes(this.botInventory[i].assetid)) {
                            this.removeItem('bot', this.selectedBot, this.botInventory[i].assetid, '1.00');
                        } else if(this.botInventory[i].data.market_hash_name === 'Reclaimed Metal' && this.botInventorySelected.includes(this.botInventory[i].assetid)) {
                            this.removeItem('bot', this.selectedBot, this.botInventory[i].assetid, '0.33');
                        } else if(this.botInventory[i].data.market_hash_name === 'Scrap Metal' && this.botInventorySelected.includes(this.botInventory[i].assetid)) {
                            this.removeItem('bot', this.selectedBot, this.botInventory[i].assetid, '0.11');
                        }
                    }
                }
                if (this.userInventorySelected.length !== 0) {
                    for (i in this.userInventory) {
                        if(this.userInventory[i].data.market_hash_name === 'Refined Metal' && this.userInventorySelected.includes(this.userInventory[i].assetid)) {
                            this.removeItem('user', undefined, this.userInventory[i].assetid, '1.00');
                        } else if(this.userInventory[i].data.market_hash_name === 'Reclaimed Metal' && this.userInventorySelected.includes(this.userInventory[i].assetid)) {
                            this.removeItem('user', undefined, this.userInventory[i].assetid, '0.33');
                        } else if(this.userInventory[i].data.market_hash_name === 'Scrap Metal' && this.userInventorySelected.includes(this.userInventory[i].assetid)) {
                            this.removeItem('user', undefined, this.userInventory[i].assetid, '0.11');
                        }
                    }
                }
            },
            checkTradeable: function() {
                var user = parseFloat(this.userInventorySelectedValue.toFixed(2));
                var bot = parseFloat(this.botInventorySelectedValue.toFixed(2));
                if(user != 0 && user >= bot) {
                    this.disableTrade = false;
                } else {
                    this.disableTrade = true;
                }
            },
            activeBot: function(id) {
                if(this.selectedBot !== id) {
                    if(id == 'All Bots') {
                        var botInventory = [];
                        for(var i in this.botInventories) {
                            var bot = this.botInventories[i];
                            for(var y in bot.items) {
                                var item = bot.items[y];
                                item.bot = i;
                                item.price = (app.sellPriceList[item.data.market_hash_name] * app.rates.bot[item.item_type.name]).toFixed(2);
                                botInventory.push(item);
                            }
                        }
                        this.botInventory = sortInventory(botInventory, true);
                    } else {
                        this.botInventory = this.sortInventory(this.botInventories[id].items, true);
                    }
                    this.botInventorySelected = [];
                    this.botInventorySelectedValue = 0;
                    this.selectedBot = id;
                }
            },
            searchInventory: function(who, value) {
                var inventory = [];
                var search = [];
                if(who == 'bot') {
                    search = this.botInventory;
                } else {
                    search = this.userInventory;
                }
                for(var i in search) {
                    var item = search[i];
                    if(item.data.market_hash_name.toLowerCase().indexOf(value.toLowerCase()) === -1) {
                        item.hidden = 1;
                    } else {
                        item.hidden = 0;
                    }
                    inventory.push(item);
                }
                if(who == 'bot') {
                    this.botInventory = sortInventory(inventory, true);
                } else {
                    this.userInventory = sortInventory(inventory, true);
                }
            },
            updateTradelink: function() {
                var link = this.user.tradelink;
                if(typeof link !== 'undefined') {
                    link = link.trim();
                    if(
                        link.indexOf('steamcommunity.com/tradeoffer/new/') === -1 ||
                        link.indexOf('?partner=') === -1 ||
                        link.indexOf('&token=') === -1
                    ) {
                        this.invalidTradelink = true;
                    } else {
                        ga('send', 'updateTradelink', {
                            eventCategory: 'Trade',
                            eventAction: 'click',
                            eventLabel: this.user.tradelink
                        });
                        this.invalidTradelink = false;
                        localStorage.setItem(this.user.id, this.user.tradelink);
                        $('#tradelink').modal('hide');
                    }
                } else {
                    this.invalidTradelink = true;
                }

            },
            reloadUserInventory: function() {
                this.disableUserReload = true;
                this.userEmpty = true;
                this.userInventory = [];
                this.userInventorySelected = [];
                this.userInventorySelectedValue = 0;
                if(this.user && typeof this.user.steamID64 !== 'undefined') {
                    socket.emit('get user inv', this.user.steamID64);
                }
                ga('send', 'reloadUserInventory', {
                    eventCategory: 'Trade',
                    eventAction: 'click',
                    eventLabel: this.user.steamID64 || false
                });
            },
            reloadBotInventory: function() {
                this.disableBotReload = true;
                this.botEmpty = true;
                this.botInventory = [];
                this.botInventorySelected = [];
                this.botInventorySelectedValue = 0;
                socket.emit('get bots inv');
                ga('send', 'reloadBotInventory', {
                    eventCategory: 'Trade',
                    eventAction: 'click',
                    eventLabel: this.user.steamID64 || false
                });
            },
            resetUserInventory: function() {
                this.userEmpty = true;
                this.userInventorySelected = [];
                this.userInventorySelectedValue = 0;

                ga('send', 'resetUserInventory', {
                    eventCategory: 'Trade',
                    eventAction: 'click',
                    eventLabel: this.user.steamID64 || false
                });
            },
            resetBotInventory: function() {
                this.botEmpty = true;
                this.botInventorySelected = [];
                this.botInventorySelectedValue = 0;

                ga('send', 'resetBotInventory', {
                    eventCategory: 'Trade',
                    eventAction: 'click',
                    eventLabel: this.user.steamID64 || false
                });
            },
            sendOffer: function() {
                if( ! localStorage[this.user.id]) {
                    $('#tradelink').modal('show');
                } else {
                    this.botEmpty = true;
                    this.userEmpty = true;
                    ga('send', 'sendOffer', {
                        eventCategory: 'Trade',
                        eventAction: 'click',
                        eventLabel: this.user.id
                    });
                    this.offerStatus = {};
                    this.checkTradeable();
                    if( ! this.disableTrade) {
                        this.disableTrade = true;
                        $('#tradeoffer').modal('show');
                        socket.emit('get offer', {
                            user: this.userInventorySelected,
                            bot: this.botInventorySelected,
                            bot_id: this.selectedBot,
                            steamID64: this.user.id,
                            tradelink: localStorage[this.user.id]
                        });
                    }
                }
            }
        }
    });


    var socket = io();
    socket.emit('get buypricelist');
	socket.emit('get sellpricelist');
    socket.emit('get rates');

    socket.on('site', function(data) {
        app.site = data;
        window.document.title = data.header + ' × TF2 Trading Site';
    });

    socket.on('offer status', function(data) {
        app.offerStatus = data;
        if(data.status === 3 || data.status === false) {
            app.disableTrade = false;
        }
        if(data.status === 3) {
            app.botInventorySelected = [];
            app.botInventorySelectedValue = 0;
            app.userInventorySelected = [];
            app.userInventorySelectedValue = 0;
        }
    });

    socket.on('user', function(user) {
        user.steamID64 = user.id;
        app.user = user;

        if(app.user.steamID64) {
            socket.emit('get user inv', app.user.steamID64);
        }

        if(localStorage[app.user.id]) {
            app.user.tradelink = localStorage[app.user.id];
        }
        if(typeof app.user.tradelink === 'undefined' && app.user) {
            $('#tradelink').modal('show');
        }
    });

    socket.on('user inv', function(data) {
        app.disableUserReload = false;
        if( ! data.error) {
            var userInventory = [];
            for(var i in data.items) {
                var item = data.items[i];
                item.price = (app.buyPriceList[item.data.market_hash_name] * app.rates.user[item.item_type.name]).toFixed(2);
                userInventory.push(item);
            }
            if( ! userInventory.length) {
                userInventory = { error: { error: 'No tradeable items found.' } };
            } else {
                userInventory = sortInventory(userInventory, true);
            }
            app.userInventory = userInventory;
        } else {
            app.userInventory = data;
        }
    });

    socket.on('bots floats', function(floats) {
        app.floats = floats;
    })

    socket.on('bots inv', function(items) {
        app.disableBotReload = false;
        // Order items object by key name
        const ordered = {};
        Object.keys(items).sort().forEach((key) => {
            ordered[key] = items[key];
        });
        // Assign ordered object to botInventories
        app.botInventories = Object.assign({}, ordered);

        var botInventory = [];
        var error = false;
        for(var i in items) {
            var bot = items[i];
            if(bot.error) {
                error = bot.error;
            }
            for(var y in bot.items) {
                var item = bot.items[y];
                item.bot = i;
                item.price = (app.sellPriceList[item.data.market_hash_name] * app.rates.bot[item.item_type.name]).toFixed(2);
                botInventory.push(item);
            }
        }
        if( ! botInventory.length) {
            if( ! error) {
                error = { error: { error: 'No tradeable items found. Make sure all bots have items and are not set to private.' } };
            }
            botInventory = { error: error };
        } else {
            botInventory = sortInventory(botInventory, true);
        }
        app.botInventory = botInventory;
    });
    socket.on('buypricelist', function(prices) {
        app.buyPriceList = Object.assign({}, app.buyPriceList, prices);

        socket.emit('get bots inv');
    });
	socket.on('sellpricelist', function(prices) {
        app.sellPriceList = Object.assign({}, app.sellPriceList, prices);

        socket.emit('get bots inv');
    });
    socket.on('rates', function(rates) {
        app.rates = Object.assign({}, app.rates, rates);
    });

    function sortInventory(inventory, desc) {
        return inventory.sort(function(a, b) {
            return (desc) ? b.price - a.price : a.price - b.price;
        });
    }

});
