import { Component, HostListener, OnInit } from '@angular/core';
import { BusinessesService } from '../services/businesses.service';
import { Business } from '../models/business';

@Component({
  selector: 'businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {
  panelOpenState: boolean = false;
  fullBusinessesList: any[] = [];
  displayBusinessesList: any[] = [];
  lakeLogoPath = 'assets/images/LSlogo.png'
  isLakeOwnedChecked = false;
  isMobile: boolean | undefined

  constructor(
    private businessesService : BusinessesService
  ) { }

  ngOnInit() {
    this.isMobile = window.innerWidth < 780;
    this.businessesService.getBusinesshData().subscribe((data: Business[]) => {
      this.fullBusinessesList = data;
      this.displayBusinessesList = [...this.fullBusinessesList];
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.isMobile = window.innerWidth < 780;
  }

  onLakeOwnedToggle(){
    this.isLakeOwnedChecked = !this.isLakeOwnedChecked
    if(this.isLakeOwnedChecked) {
      this.displayBusinessesList = [];
      this.fullBusinessesList.forEach(business => {
        if (business.lakeOwned) {
          this.displayBusinessesList.push(business)
        }
      });
    } else {
      this.displayBusinessesList = [...this.fullBusinessesList]
    }
  }
}
