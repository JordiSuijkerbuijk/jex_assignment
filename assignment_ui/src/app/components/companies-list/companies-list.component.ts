import { Component, Input } from '@angular/core';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
})
export class CompaniesListComponent {
  //All companies that are listed on the homepage
  companies: Company[] = [];
  @Input() selectedCompany: Company = { name: '', address: '' };
  editing: boolean = false;
  element: HTMLElement | undefined = undefined;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    //Fetch companies shown on the page
    this.companyService
      .getCompanies()
      .subscribe((result: Company[]) => (this.companies = result));

    this.element = document.querySelector(`#modal`) as HTMLElement;
  }

  //Function that changes the selectedCompany
  setSelectedCompany(companyIndex: number): void {
    this.selectedCompany = this.companies[companyIndex];
  }

  //Function that toggles the modal and sets the selectedCompany
  toggleModal(companyIndex?: number): void {
    if (this.element) {
      this.element.classList.toggle('open');
    }

    if (typeof companyIndex === 'number') {
      this.setSelectedCompany(companyIndex);
    }
  }

  toggleEditing(company: Company): void {
    console.log('company', company);
    this.editing = !this.editing;
    this.companyService
      .updateCompany(company)
      .subscribe((companies: Company[]) => (this.companies = companies));
  }
}
