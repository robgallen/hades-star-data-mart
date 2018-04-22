import shield from "./modules-shield.json";
import support from "./modules-support.json";
import weapon from "./modules-weapon.json";

export default {
	// use custom object as json data is static : use $options.mods
	mods: {
		shield: shield,
		support: support,
		weapon: weapon
	}
};
