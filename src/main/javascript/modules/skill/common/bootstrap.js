/**
 * Module to initialise the cooking script bindings.
 */

module.exports = function (scriptManager) {
	var modules = [
		require('./commands'),
		require('./skill-tab')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};