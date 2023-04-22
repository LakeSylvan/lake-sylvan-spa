import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  BASE_URL = 'http://tomw.mooo.com:8080/camsnapshot.jpg?idx=';

  displayImageUrl : String | undefined;

  constructor() {}

  ngOnInit() {}

  selectCamara(index: string) : void {
    if(index != '4') {
      this.displayImageUrl = 'assets/images/lakeImageError.jpg'
    } else {
      this.displayImageUrl = undefined;
      this.displayImageUrl = this.BASE_URL + index;
    }

  }

}
