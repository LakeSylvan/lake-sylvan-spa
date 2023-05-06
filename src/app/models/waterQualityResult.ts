import { MatTableDataSource } from "@angular/material/table";
import { WaterQualityResultDetail } from "./waterQualityResultDetail";

export interface WaterQualityResult {
  date: Date;
  depth?: number;
  site?: number;
  pH: number;
  temp: number;
  DO: number;
  MC: number,
  waterQualityResultDetail?: WaterQualityResultDetail[] | any
}
