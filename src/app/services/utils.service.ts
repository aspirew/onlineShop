import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { cartData, cartInterface } from '../interfaces'
import { FetchServiceService } from './fetch-service.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router) { }


  navigate(url: string){
    this.router.navigateByUrl(url)
  }

  parseDate(date: Date){
    date = new Date(date)
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
