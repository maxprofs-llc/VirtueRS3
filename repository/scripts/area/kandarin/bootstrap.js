/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
	    require('./ardougne'),
		require('./fight-arena'),
		require('./piscatoris-fishing-colony'),
		require('./yanille')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};