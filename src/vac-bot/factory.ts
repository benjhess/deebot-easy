import {filterObjects} from '../helper/filter';
import * as deebot from 'ecovacs-deebot';
import * as machineId from 'node-machine-id';
const Api = deebot.EcoVacsAPI;
import {Types} from '../../types';
import {VacBot} from '../vac-bot';


export class VacBotFactory {
  private timeoutMs = 6000;

  public async getVacBot(cred: Types.Credentials, search: Types.VacMeta): Promise<VacBot> {
    const deviceId = Api.md5(machineId.machineIdSync());
    const client: Types.ApiClient = new Api(deviceId, cred.country, cred.continent);

    await client.connect(cred.accountId, Api.md5(cred.password));
    const VacMetas: Types.VacMeta[] = await client.devices();
    const VacMeta = this.searchVacMeta(VacMetas, search);

    if (!VacMeta) {
      return null;
    }

    const VacClient = await this.getVacBotAdapter(client, VacMeta, cred.continent);
    return new VacBot(VacClient, this.timeoutMs);
  }

  private searchVacMeta(VacMetas: Types.VacMeta[], search: Types.VacMeta): Types.VacMeta {
    const filtered = filterObjects(VacMetas, search);
    return filtered.length ? filtered[0]: null;
  }

  private getVacBotAdapter(client: Types.ApiClient, vacMeta: Types.VacMeta, continent: string): Promise<any> {
    return new Promise((resolve) => {
      const vacBot = client.getVacBot(client.uid, Api.REALM, client.resource, client.user_access_token, vacMeta, continent);
      vacBot.on('ready', () => resolve(vacBot));
      vacBot.connect_and_wait_until_ready();
      setTimeout(resolve, this.timeoutMs);
    })
  }
}
