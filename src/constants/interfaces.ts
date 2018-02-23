export interface NetworkStats {
    timestamp: number
}

export interface PoolStats {

}

export interface PoolConfigs {
    
}

export interface Block {

}

export interface Payment {
    
}

export interface AuthResponse {
    msg: string
}

export interface PageParams {
    slug: string,
    title: string,
    icon: string
}

export interface Ports {
    
}

export interface ExchangeSocketMessage {
    FLAGS?: string,
    FROMSYMBOL?: string,
    HIGH24HOUR?: number,
    HIGHHOUR?: number,
    LASTMARKET?: string,
    LASTTRADEID?: number,
    LASTUPDATE?: number,
    LASTVOLUME?: number,
    LASTVOLUMETO?: number,
    LOW24HOUR?: number,
    LOWHOUR?: number,
    MARKET?: string,
    OPEN24HOUR?: number,
    OPENHOUR?: number,
    PRICE?: number,
    TOSYMBOL?: string,
    TYPE?: string,
    VOLUME24HOUR?: number,
    VOLUME24HOURTO?: number,
    VOLUMEHOUR?: number,
    VOLUMEHOURTO?: number
  }