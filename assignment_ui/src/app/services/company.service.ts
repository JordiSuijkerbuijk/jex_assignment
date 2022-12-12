import { Injectable } from '@angular/core';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor() {}

  public getCompanies(): Company[] {
    let company = new Company();
    company.id = 1;
    company.name = 'jex';
    company.address = 'Rotterdam';

    return [company];
  }
}
