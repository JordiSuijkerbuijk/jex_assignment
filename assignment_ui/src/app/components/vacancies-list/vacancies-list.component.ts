import { Component } from '@angular/core';
import { Vacancy } from 'src/app/models/vacancy';

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss'],
})
export class VacanciesListComponent {
  test(vacancy: Vacancy) {
    console.log('test');
  }
}
