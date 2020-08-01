import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router) { }

  navigate(url: string){ 
    this.router.navigateByUrl(url)
  }

  parseDate(date: Date){
    let weekDays = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']

    let months = ['Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja',
      'Czerwca', 'Lipca', 'Sierpnia', 'Września', 'Października', 
      'Listopada', 'Grudnia']

    let weekDay = weekDays[date.getDay()]
    let day = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()

    return weekDay + ' ' + day + ' ' + month + ' ' + year
  }

}
