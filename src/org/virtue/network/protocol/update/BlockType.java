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
package org.virtue.network.protocol.update;

public enum BlockType {
	/**
	 * Sends player appearance and other data
	 */
	APPEARANCE(0x4, 11),
	
	/**
	 * Runs the given animation on an npc or player
	 */
	ANIMATION(0x8, 2, 0x4, 2),
	
	/**
	 * Specifies whether the player is in the same clan as the active player
	 */
	CLAN(0x8, 3),
	
	/**
	 * Turns the entity to face the specified direction
	 */
	TURN(0x80, 9, 0x10, 25),
	
	/**
	 * Requests the entity follows the specified entity
	 */
	FACE_ENTITY(0x40, 15, 0x80, 10),
	
	/**
	 * Forces the entity to move in the given sequence
	 */
	MOVE(0x20, 20, 0x800, 0),
	
	/**
	 * Forces the player to say the given message, which only appears in the chatbox of that player
	 */
	SAY_PRIVATE(0x100, 18),
	
	/**
	 * Forces the entity to say the given message. If specified, it will appear in the chatbox of nearby players
	 */
	SAY(0x10000, 12, 0x8, 15),
	
	GLOW(0x100000, 10, 0x10000000, 23),
	
	/**
	 * Attaches the specified spot (aka "graphic") to the entity in the first slot
	 */
	SPOT_1(0x1, 7, 0x2, 21),
	
	/**
	 * Attaches the specified spot (aka "graphic") to the entity in the second slot
	 */
	SPOT_2(0x200, 17, 0x200, 13),
	
	/**
	 * Attaches the specified spot (aka "graphic") to the entity in the third slot
	 */
	SPOT_3(0x4000, 1, 0x20000000, 7),
	
	/**
	 * Attaches the specified spot (aka "graphic") to the entity in the fourth slot
	 */
	SPOT_4(0x800000, 6, 0x2000000, 6),
	
	/**
	 * Attaches the specified spot (aka "graphic") to the entity in the fifth slot
	 */
	SPOT_5(0x40000, 5, 0x1000000, 9),
	
	/**
	 * Displays the specified icons above the entity
	 */
	HEADICONS(0x2000, 0, 0x20000, 1),
	
	/**
	 * Displays the specified hitmarks above the entity
	 */
	HITMARKS(0x2, 4, 0x1, 22),
	NPCTYPE(0, -1, 0x20, 16);
	
	private int playerMask;
	private int playerPos;
	
	private int npcMask;
	private int npcPos;
	
	BlockType (int playerMask, int playerPos) {
		this(playerMask, playerPos, 0, -1);
	}
	
	BlockType (int playerMask, int playerPos, int npcMask, int npcPos) {
		this.playerMask = playerMask;
		this.playerPos = playerPos;
		this.npcMask = npcMask;
		this.npcPos = npcPos;
	}

	public int getPlayerMask() {
		return playerMask;
	}

	public int getPlayerPos() {
		return playerPos;
	}

	public int getNpcMask() {
		return npcMask;
	}

	public int getNpcPos() {
		return npcPos;
	}
}