/**
 * Module containing miscellaneous utility functions
 */
/* globals ENGINE, EventType, Java */
var chat = require('../chat');

module.exports = init();

function init () {
	var utils = {
		INTEGER_MAX : 2147483647,
		checkOverflow : checkOverflow,
		defaultHandler : defaultHandler,
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
		toBase37Hash : toBase37Hash,
		toFormattedString : toFormattedString,
		toFormattedTime : toFormattedTime,
		delayFunction : delayFunction,
		runClientScript : runClientScript
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
		if (isAdmin(ctx.player)) {
			if (type === EventType.OPHELDU) {
				chat.sendMessage(ctx.player, "Unhandled item use: item="+ctx.item+", slot="+ctx.slot+", useitem="+ctx.useitem+", useslot="+ctx.useslot);
			} else {
				chat.sendMessage(ctx.player, "Unhandled "+(type?type:"interface")+" button: "+ctx.toString());
			}
		} else {
			chat.sendMessage(ctx.player, "Nothing interesting happens.");
		}
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
	
	function toFormattedString (number) {
		return ENGINE.getFormattedNumber(number);
	}
	
	function toFormattedTime (time) {
		return ENGINE.getFormattedTime(time);
	}
	
	/**
	 * Runs a function after a delay. This delay is attached to the entity and is interrupted if the entity is stopped
	 * @param entity The entity to link the task to
	 * @param cycles The number of server cycles before the task is run
	 * @param callback The function to run when the specified number of cycles passes
	 * @param interruptable True if the task can be interrupted before it's run (such as if the player moves). Defaults to true if not specified
	 * @param onInterrupt The function to run if the task is interrupted
	 */
	function delayFunction (entity, cycles, callback, interruptable, onInterrupt) {
		var Handler = Java.extend(Java.type('java.lang.Runnable'), {
			run : function () {
				callback();
			}
		});	
		if (interruptable === undefined) {
			ENGINE.delay(entity, new Handler(), cycles);
		} else {
			var handler = null;
			if (onInterrupt !== undefined) {
				var InterruptHandler = Java.extend(Java.type('java.lang.Runnable'), {
					run : function () {
						onInterrupt();
					}
				});
				handler = new InterruptHandler();
			}		
			ENGINE.delay(entity, new Handler(), cycles, interruptable, handler);
		}
	}
	
	function runClientScript (player, scriptId, args) {
		ENGINE.runClientScript(player, scriptId, args);
	}
}

