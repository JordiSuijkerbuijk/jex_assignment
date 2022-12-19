import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environments';
import { Company } from '../models/company';
import { Vacancy } from '../models/vacancy';

@Injectable({
  providedIn: 'root',
})
export class VacancyService {
  private url = 'Vacancy';
  constructor(private http: HttpClient) {}

  public getVacancies(company: Company): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(
      `${environment.apiUrl}/${this.url}/${company.companyId}`
    );
  }

  public createVacancy(vacancy: Vacancy): Observable<Vacancy[]> {
    return this.http.post<Vacancy[]>(
      `${environment.apiUrl}/${this.url}`,
      vacancy
    );
  }

  public updateVacancy(vacancy: Vacancy): Observable<Vacancy[]> {
    return this.http.put<Vacancy[]>(
      `${environment.apiUrl}/${this.url}`,
      vacancy
    );
  }

  public deleteVacancy(vacancy: Vacancy): Observable<Vacancy[]> {
    return this.http.delete<Vacancy[]>(
      `${environment.apiUrl}/${this.url}/${vacancy.id}`
    );
  }
}
