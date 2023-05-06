import { MatTableDataSource } from "@angular/material/table";

export interface WaterQualityResultDetail {
  depth?: number;
  site?: number;
  pH: number;
  temp: number;
  DO: number;
  MC: number
}
