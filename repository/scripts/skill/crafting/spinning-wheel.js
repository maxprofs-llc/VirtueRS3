/**
 * @author Greco
 * @since 01/07/2017
 */
/* globals EventType */
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var makex = require('../makex');
var dialog = require('shared/dialog');
var widget = require('shared/widget');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC2, [ 66850 ], function (ctx) {
			selectSpinningWheelProduct(ctx.player);
		});
	}

	function selectSpinningWheelProduct (player) {
		makex.selectProduct(player, -1, -1, 7046, -1, "");//TODO: Find category name
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				//TODO: Check message
				var text = "You spin the item.";
				makex.startCrafting(player, amount, 1563, text);
			}
		});
	}
})();
