import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { WaterQualityResult } from '../models/waterQualityResult';
import { LakeHealthService } from '../services/lake-health.service';
import { WaterQualityResultDetail } from '../models/waterQualityResultDetail';

@Component({
  selector: 'lake-health',
  templateUrl: './lake-health.component.html',
  styleUrls: ['./lake-health.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class LakeHealthComponent implements OnInit{

  @ViewChild('outerSort', { static: true }) sort: MatSort = new MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort> = new QueryList;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<WaterQualityResultDetail>> = new QueryList;

  dataSource: MatTableDataSource<WaterQualityResult> = new MatTableDataSource;
  waterQualityResultsData: WaterQualityResult[] = [];
  columnsToDisplay = ['date', 'MC', 'pH', 'temp', 'DO'];
  innerDisplayedColumns = ['depth', 'site', 'MC', 'pH', 'temp', 'DO'];
  expandedElement: WaterQualityResult | null | undefined;

  constructor(
    private cd: ChangeDetectorRef,
    private lakeHealthService: LakeHealthService
  ) { }

  ngOnInit() {
    this.setWaterQuailityResults();
  }

  setWaterQuailityResults(): void {
    this.lakeHealthService.getLakeHealthData().subscribe((data: WaterQualityResult[]) => {
      data.forEach(waterQualityResult => {
        if (waterQualityResult.waterQualityResultDetail && Array.isArray(waterQualityResult.waterQualityResultDetail) && waterQualityResult.waterQualityResultDetail.length) {
          this.waterQualityResultsData = [...this.waterQualityResultsData, {...waterQualityResult, waterQualityResultDetail: new MatTableDataSource(waterQualityResult.waterQualityResultDetail)}];
        } else {
          this.waterQualityResultsData = [...this.waterQualityResultsData, waterQualityResult];
        }
      });
      this.dataSource = new MatTableDataSource(this.waterQualityResultsData);
      this.dataSource.sort = this.sort;
    });
  }

  toggleRow(element: WaterQualityResult) {
    element.waterQualityResultDetail && (element.waterQualityResultDetail as MatTableDataSource<WaterQualityResultDetail>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<WaterQualityResultDetail>).sort = this.innerSort.toArray()[index]);
  }

  // applyFilter(filterValue: any) {
  //   this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<WaterQualityResultDetail>).filter = filterValue.value.trim().toLowerCase());
  // }
}
