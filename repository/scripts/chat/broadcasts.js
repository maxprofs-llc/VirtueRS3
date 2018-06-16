/**
 * Copyright (c) 2014 Virtue Studios
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
/* globals EventType, Java */
var World = Java.type('org.virtue.game.World');

var chat = require('shared/chat');
var util = require('shared/util');

/**
 *
 */
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManger) {
		scriptManger.bind(EventType.COMMAND_ADMIN, "bc", function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;

			if (args.length < 1) {
				chat.sendCommandResponse(player, "<col=0099CC>ERROR! Message is to short or needs a space</col>", ctx.console);
				return;
			}
			var message = args[0].charAt(0).toUpperCase() + args[0].substr(1).toLowerCase();
			for (var i = 1; i < args.length; i++) {
				message += " "+args[i];
			}
			World.getInstance().sendAdminBroadcast("[" + util.getName(player) + "]: " + message);
			chat.sendCommandResponse(player, "Sent Broadcast accross the server.", ctx.console);
		});
	}
})();
