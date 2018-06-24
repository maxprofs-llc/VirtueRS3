/**
 * Copyright (c) 2015 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/* globals EventType */
var anim = require('shared/anim');
var dialog = require('shared/dialog');
var chat = require('shared/chat');
var util = require('shared/util');

/**
 * @Author Kayla
 * @Date 11/14/2015
 */
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND_ADMIN, "freeze", function (ctx) {
			var player = ctx.player;
			var message = "Please enter the display name of the player you wish to freeze:";
			dialog.requestPlayer(player, message, function (targetPlayer) {
				chat.sendMessage(player, "You have frozen the player named: " + util.getName(targetPlayer));
				anim.run(player, 1979);
				anim.addSpotAnim(player, 366);
				anim.addSpotAnim(targetPlayer, 369);
				targetPlayer.lock();
				chat.sendMessage(targetPlayer, "You have been frozen.");
			});
		});

		scriptManager.bind(EventType.COMMAND_ADMIN, "unfreeze", function (ctx) {
			var player = ctx.player;
			var message = "Please enter the display name of the player you wish to unfreeze:";
			dialog.requestPlayer(player, message, function (targetPlayer) {
				chat.sendMessage(player, "You have unfrozen the player: "+util.getName(targetPlayer));
				targetPlayer.unlock();
				chat.sendMessage(targetPlayer, "You can now move again!");
			});
		});
	}
})();