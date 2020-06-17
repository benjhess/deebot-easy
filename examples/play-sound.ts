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

  // play startup chime sound
  vacBot.playSound(0);

  // disconnect from vac bot
  vacBot.disconnect()
})();
