/**
 * @author Greco
 * @since 12/23/2016
 */
/* globals EventType, ENGINE */
var varp = require('../../core/var/player');
var varbit = require('../../core/var/bit');

var makex = require('../makex');
var dialog = require('../../core/dialog');
var widget = require('../../core/widget');
var config = require('../../core/config');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC2, [ 11666, 45310, 61330, 67465, 67466, 67467, 76293 ], 
				function (ctx) {
			startSmelting(ctx.player);
		});
	}
	
	function startSmelting (player) {
		makex.selectProduct(player, 7079, 7080, 7083);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				//TODO: Use correct message
				var text = "You smelt the "+config.objName(productId);
				makex.startCrafting(player, amount, 22142, text);
			}
		});
	}
})();