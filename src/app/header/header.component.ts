import { Component, OnInit } from '@angular/core';
import AWS from 'aws-sdk'
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

  constructor() {
    this.header = {
      url: 'assets/images/header.JPG',
      display: true,
    };
    this.headerImage = this.getHeaderImageForSeason(new Date());
  }

  ngOnInit() {
    // this.getMessage();
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

  saveMessage(message: string, isWarning: boolean): void{
    var updateParams = {
      "TableName": "LS.Message",
      "Key": {
          "MessageId": { "S": "001"}
      },
      "UpdateExpression": "SET #T = :t, #W = :w",
      "ExpressionAttributeNames": {
          "#T": "Text",
          "#W": "WarningInd"
      },
      "ExpressionAttributeValues": {
          ":t": { "S": message},
          ":w": { "BOOL": isWarning}
      }
    };
    this.dynamodb.updateItem(updateParams).promise()
    .then((results) => {
      //Return a message to the user???
    })
    .catch();
  }

  getMessage(): void {
    var getItemParams = {
      "TableName": "LS.Message",
      "Key": {
          "MessageId": {
              "S": "001"
          }
      },
    };
    this.dynamodb.getItem(getItemParams).promise()
    .then((results: any) => {
      this.setMessage(results.Item.Text.S);
      this.setIsWarning(results.Item.WarningInd.BOOL)
    })
    .catch();
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
