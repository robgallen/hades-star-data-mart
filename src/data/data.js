// modules
import Mining from './modules-mining.json';
import Shields from './modules-shield.json';
import Support from './modules-support.json';
import Trade from './modules-trade.json';
import Weapons from './modules-weapon.json';
// planets
import PlanetLevel from './planets-level.json';
import PlanetType from './planets-type.json';
import PlanetProduction from './planets-production.json';
// other
import Ships from './ships.json';

export default {
  // use custom object as json data is static : use $options.mods
  mods: {
    Mining: Mining,
    Shields: Shields,
    Support: Support,
    Trade: Trade,
    Weapons: Weapons
  },
  planets: {
    Level: PlanetLevel,
    Type: PlanetType,
    Production: PlanetProduction
  },
  Ships: Ships
};
