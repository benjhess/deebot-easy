export namespace Types {
  export type Credentials = {
    country: string;
    continent: string;
    accountId: string;
    password: string;
  }

  export type VacMeta = {
    did?: string;
    name?: string;
    class?: string;
    resource?: string;
    nick?: string;
    company?: string
  }

  export type VacMap = {
    mapID?: string;
    mapIndex?: number;
    mapName?: string;
    mapStatus?: number;
    mapIsCurrentMap?: boolean,
    mapIsBuilt?: boolean
  }

  export type VacMapArea = {
    mapID?: string;
    mapSpotAreaID?: string;
    mapSpotAreaName?: string;
    mapSpotAreaConnections?: string;
    mapSpotAreaBoundaries?: string;
    mapSpotAreaCanvas?: any;
  }

  export type ApiClient = {
    disconnect(): Promise<void>;
    connect(accountId: string, passwordHash: string): Promise<void>;
    getVacBot(clientUid: string, apiRealm: any, clientResource: any, accessToken: string, botMeta: Types.VacMeta, continent: string): any;
    devices(): Promise<Types.VacMeta[]>;
    user_access_token: string;
    resource: any;
    uid: string;
  }
}
