import { Component } from '@angular/core';
import { Company } from './models/company';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  companies: Company[] = [];
  modalElement?: HTMLElement;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    //Fetch companies shown on the page
    this.companyService
      .getCompanies()
      .subscribe((result: Company[]) => (this.companies = result));

    this.modalElement = document.querySelector(`#modal`) as HTMLElement;
  }

  updateCompaniesList(companies: Company[]) {
    this.companies = companies;
  }
}
