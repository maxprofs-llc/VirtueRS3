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
var anim = require('shared/anim');
var map = require('shared/map');
var inv = require('shared/inv');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
	 scriptManager.bind(EventType.OPHELD1, 6, function (ctx) {//cannon
		 var coords = map.getCoords(ctx.player);
		 anim.run(ctx.player, 827, function () {
			 map.addLoc(7, coords, 10, 0);
			 inv.take(ctx.player, 6, 1);
		     anim.run(ctx.player, 827, function () {
				 map.addLoc(8, coords, 10, 0);
				 inv.take(ctx.player, 8, 1);
				 anim.run(ctx.player, 827, function () {
					 map.addLoc(9, coords, 10, 0);
					 inv.take(ctx.player, 10, 1);
				     anim.run(ctx.player, 827, function () {
						 map.addLoc(6, coords, 10, 0);
						 inv.take(ctx.player, 12, 1);
				     });
				 });
		     });
	     });
	 });
	}

})();