export interface PlacesResponse {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_es: string;
  language_es?: Language;
  place_name_es: string;
  text: string;
  language?: Language;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
  matching_text?: string;
  matching_place_name?: string;
}

export interface Context {
  id: ID;
  short_code: ShortCode;
  wikidata: Wikidata;
  text_es: Text;
  language_es: Language;
  text: Text;
  language: Language;
}

export enum ID {
  Country5596864799773450 = 'country.5596864799773450',
  Region10307146222929210 = 'region.10307146222929210',
  Region10614496175993390 = 'region.10614496175993390',
}

export enum Language {
  Es = 'es',
}

export enum ShortCode {
  MX = 'mx',
  MXAgu = 'MX-AGU',
  MXSlp = 'MX-SLP',
}

export enum Text {
  Aguascalientes = 'Aguascalientes',
  México = 'México',
  SANLuisPotosí = 'San Luis Potosí',
}

export enum Wikidata {
  Q78980 = 'Q78980',
  Q79952 = 'Q79952',
  Q96 = 'Q96',
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  wikidata?: string;
}
