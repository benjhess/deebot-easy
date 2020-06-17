import {filterObjects} from './helper/filter';
import {Types} from '../types';


export class VacBot {
  public constructor(private adapter: any, private timeoutMs: number = 6000) {
  }

  public getMaps(filter: Types.VacMap = null): Promise<Types.VacMap[]> {
    return new Promise(resolve => {
      this.adapter.run('getMaps');
      this.adapter.on('Maps', res => resolve(filter ? filterObjects(res.maps, filter) : res.maps));
      setTimeout(() => resolve([]), this.timeoutMs);
    });
  }

  public async getMap(search: Types.VacMap): Promise<Types.VacMap> {
    return (await this.getMaps(search) || []).pop();
  }

  public getAreaIds(map: Types.VacMap): Promise<string[]> {
    return new Promise(resolve => {
      this.adapter.run('getSpotAreas', map.mapID);
      this.adapter.on('MapSpotAreas', areas => {
        const areaIds = [];
        areas.mapSpotAreas.forEach(spot => areaIds.push(spot.mapSpotAreaID));
        resolve(areaIds);
      });
      setTimeout(() => resolve([]), this.timeoutMs);
    });
  }

  public getAreaById(map: Types.VacMap, areaId: string): Promise<Types.VacMapArea> {
    return new Promise(resolve => {
      this.adapter.run('getSpotAreaInfo', map.mapID, areaId);
      this.adapter.on('MapSpotAreaInfo', res => resolve(res));
      setTimeout(resolve, this.timeoutMs);
    });
  }

  public async getAreas(map: Types.VacMap, filter: Types.VacMapArea = null): Promise<Types.VacMapArea[]> {
    const areaIds = await this.getAreaIds(map);
    const areas: Types.VacMapArea[] = [];

    for (const areaId of areaIds) {
      const area = await this.getAreaById(map, areaId);
      area && areas.push(area);
    }

    return filter ? filterObjects(areas, filter) : areas;
  }

  public async getArea(map: Types.VacMap, search: Types.VacMapArea = null): Promise<Types.VacMapArea> {
    return (await this.getAreas(map, search) || []).pop();
  }

  public clean() {
    this.adapter.run('clean');
  }

  public pause() {
    this.adapter.run('pause');
  }

  public resume() {
    this.adapter.run('resume');
  }

  public stop() {
    this.adapter.run('stop');
  }

  public charge() {
    this.adapter.run('charge');
  }

  public cleanArea(area: Types.VacMapArea, passCount: number = 1) {
    this.adapter.run('spotarea', 'start', area.mapSpotAreaID, passCount);
  }

  public playSound(soundId: number) {
    this.adapter.run('playSound', `${soundId}`);
  }

  public disconnect(): void {
    this.adapter.disconnect();
  }
}
