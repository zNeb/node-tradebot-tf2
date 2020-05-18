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
    tradeMessage: 'Trade offer from Fortress | If you did not request this offer or the offer looks invalid please decline.', // Quite obvious
    rates: {
        ignoreItemsBelow: 0.1, // Ignore items below this price (price * rate < ignoreItemsBelow) - shows (Too Low) for user
		ignoreItemsAbove: 70, // Ignore items Above this price (price * rate < ignoreItemsBelow) - shows (Too Low) for user
        trashPriceBelow: 0.2,   // Items below this price are considered trash, the trash rate modifier will be applied
        // Items
        user: {
            key: 1,
            knife:1,
            rare_skin: 1,
            weapon: 1,
            misc: 1,
            trash: 1,
        },
        bot: {
            key: 1,
            knife: 1,
            rare_skin: 1,
            weapon: 1,
            misc: 1,
            trash: 1,
        },
    },
}
