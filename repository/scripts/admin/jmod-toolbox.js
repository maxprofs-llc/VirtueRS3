/**
 * Copyright (c) 2016 Virtue Studios
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
/* globals EventType, ENGINE, Java */
var Render = Java.type('org.virtue.game.entity.player.PlayerModel.Render');

var coords = require('shared/map/coords');

var chat = require('shared/chat');
var widget = require('shared/widget');
var util = require('shared/util');
var map = require('shared/map');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {

		scriptManager.bind(EventType.IF_BUTTON, 1610, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			//for Deposit box
			//dialog.requestCount(player, "How many minutes should this deposit box be available? (insert 999 for the duration of the scenario)")
			//.then(function (time) {
			//loc 8927 at player coords then time
			//});
			case 82://Heal
				ENGINE.restoreLifePoints(player);
				chat.sendMessage(player, "You set your health to max.");
				return;
			case 115://Exit Button
				widget.closeAll(player);
				return;
			case 145://invis
				player.getModel().setRender(Render.INVISIBLE);
				player.getModel().refresh();
				return;
			case 185://Jmod Quick-Chat Option
				return;
			case 269://Panic!
				ENGINE.restoreLifePoints(player);
				map.setCoords(player, coords(2907, 3334, 3));
				widget.closeAll(player);
				chat.sendMessage(player, "Be healed!");
				chat.sendMessage(player, "Don't Panic Mr Mainwaring!");
				return;
			case 291://Keep Max HP
				chat.sendMessage(player, "Max HP timer toggled on.");
				chat.sendMessage(player, "todo add the code");
				return;
			default:
				util.defaultHandler(ctx, "JMod ToolBox");
				return;
			}
		});
	}
})();
