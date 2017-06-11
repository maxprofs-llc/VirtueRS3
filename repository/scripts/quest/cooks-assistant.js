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
/* globals EventType */
var quest = require('../quest');
var dialog = require('../dialog');
var anim = require('../core/anim');
var inv = require('../inv');
var chat = require('../chat');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */
module.exports = (function () {
	var cooksAssistant = {
		init : init,
		openJournal : openJournal
	};
	
	return cooksAssistant;
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPNPC1, 278, function (ctx) {
			var player = ctx.player;
			var npc = ctx.npc;
			
			if(quest.hasFinished(player, 6)) {
				dialog.chatnpc(player, npc, "Hello, friend, how is the adventuring going?")
					.then(function () {
						cookFinished(player, npc);
					});
			} else if(quest.hasStarted(player, 6)) {
				dialog.chatnpc(player, npc, "How are you getting on with finding the ingredients?")
					.then(function () {
						cookStarted(player, npc);
					});
			} else {
				startCookDialog(player, npc);
			}
		});
		
		scriptManager.bind(EventType.OPLOC1, 47721, function (ctx) {
			// Milk cow
			var player = ctx.player;
			if (quest.hasStarted(player, 6) && !quest.hasFinished(player, 6)) {	
				if (inv.has(player, 15413)) {
					if(inv.has(player, 1925)) {
						chat.sendMessage(player, "You've already got some top-quality milk; you should take it to the cook.");
					} else {
						chat.sendMessage(player, "You'll need an empty bucket to collect the milk.");
					}
				} else {
					if (inv.has(player, 1925)) {
						anim.run(player, 2305, function () {
							inv.take(player, 1925, 1);
							inv.give(player, 15413, 1);
							chat.sendMessage(player, "You milk the cow for top-quality milk.");
						});
					} else {
						chat.sendMessage(player, "You'll need an empty bucket to collect the milk.");
					}
				}
			} else {	
				if (inv.has(player, 1925)) {
					dialog.mesbox(player, "If you're after ordinary milk, you should use an ordinary dairy cow.");
				} else {
					chat.sendMessage(player, "You'll need an empty bucket to collect the milk.");
				}			
			}
		});
		
		quest.register(6, cooksAssistant);
	}
	
	function openJournal (player, questLog) {
		if(quest.hasFinished(player, 6)) {
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=999999>It was the Duke of Lumbridge's birthday, but his cook had forgotten to buy the");
			questLog.setJournalLine(player, 3, "<col=999999>ingredients he needed to bake a birthdat cake. I brought the cook an egg, a pot");
			questLog.setJournalLine(player, 4, "<col=999999>of flour and a bucket of milk and the cook made a delicious-looking cake with");
			questLog.setJournalLine(player, 5, "<col=999999>them");
			questLog.setJournalLine(player, 6, "");
			questLog.setJournalLine(player, 7, "<col=FFFFFF>QUEST COMPLETE!");
			questLog.setJournalLine(player, 8, "<col=EB981F>I gained <col=EBE076>1 Quest Point<col=EB981F>, <col=EBE076>20 sardines<col=EB981F>, <col=EBE076>500 coins <col=EB981F>and <col=EBE076> 300 Cooking XP<col=EB981F>.");
			questLog.setJournalLine(player, 9, "<col=EB981F>I have also gained <col=EBE076>two prize keys<col=EB981F> for <col=EBE076>Treasure Hunter<col=EB981F>!");
			questLog.setJournalLine(player, 10, "<col=EB981F>The cook now also lets me use his high-quality <col=EBE076>range<col=EB981F>, which burns certain low-");
			questLog.setJournalLine(player, 11, "<col=EB981F>level dishes less often thsn other ranges.");
		} else {
			questLog.setJournalLine(player, 1, "");
			questLog.setJournalLine(player, 2, "<col=EB981F>I can start this quest by speaking to the <col=EBE076>Cook<col=EB981F> in the <col=EBE076>kitchen<col=EB981F> of <col=EBE076>Lumbridge");
			questLog.setJournalLine(player, 3, "<col=EBE076>Castle<col=EB981F>.");
		}
	}
	
	function cookFinished (player, npc) {
		dialog.multi4(player, "SELECT AN OPTION", "I'm getting strong and mighty.", function () {
			dialog.builder(player).chatplayer("I'm getting strong and mighty. Grr.")
				.chatnpc(npc, "Glad to hear it.").finish();
		}, "I keep on dying.", function () {
			dialog.builder(player).chatplayer("I keep on dying.")
				.chatnpc(npc, "Ah, well, at least you keep coming back to life too!");
		}, "Can i use your range?", function () {
			dialog.builder(player).chatplayer("Can i use your range?")
				.chatnpc(npc, "Go ahead! It's a very good range;it's better than most<br> other ranges.")
				.chatnpc(npc, "It's called the Cook-o-Matic 25 and it uses a combination<br> of state-of-the-art temperature regulation and magic.")
				.chatplayer("will it mean my food will burn less often?")
				.chatnpc(npc, "As long as the food is fairly easy to cook in the first place!")
				.then(function () {
					if(inv.has(player, 15411)) {
						dialog.builder(player).chatnpc(npc, "The manual you have in your inventory should tell you<br> more.")
						   .chatplayer("Thanks!").finish();
					} else {
						dialog.builder(player).chatnpc(npc, "Here, take this manual. It should tell you everything you<br> need to know about this range.")
							.then(function () {//and add item to inv
								inv.give(player, 15411, 1);
							}).objbox(15411, "The cook hands you a manual.")
							.chatplayer("Thanks!").finish();
				   }
				});
		}, "What happened to the castle?", function () {
			dialog.builder(player).chatnpc(npc, "The castle really did suffer in the battle of Lumbridge. I'm<br> glad it's over")
				.chatnpc(npc, "People came from all over the world to help rebuild, and<br> now things are getting back to normal. I'm glad - I have<br> important things to cook and I'm not letting anything get<br> in the way!")
				.finish();
		});
	}
	
	function cookStarted (player, npc) {// jshint ignore:line
		//TODO: Remove jshint ignore when implemented
		//TODO: Implement this
	}
	
	function startCookDialog (player, npc) {
		dialog.builder(player).chatnpc(npc, "What am I to do?")
			.multi5("SELECT AN OPTION", "What's wrong?", function () {		
				cookStartQuest(player, npc);
			}, "Can you make me a cake?", function () {
				dialog.builder(player).chatnpc(npc, "*sniff* Don't talk to me about cakes...")
					.then(function () {
						cookStartQuest(player, npc);
					});	
			}, "You don't look very happy.", function () {
				dialog.builder(player).chatnpc(npc, "No, I'm not. The world is caving in around me. I'm<br> overcome with dark feelings of impending doom.")
					.multi2("SELECT AN OPTION", "What's wrong?", function () {	
						cookStartQuest(player, npc);
					}, "I'd take the rest of the day off, if I were you.", function () {	
						cook2(player, npc);
					});
			}, "Nice hat!", function () {
				dialog.builder(player).chatnpc(npc, "Er, thank you. It's a pretty ordinary cook's hat, really.")
					.chatplayer("Still, it suits you. The trousers are pretty special too.")
					.chatnpc(npc, "It's all standard-issue cook's uniform.")
					.chatplayer("The whole hat, apron and stripy trousers ensemble...it<br> works. It makes you look like a real cook.")
					.chatnpc(npc, "I AM a real cook! I haven't got time to be chatting about culinary fashion, I'm in desperate need of help!")
					.then(function () {
						cookStartQuest(player, npc);
					});
			}, "What happened to the castle?", function () {
				dialog.builder(player).chatnpc(npc, "The castle really did suffer in the battle of Lumbridge. I'm<br> glad it's over")
					.chatnpc(npc, "People came from all over the world to help rebuild, and<br> now things are getting back to normal. I'm glad - I have<br> important things to cook and I'm not letting anything get<br> in the way!")
					.chatnpc(npc, "In fact, even now I'm preparing a cake for the Duke's<br> birthday! Although...umm...")
					.multi2("SELECT AN OPTION", "What's the problem?", function () {
						cookStartQuest(player, npc);
					}, "I'll let you get on with it!");
			});
	}
	
	function cook2 (player, npc) {
		dialog.builder(player).chatnpc(npc, "No, that's the worst thing I could do. I'd get in terrible<br> trouble.")
			.chatplayer("Well, maybe you need to take a holiday...")
			.chatnpc(npc, "That would be nice, but the Duke doesn't allow holidays<br> for core staff.")
			.chatplayer("Hmm, why not run away to the sea and start a new life as<br> a pirate?")
			.chatnpc(npc, "My wife gets seasick and I have an irrational fear of<br> eyepatches. I don't see it working.")		
			.chatplayer("I'm afraid I've run out of ideas.")	
			.chatnpc(npc, "I know, I'm doomed.")
			.then(function () {
				cookStartQuest(player, npc);	
			});
	}
	
	function cookStartQuest (player, npc) {
		dialog.builder(player).chatnpc(npc, "Oh dear, oh dear, oh dear, I'm in a terrible, terrible mess!<br> It's the Duke's birthday today, and I should be making him<br> a lovely, big birthday cake using special ingredients...")
			.chatnpc(npc, "...but I've forgotten to get the ingredients. I'll never get<br> them in time now. He'll sack me! Whatever will I do? I have<br> four children and a goat to look after. Would you help me?<br> Please?")
			.then(function () {
				chat.sendDebugMessage(player, "Quest start not yet implemented!");
				//TODO: start quest	
			})
			.finish();
	}
})();
