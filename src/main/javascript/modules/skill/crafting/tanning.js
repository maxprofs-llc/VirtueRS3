/**
 * @author Greco
 * @since 01/07/2017
 */
/* globals EventType */
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var makex = require('shared/makex');
var dialog = require('shared/dialog');
var widget = require('shared/widget');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPNPC3, 2824, function (ctx) {
			selectHides(ctx.player);
		});

		scriptManager.bind(EventType.OPNPC4, 14877, function (ctx) {
			selectHides(ctx.player);
		});
	}

	function selectHides (player) {
		makex.selectProduct(player, -1, -1, 6989, -1, "Tanner");
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				tanHides(player, productId, amount);
			}
		});
	}

	function tanHides (player, productId, amount) {
		makex.makeItem(player, productId, amount);
	}
})();
