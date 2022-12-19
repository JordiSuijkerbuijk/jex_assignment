import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Vacancy } from 'src/app/models/vacancy';
import { ModalService } from 'src/app/services/modal.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss', '../../../styles.scss'],
})
export class VacanciesListComponent {
  @Input() vacancies?: Vacancy[];
  @Input() company?: Company;
  @Output() updatedVacancies = new EventEmitter<Vacancy[]>();
  vacancy: Vacancy;
  editing: boolean = false;
  element?: HTMLElement;

  constructor(
    private companyService: VacancyService,
    private modalService: ModalService
  ) {
    this.vacancy = {
      title: '',
      description: '',
      company: undefined,
    };
  }

  ngOnInit(): void {}

  createVacancy(): void {
    if (!this.company) return;
    this.companyService
      .createVacancy({
        ...this.vacancy,
        company: {
          companyId: this.company?.companyId,
        },
      })
      .subscribe((vacancies) => this.updatedVacancies.emit(vacancies));
    this.toggleModal();
    this.resetVacancy();
  }

  deleteVacancy(vacancy: Vacancy): void {
    this.companyService
      .deleteVacancy(vacancy)
      .subscribe((vacancies) => this.updatedVacancies.emit(vacancies));
  }

  updateVacancy(vacancy: Vacancy): void {
    this.companyService
      .updateVacancy(vacancy)
      .subscribe((vacancies) => this.updatedVacancies.emit(vacancies));
    this.toggleEditing();
  }

  toggleModal(): void {
    this.element = document.querySelector('#vacancyModal') as HTMLElement;
    if (this.element) {
      this.modalService.toggleModal(this.element);
    }
  }

  toggleEditing(vacancy?: Vacancy): void {
    this.editing = !this.editing;
    if (vacancy) {
      this.vacancy = vacancy;
    }
  }

  resetVacancy(): void {
    this.vacancy = {
      title: '',
      description: '',
      company: undefined,
    };
  }
}
