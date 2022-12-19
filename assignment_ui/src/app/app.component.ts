import { Component } from '@angular/core';
import { Company } from './models/company';
import { Vacancy } from './models/vacancy';
import { CompanyService } from './services/company.service';
import { VacancyService } from './services/vacancy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  companies: Company[] = [];
  vacancies: Vacancy[] = [];
  companyModal?: HTMLElement;
  vacancyModal?: HTMLElement;
  selectedCompany?: Company;

  constructor(
    private companyService: CompanyService,
    private vacancyService: VacancyService
  ) {}

  ngOnInit(): void {
    //Fetch companies shown on the page
    this.companyService
      .getCompanies()
      .subscribe((result: Company[]) => (this.companies = result));

    this.selectedCompany = this.companies[0];

    this.fetchVacancies(this.companies[0]);

    this.companyModal = document.querySelector('#companyModal') as HTMLElement;
  }

  updateCompaniesList(companies: Company[]) {
    this.companies = companies;
  }

  updateVacanciesList(vacancies: Vacancy[]) {
    this.vacancies = vacancies;
  }

  updateSelectedCompany(company: Company) {
    if (company === this.selectedCompany) return;
    this.selectedCompany = company;
    this.fetchVacancies(company);
  }

  fetchVacancies(company: Company) {
    if (!company) return;
    this.vacancyService
      .getVacancies(company)
      .subscribe((result: Vacancy[]) => (this.vacancies = result));
  }
}
