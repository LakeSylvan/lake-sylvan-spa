import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  BASE_URL = 'http://tomw.mooo.com:8080/camsnapshot.jpg?idx=';

  displayImageUrl : String | undefined;

  constructor() {}
  isMobile: boolean | undefined

  ngOnInit() {
      this.isMobile = window.innerWidth < 780;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.isMobile = window.innerWidth < 780;
  }

  selectCamara(index: string) : void {
    if(index != '4') {
      this.displayImageUrl = 'assets/images/lakeImageError.jpg'
    } else {
      this.displayImageUrl = undefined;
      this.displayImageUrl = this.BASE_URL + index;
    }
  }

}
