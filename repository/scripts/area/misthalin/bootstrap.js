/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
		require('./draynormanor-and-village'),
		require('./lumbridge-and-lumbridge-swamp')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};