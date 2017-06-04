
/* globals EventType, Inv */
var varp = require('../core/var/player');
var varc = require('../core/var/client');
var dialog = require('../dialog');
var widget = require('../widget');

/**
 *  @author Alex
 */
module.exports = function(scriptManager) {
	scriptManager.bind(EventType.OPNPC1, 14866, function (ctx) {
		dialog.chatnpc(ctx.player, ctx.npc, "If you want to know how to bring forth magical creatures from the ether, you've come to the right place!")
			.then(function () {
				maintalk(ctx.player, ctx.npc);
			});
	});
	scriptManager.bind(EventType.OPNPC5, 14866, function (ctx) {
		openShop(ctx.player);
	});
	
	function openShop (player) {
		varp(player, 304, Inv.SUMMONING_SHOP_1);
		varp(player, 305, Inv.SUMMONING_SHOP_FREE);
		varc(player, 2360, "Magestix's Summoning Shop");
		widget.openCentral(player, 1265);
	}
	
	function maintalk (player, npc) {
		dialog.multi3(player, "CHOOSE AN OPTION", "I need summoning supplies.", function () {		
			openShop(player);
		}, "I want to train summoning.", function () {
			howtotrain(player, npc);
		}, "Tell me more about summoning.", function () {
			moreinfo(player, npc);
		});
	}

	function howtotrain (player, npc) {
		dialog.chatnpc(player, npc, "You need to create pouches, by combining reagents with spirit shards.").finish(); 
	}
	
	function moreinfo (player, npc) {
		dialog.chatnpc(player, npc, "There is another world, besides this one. That world is filled with wondrous creatures, great and small. Summoning is the art of drawing those creatures forth to server you.")
			.chatnpc(npc, "By combining rare reagents with our spirit shards, you can create pouches to perform this act.").finish();
	}
	
	function farewell (player, npc) {
		dialog.chatnpc(player, npc, "Thank you for the information about Summoning.").finish();
	}
};