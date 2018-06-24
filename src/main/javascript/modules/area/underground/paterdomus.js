/**
 * Copyright (c) 2017 Virtue Studios
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
var coords = require('shared/map/coords');
var map = require('shared/map');
var anim = require('shared/anim');
var dialog = require('shared/dialog');
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {

	    scriptManager.bind(EventType.OPLOC1, 3433, function (ctx) {//Holly barrier
	        anim.run(ctx.player, 828, function () {
            map.setCoords(ctx.player, coords(3210, 3216, 0));
	        });
        });

		scriptManager.bind(EventType.OPLOC1, 3485, function (ctx) {//Well
		    dialog.mesbox(ctx.player, "You look down the well and see the filthy polluted water of the River Salve<br> moving slowly along.");
        });

	    scriptManager.bind(EventType.OPLOC1, 30575, function (ctx) {//Ladder
	        anim.run(ctx.player, 828, function () {
            map.setCoords(ctx.player, coords(0,53,54,13,49));
	        });
        });

	}

})();