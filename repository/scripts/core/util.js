/**
 * Module containing miscellaneous utility functions
 */
/* globals ENGINE, MesType */
module.exports = init();

function init () {
	var utils = {
		INTEGER_MAX : 2147483647,
		checkOverflow : checkOverflow,
		defaultHandler : defaultHandler,
		sendCommandResponse : sendCommandResponse,
		isAdmin : isAdmin,
		getId : getId,
		randomValue : randomValue,
		pickRandom : pickRandom,
		weightedRandom : weightedRandom,
		lootItem : lootItem,
		testBit : testBit,
		setBit : setBit,
		unsetBit : unsetBit,
		getName : getName,
		getUserHash : getUserHash,
		fromBase37Hash : fromBase37Hash,
		toBase37Hash : toBase37Hash
	};
	return utils;
	
	/**
	 * Checks whether the addedValue would cause a Java integer overflow if added to currentValue
	 * @param currentValue The currently held value
	 * @param addedValue The value to add
	 * @returns True if an overflow would occur, false otherwise
	 */
	function checkOverflow (currentValue, addedValue) {
		return (utils.INTEGER_MAX-currentValue)<addedValue;
	}

	function defaultHandler (ctx, type) {
		if (ENGINE.isAdmin(ctx.player)) {
			ENGINE.sendMessage(ctx.player, "Unhandled "+(type?type:"interface")+" button: "+ctx.toString());
		} else {
			ENGINE.sendMessage(ctx.player, "Nothing interesting happens.");
		}
	}

	function sendCommandResponse (player, message, console) {
		ENGINE.sendMessage(player, message, console ? MesType.CONSOLE : MesType.GAME);
	}
	
	function isAdmin (player) {
		return ENGINE.isAdmin(player);
	}
	
	function getId (node) {
		return ENGINE.getId(node);
	}
	
	function randomValue (min, max) {
		return (Math.random()*(max-min))+min;
	}
	
	function pickRandom (values) {
		return values[Math.floor(Math.random()*values.length)];
	}
	
	function weightedRandom (common, uncommon, uncommonChance, rare, rareChance, veryRare, veryRareChance) {
		var selected = Math.random();
		if (typeof veryRare !== "undefined" && selected > veryRareChance) {
			return pickRandom(veryRare);
		} else if (typeof rare !== "undefined" && selected > rareChance) {
			return pickRandom(rare);			
		} else if (typeof uncommon !== "undefined" && selected > uncommonChance) {
			return pickRandom(uncommon);			
		} else {
			return pickRandom(common);
		}
	}
	
	function lootItem (id, min, max) {
		return {
			id : id,
			min : min,
			max : max
		};
	}

	function testBit (value, bit) {
		return (value & 1 << bit) !== 0;
	}

	function setBit (value, bit) {
		return value | 1 << bit;
	}

	function unsetBit (value, bit) {
		return value & -1 - (1 << bit);
	}
	
	function getName (entity) {
		return ENGINE.getName(entity);
	}
	
	function getUserHash (player) {
		return ENGINE.getUserHash(player);
	}
	
	function fromBase37Hash (hash) {
		return ENGINE.fromBase37Hash(hash);
	}
	
	function toBase37Hash (hash) {
		return ENGINE.getBase37Hash(hash);
	}
}

