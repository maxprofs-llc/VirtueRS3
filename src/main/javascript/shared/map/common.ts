import { CoordGrid } from 'engine/models';
import _config from 'engine/config';
import _map from 'engine/map';
import _coords from './coords';

/**
 * Checks whether the provided coordinates lie within the zone specified
 * @param from The start coords of the zone
 * @param to The end coords of the zone (inclusive)
 * @param coords The coordinates to check
 */
export function inZone(from: CoordGrid, to: CoordGrid, coord: CoordGrid): boolean {
	return MAP_ENGINE.inZone(from, to, coord);
}

export function getCoordHash(coords: number): CoordGrid {
	return ENGINE.getCoordHash(coords);
}

export function getGlobalCoord(squareCoord: number, localCoord: number): number {
	return (localCoord + ((squareCoord & 0xff) << 6));
}

export function getRotatedCoord(
	srcCoord: CoordGrid,
	zoneCoord: CoordGrid,
	mapRotation: number,
	locTypeId: number,
	locRotation: number
) {
	let tmp;
	let sizeX = _config.locSizeX(locTypeId);
	let sizeY = _config.locSizeY(locTypeId);
	if ((locRotation & 0x1) === 1) {
		tmp = sizeX;
		sizeX = sizeY;
		sizeY = tmp;
	}

	let localX = _map.getCoordX(srcCoord) & 0x7;
	let localY = _map.getCoordY(srcCoord) & 0x7;
	if (mapRotation == 1) {
		tmp = localX;
		localX = localY;
		localY = 7 - tmp - (sizeX - 1);
	} else if (mapRotation == 2) {
		localX = 7 - localX - (sizeX - 1);
		localY = 7 - localY - (sizeY - 1);
	} else if (mapRotation == 3) {
		tmp = localX;
		localX = 7 - localY - (sizeY - 1);
		localY = tmp;
	}
	return _coords(zoneCoord, localX, localY, 0);
}
