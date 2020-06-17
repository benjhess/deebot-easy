import {VacBotFactory} from '../src/vac-bot/factory';
import {Types} from '../types';

const credentials: Types.Credentials = {
  accountId: 'your@mail.tld',
  password: 'yourPassword',
  continent: 'EU',
  country: 'DE'
};

(async () => {
  const factory = new VacBotFactory();

  // get vac bot by nick
  const vacBot = await factory.getVacBot(credentials, {nick: 'Berta'});

  // get currently active map
  const map = await vacBot.getMap({mapIsCurrentMap: true});

  // get area by name
  const area = await vacBot.getArea(map, {mapSpotAreaName: 'Sunroom'});

  // start cleaning the area
  vacBot.cleanArea(area);

  // return to charging dock after 20 seconds
  setTimeout(() => vacBot.charge(), 20000);

  // disconnect from vac bot after 25 seconds
  setTimeout(() => vacBot.disconnect(), 25000);
})();
