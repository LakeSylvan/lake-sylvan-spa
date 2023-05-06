import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { WaterQualityResult } from '../models/waterQualityResult';
import { WaterQualityResultDetail } from '../models/waterQualityResultDetail';

@Injectable({
  providedIn: 'root'
})
export class LakeHealthService {

  constructor( private http: HttpClient ) { }

  getLakeHealthData(): Observable<WaterQualityResult[]> {
    return this.http.get<WaterQualityResult[]>("./assets/data/ph_temp_do.json")
    .pipe(
      map((respnse: WaterQualityResult[]) => {
        // const newResponse = this.setParentChildRelationship(respnse);
        return this.setParentChildRelationship(respnse);
      }),
      catchError((error: HttpErrorResponse): Observable<any> => {
          return throwError(() => error);
      })
    );
  }

  setParentChildRelationship(waterQualitydata: WaterQualityResult[]): WaterQualityResult[] {
    let sortedWaterQualitydata = this.sortWaterQualityResutsByDate(waterQualitydata);
    let waterQualitydataWithRelationship: WaterQualityResult[] = []

    let date = new Date();
    let parent: WaterQualityResult;
    let pHCount: number = 0;
    let tempCount: number = 0;
    let DOCount: number = 0;
    let MCCount: number = 0;

    sortedWaterQualitydata.forEach((data: WaterQualityResult) => {
      if (new Date(data.date).getTime() === date.getTime()){
        //add the childs values to the parent and increate the acount
        if (data.pH) {
          parent.pH = (parent.pH ? parent.pH + data.pH : data.pH);
          pHCount = ++pHCount;
        }
        if (data.temp) {
          parent.temp = (parent.temp ? parent.temp + data.temp : data.temp);
          tempCount = ++tempCount;
        }
        if (data.DO) {
          parent.DO = (parent.DO ? parent.DO + data.DO : data.DO);
          DOCount = ++DOCount;
        }
        if (data.MC) {
          parent.MC = (parent.MC ? parent.MC + data.MC : data.MC);
          MCCount = ++MCCount;
        }
        //add the child to the parent
        parent.waterQualityResultDetail?.push(this.getWaterQualityResultDetailObject(data));

      } else {
        if(parent) {
          //set the averages on the parent and then reset the count
          if (parent.pH) parent.pH = parseFloat((parent.pH / pHCount).toFixed(2));
          if (parent.temp) parent.temp = parseFloat((parent.temp / tempCount).toFixed(2));
          if (parent.DO) parent.DO = parseFloat((parent.DO / DOCount).toFixed(2));
          if (parent.MC) parent.MC = parseFloat((parent.MC / MCCount).toFixed(2));
          //push the parent new parent object to our list of parents
          waterQualitydataWithRelationship.push({ ...parent });
       }
        //set the new date
        date = new Date(data.date);
        //reset the parent object
        parent = {
          date: data.date,
          depth: undefined,
          site: undefined,
          pH: data.pH,
          temp: data.temp,
          DO: data.DO,
          MC: data.MC,
          waterQualityResultDetail: [this.getWaterQualityResultDetailObject(data)]
        };
          pHCount = data.pH ? 1: 0;
          tempCount = data.temp ? 1: 0;
          DOCount = data.DO ? 1: 0;
          MCCount = data.MC ? 1: 0;
      }
    })
    return waterQualitydataWithRelationship;
  }

  sortWaterQualityResutsByDate(waterQualityResult: WaterQualityResult[]): WaterQualityResult[] {
    return waterQualityResult.sort(function(a,b){
      if (new Date(a.date) > new Date(b.date))    return -1;
      else if(new Date(a.date) < new Date(b.date)) return  1;
      else                      return  0;
    });
  }

  getWaterQualityResultDetailObject(data: WaterQualityResult): WaterQualityResultDetail {
    return {
      depth: data.depth,
      site: data.site,
      pH: data.pH,
      temp: data.temp,
      DO: data.DO,
      MC: data.MC,
    }
  }
}
