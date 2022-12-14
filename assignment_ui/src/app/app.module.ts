import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { VacanciesListComponent } from './components/vacancies-list/vacancies-list.component';

@NgModule({
  declarations: [AppComponent, CompaniesListComponent, VacanciesListComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
