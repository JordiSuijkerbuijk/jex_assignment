import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
})
export class CompaniesListComponent {
  //All companies that are listed on the homepage
  @Input() companies: Company[];
  company?: Company;
  @Output() updatedCompanies = new EventEmitter<Company[]>();
  @Input() element?: HTMLElement;
  editing: boolean = false;

  constructor(
    private companyService: CompanyService,
    private modalService: ModalService
  ) {
    this.companies = [];
  }

  ngOnInit(): void {}

  deleteCompany(company: Company): void {
    this.companyService
      .deleteCompany(company)
      .subscribe((companies) => this.updatedCompanies.emit(companies));
  }

  updateCompany(company: Company): void {
    this.companyService
      .updateCompany(company)
      .subscribe((companies) => this.updatedCompanies.emit(companies));
    this.toggleEditing();
  }

  createCompany(): void {
    this.companyService
      .createCompany({ name: 'tet', address: 'yeet' })
      .subscribe((companies) => this.updatedCompanies.emit(companies));
    this.toggleModal();
  }

  toggleEditing(company?: Company): void {
    this.editing = !this.editing;
    if (company) {
      this.company = company;
    }
  }

  toggleModal(): void {
    if (this.element) {
      this.modalService.toggleModal(this.element);
    }
  }
}
