import { Component, HostListener, OnInit } from '@angular/core';
import AWS from 'aws-sdk'
import { LakeHealthService } from '../services/lake-health.service';
import { WaterQualityResult } from '../models/waterQualityResult';
// import * as AWS from 'aws-sdk';
// var AWS = require('aws-sdk');
AWS.config.update({
  region: "us-east-2",
  accessKeyId: "AKIAJBVGC73WU23JUOZA",
  secretAccessKey: "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"
});

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dynamodb = new AWS.DynamoDB();
  header: any;
  headerImage: string | undefined;
  message: string | undefined;
  isWarning: boolean | undefined;
  isMobile: boolean | undefined;

  constructor( private lakeHealthService: LakeHealthService ) {
    this.headerImage = this.getHeaderImageForSeason(new Date());
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 780;
    this.displayHeader()
    this.getMessage();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.isMobile = window.innerWidth < 780;
    this.displayHeader();
  }

  displayHeader(): void {
    this.header = this.isMobile ? 'assets/images/headerSmall.png' : 'assets/images/header.JPG'
  }

  getHeaderImageForSeason(now: Date): string {
    var currentYear = now.getUTCFullYear();
    let currentDate = new Date(currentYear, now.getUTCMonth(), now.getUTCDate())
    let springStartDate = new Date(currentYear, 2, 20)
    let summerStartDate = new Date(currentYear, 5, 21)
    let fallStartDate = new Date(currentYear, 8, 23)
    let winterStartDate = new Date(currentYear, 11, 21)

    let imagePath = 'assets/images/sylvan-winter-pano.jpg'
    if ( currentDate >= springStartDate && currentDate < summerStartDate ) {
      imagePath = 'assets/images/sylvan-spring-pano.jpg';
    } else if (currentDate >= summerStartDate && currentDate < fallStartDate) {
      imagePath = 'assets/images/sylvan-pano.jpg';
    } else if (currentDate >= fallStartDate && currentDate < winterStartDate) {
      imagePath = 'assets/images/sylvan-fall-pano.jpg';
    } else if (now.getUTCMonth() ==0) {
      imagePath = 'assets/images/sylvan-winter2-pano.jpg'
    }
    return imagePath;
  }

  // saveMessage(message: string, isWarning: boolean): void{
  //   var updateParams = {
  //     "TableName": "LS.Message",
  //     "Key": {
  //         "MessageId": { "S": "001"}
  //     },
  //     "UpdateExpression": "SET #T = :t, #W = :w",
  //     "ExpressionAttributeNames": {
  //         "#T": "Text",
  //         "#W": "WarningInd"
  //     },
  //     "ExpressionAttributeValues": {
  //         ":t": { "S": message},
  //         ":w": { "BOOL": isWarning}
  //     }
  //   };
  //   this.dynamodb.updateItem(updateParams).promise()
  //   .then((results) => {
  //     //Return a message to the user???
  //   })
  //   .catch();
  // }

  getMessage(): void {
    // var getItemParams = {
    //   "TableName": "LS.Message",
    //   "Key": {
    //       "MessageId": {
    //           "S": "001"
    //       }
    //   },
    // };
    // this.dynamodb.getItem(getItemParams).promise()
    // .then((results: any) => {
    //   this.setMessage(results.Item.Text.S);
    //   this.setIsWarning(results.Item.WarningInd.BOOL)
    // })
    // .catch();
    if (this.isLakeSession()) {
      this.lakeHealthService.getLakeHealthData().subscribe((data: WaterQualityResult[]) => {
        let lastTwoMCValues = this.getLastTwoMCValues(data);
        const isLastMCTooHigh = lastTwoMCValues[0].MC >= 8
        const isSecondToLastMCTooHigh = lastTwoMCValues[1].MC >= 8

        if (isLastMCTooHigh){
          this.setIsWarning(true);
          const message = `The most recent test of MC on ${lastTwoMCValues[0].date} showed the MC to be ${lastTwoMCValues[0].MC} Ug/L which is over the unsafe range starting at 8 Ug/L.  The lake is not safe for use`
          this.setMessage(message)
        } else if (isSecondToLastMCTooHigh) {
          const currentDate = new Date();
          const testDate = new Date(lastTwoMCValues[0].date);
          var difference = currentDate. getTime() - testDate. getTime();
          var differenceInDays = Math. ceil(difference / (1000 * 3600 * 24));
          if (differenceInDays < 15) {
            const message = `The most recent test of MC on ${lastTwoMCValues[0].date} showed the MC to be ${lastTwoMCValues[0].MC} Ug/L which is in the safe range being under 8 Ug/L.  The lake is safe for use`
            this.setIsWarning(false);
            this.setMessage(message)
          }
        }
      });
    }
  }

  isLakeSession(): boolean {
    const currentDate = new Date;
    const lakeMonths = [3,4,5,6,7,8,9]
    return lakeMonths.includes(currentDate.getUTCMonth())
  }

  getLastTwoMCValues(data: WaterQualityResult[]): WaterQualityResult[] {
    let pastTwoValues: WaterQualityResult[]= []
      data.forEach(waterQualityResult => {
        if (waterQualityResult.MC && pastTwoValues.length !== 2) {
          pastTwoValues.push(waterQualityResult);
        }
      });
    return pastTwoValues
  }

  setMessage(inMessage: string): void{
    this.message = inMessage;
  }

  setIsWarning(isWarningInd: boolean): void {
    this.isWarning = isWarningInd
  }

  dismissWarning(): void{
    this.message = undefined;
  }

}
