import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css'],
  animations: [
    trigger('flyInOut', [
      state('left', style({transform: 'translateX(-100%)'})),
      state('center', style({transform: 'translateX(0)'})),
      state('right', style({transform: 'translateX(100%)'})),
      transition('left => center', [
        style({transform: 'translateX(-105%)'}),
        animate(800)
      ]),
      transition('center => right', [
        animate(800, style({transform: 'translateX(105%)'}))
      ]),
      transition('right => center', [
        style({transform: 'translateX(105%)'}),
        animate(800)
      ]),
      transition('center => left', [
        animate(800, style({transform: 'translateX(-105%)'}))
      ]),
      transition('right => left', [
        style({transform: 'translateX(105%)'}),
      ]),
      transition('left => right', [
        style({transform: 'translateX(105%)'}),
      ])
    ])
  ]
})

export class SlideShowComponent implements OnInit {
  images: any[];
  buttons: any;
  currentIndex: number = 0;
  priorIndex: number = 0;
  imageWidth: number = 377;
  imageHeight: number = this.imageWidth * .5625;
  buttonWidth: number = 30;
  buttonHeight: number = 30;
  interval: any | undefined;
  interalMilSec: number = 5000; //5 seconds
  isShowStopped: boolean = false;
  menuState:string = 'forward';

  constructor() {
    this.buttons = {
      left: 'assets/images/buttons/left-arrow.png',
      right: 'assets/images/buttons/right-arrow.png',
      play: 'assets/images/buttons/play.png',
      pause: 'assets/images/buttons/pause.png',
    };

    this.images = [{
      src: 'assets/images/slides/pic1.JPG',
      title: 'Pic 1',
      visible: true,
      position: 'center'
    },{
      src: 'assets/images/slides/pic2.JPG',
      title: 'Pic 2',
      visible: false,
      position: 'left'
    },{
      src: 'assets/images/slides/pic3.JPG',
      title: 'Pic 3',
      visible: false,
      position: 'left'
    },{
      src: 'assets/images/slides/pic4.JPG',
      title: 'Pic 4',
      visible: false,
      position: 'left'
    },{
      src: 'assets/images/slides/pic5.JPG',
      title: 'Pic 5',
      visible: false,
      position: 'left'
    }];

    this.startCarousel();
  }

  ngOnInit() {}

  next(resetInterval: boolean, isFromPlay: boolean){
    let imageToHide: number = this.currentIndex
    if(this.currentIndex < this.images.length - 1){
      this.currentIndex++;
      this.priorIndex = imageToHide === 0 ? this.images.length - 1 : imageToHide - 1;
    } else {
      this.currentIndex = 0;
      this.priorIndex = this.images.length - 2
    }
    this.updateDisplayedImage(imageToHide, this.currentIndex, false)
    if((resetInterval && !this.isShowStopped) || isFromPlay){
      this.restartCarousel();
    }
  };

  prev(resetInterval: boolean){
    let imageToHide: number = this.currentIndex
    if(this.currentIndex > 0){
      this.currentIndex--
      this.priorIndex = imageToHide === 1 ? this.images.length - 1 : imageToHide - 2;
    } else {
      this.currentIndex = this.images.length - 1
      this.priorIndex = 2;
    }
    this.updateDisplayedImage(imageToHide, this.currentIndex, true)
    if(resetInterval && !this.isShowStopped){
      this.restartCarousel();
    }
  };

  updateDisplayedImage(imageToHide: any, imageToShow: any, reverse: boolean) {
    if(reverse){
      this.images[imageToHide].position = 'left';
      this.images[this.priorIndex].position = 'right';
    } else {
      this.images[imageToHide].position = 'right';
      this.images[this.priorIndex].position = 'left';
    }
    this.images[imageToShow].position = 'center';
  };

  autoPlay() {
    this.next(false, false);
  }

  startCarousel() {
    try {
      this.interval = setInterval (() => {
        this.autoPlay();
        }, this.interalMilSec)
        this.isShowStopped = false;
    } catch (error) {}
  }

  stopCarousel() {
    clearInterval(this.interval);
    this.isShowStopped = true;
  }

  restartCarousel() {
    this.stopCarousel();
    this.startCarousel();
  }
}
