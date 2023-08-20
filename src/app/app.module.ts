import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';
import {MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table'
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MediaComponent } from './media/media.component';
import { HttpClientModule } from '@angular/common/http';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { LakeHealthComponent } from './lake-health/lake-health.component';
import { BusinessesComponent } from './businesses/businesses.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    TabsComponent,
    CalendarComponent,
    MediaComponent,
    SlideShowComponent,
    LakeHealthComponent,
    BusinessesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSortModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
