import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ClientService } from './services/client.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  year: number = new Date().getFullYear();
  currentSection:any = 'Inicio';

  total_hospitals;
  total_schools;


  constructor(
    private _clientService: ClientService
  ) {

  }

  ngOnInit() {
    this.countSchoolAndHospital();
  }

  ngOnDestroy(): void {
  }

  /**
   * Window scroll method
   */
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
      navbar.classList.add('nav-sticky')
    } else {
      navbar.classList.remove('nav-sticky')
    }
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('topnav-menu-content').classList.toggle('show');
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  countSchoolAndHospital() {
    this._clientService.countHospitalSchool().subscribe({
      next: (resp:any) => {
        this.total_hospitals = resp.data.hospitals;
        this.total_schools = resp.data.schools;
      }
    })
  }
}
