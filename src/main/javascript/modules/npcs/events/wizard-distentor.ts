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
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';

import { chatnpc, chatplayer } from 'shared/dialog';
import { getName } from 'shared/util';

_events.bindEventListener(EventType.OPNPC1, 14748, async (ctx) => {
	await chatplayer(ctx.player, "Merry Christmas Distentor!");
	await chatnpc(ctx.player, ctx.npc, "Merry Christmas "+ getName(ctx.player)+"!");
	await chatplayer(ctx.player, "So, what do you think of the banquet?");
	await chatnpc(ctx.player, ctx.npc, "It's okay, the turkey isn't dancing to the table but the<br> snow imps are good waiters.");
	await chatplayer(ctx.player, "Did you try any of the pudding?");
	await chatnpc(ctx.player, ctx.npc, "I did! I may not be a big pudding fan, but anything cooked<br> in a cannon has to be tried!");
	await chatplayer(ctx.player, "You are braver then I am.");
});