/**
 * Copyright (c) 2016 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
/* globals EventType, */

var dialog = require('dialog');
module.exports = (function () {
	return {
	init : init
	};
	
	function init (scriptManager) {
		
	   scriptManager.bind(EventType.OPNPC1, 14756, function (ctx) {
	        dialog.builder(ctx.player).chatplayer("Merry Christmas Shug!")
	        .chatnpc(ctx.npc, "Zzzz....")
			.chatnpc(ctx.npc, "Urrgghhh...Watch out for that thingummywut Traiborn!!")
			.chatnpc(ctx.npc, "Zzzz....")
			.chatplayer("I had better not let Traiborn know about this. It won't do<br> him any good....")
		    .finish();
	   });	
	   
    }
	
})();
