import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import {NzCardModule} from "ng-zorro-antd/card";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NzMenuModule} from "ng-zorro-antd/menu";
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzCardModule,
    NzLayoutModule,
    ReactiveFormsModule,
    NzMenuModule,
    NzUploadModule,
    NzCheckboxModule,
    NzTableModule,
    NzSelectModule,
    NzIconModule,
    NzDatePickerModule,
    NzBadgeModule,
    NzButtonModule,
    NzTimePickerModule,
    NzDrawerModule,
    NzMenuModule,
    NzDropDownModule,
    NzAvatarModule,

    NzFormModule,








  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
