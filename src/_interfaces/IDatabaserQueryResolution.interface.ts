import { ISite } from "./ISite.interface";
import { SiteRoot } from "./interfaces";

export interface IDatabaseQueryResolution {
  status: string;
  payload: SiteRoot | string;
}
