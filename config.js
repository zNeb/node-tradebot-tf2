'use strict'

module.exports = {
    appID: 440, // 730 - CS:GO
    contextID: 2, // ContextID
    bots: {
        bot_1: {
            siteName: 'Bot 1',  // Will be displayed under the "All bots" tab e.g. "Keys Only"
            accountName: '',    // bot_1 username
            password: '',       // bot_1  password
            twoFactorCode: '',  // shared_secret value
            identitySecret: '', // identity_secret value
            steamID64: '',  // SteamID64 of bot account can be found here: "https://steamid.io/"
            personaName: 'Fortress BOT #1',   // Nickname for bot account, will change on restart
        },
    },
    steamApiKey: '',    // Your Steam API key, get it here: https://steamcommunity.com/dev/apikey
    priceSource: 'bptf',   // SCM or BPTF
    site: {
        header: 'Fortress Trading', // Name/header/title of website. Prefix for  <title></title> (For more: /index.html line: 9) 
        steamGroup: '#',
        copyrights: 'Copyright © Fortress 2020',  // Copyright text
    },
    domain: 'example.com',    // Domain name only, follow the example (no http:// & no www & no /)
    website: 'http://example.com',    // Website URL, follow the example (do not add / at the end)
    websitePort: 80,    // Website PORT, don't change it unless you're using a reverse proxy
    tradeMessage: 'Trade offer from Fortress.TF | If you did not request this offer or the offer looks invalid please decline.', // Quite obvious
	ignoreItemsBelow: 0.1, // Ignore items below this price (- shows (Too Low) for user
    ignoreItemsAbove: 100, // Ignore items Above this price - shows (Too High) for user
    rates: {
        // Items
        user: {
            key: 1,
            strange:1,
            genuine: 1,
            weapon: 1,
            vintage: 1,
            trash: 1,
        },
        bot: {
            key: 1,
            strange:1,
            genuine: 1,
            weapon: 1,
            vintage: 1,
            trash: 1,
        },
    },
    stock: {
        items: 1,
        key: 10,
        metal: 100,
    },
}