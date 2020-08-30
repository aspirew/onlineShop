import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { FetchServiceService } from '../../services/fetch-service.service';

import { serviceData, reservationData } from '../../interfaces'
import { UserService } from '../../services/user.service';
import { ReservationsService } from '../../services/reservations.service';
import { status } from '../../constants'
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-visit',
  templateUrl: './book-visit.component.html',
  styleUrls: ['./book-visit.component.css']
})
export class BookVisitComponent implements OnInit {

  @ViewChild('serviceStep') sStep: MatStep;
  @ViewChild('stepper') stepper: MatStepper;

  constants = null
  hours = null
  pickedDate = null
  hour = null
  service : serviceData = null
  allServices = null
  reservations : Array<reservationData> = null
  email = new FormControl('', [Validators.required, Validators.email]);
  isLoggedIn = false;

  constructor(private utils: UtilsService,
    private fetchData: FetchServiceService,
    private user: UserService,
    private reservationService: ReservationsService,
    private router: Router) {

    var today = new Date()

    this.fetchData.getConstants().subscribe(res => {
    this.constants = res
    this.hours = this.constants.STANDARD_HOURS
      this.dateFilter = date => {
        const day = date.getDay()
        return !this.constants.CLOSED_AT.includes(day) && new Date(date.setHours(this.constants.OPENED_UNTIL)) > new Date()
      }

    if(this.dateFilter(today))
      this.pickedDate = new FormControl(today)
    else
      this.pickedDate = this.nextValidDate(today)

    })

    this.fetchData.getAllServices().subscribe((services) => {
      this.allServices = services
    })

    this.reservationService.getAllReservations().subscribe((reservations) =>{
      this.reservations = reservations
    })

    this.user.isLoggedIn().subscribe(u => {
      this.isLoggedIn = u.status
    })

  }

  async ngOnInit() {

  }

  isActive(hour) {
      var numOfUnavailableDatesInARow = this.service?.duration / 30
      var currentHourId = this.hours.indexOf(hour)
      return !this.reservations?.some(res => {
        return res.date == this.parseDate &&
        !this.hours.slice(currentHourId, currentHourId + numOfUnavailableDatesInARow)
        .every(h => this.hours.indexOf(h) < this.hours.indexOf(res.beginHour)
          || (res.finishHour && this.hours.indexOf(h) >= this.hours.indexOf(res.finishHour)))
      })
  }

  isPressed(item){
    return this.hour == item
  }

  dateFilter = _ => {
    return true
  }

  get parseDate() {
    return this.utils.parseDate(this.pickedDate.value)
  }

  nextValidDate(date){
    const tempDate = new Date(date)
    tempDate.setDate(tempDate.getDate() + 1)
    if(this.dateFilter(tempDate)) return new FormControl(tempDate)
    do{
      tempDate.setDate(tempDate.getDate() + 1)
    }while(!this.dateFilter(tempDate))
    return new FormControl(tempDate);
  }

  previousValidDate(date){
    const tempDate = new Date(date)
    tempDate.setDate(tempDate.getDate() - 1)
    if(this.dateFilter(tempDate)) return new FormControl(tempDate);
    do{
      tempDate.setDate(tempDate.getDate() - 1)
      if(tempDate.getDate() <= (new Date()).getDate()) return new FormControl(new Date(date))
    }while(!this.dateFilter(tempDate))
    return new FormControl(tempDate);
  }

  pick(item){
    if(this.isActive(item)){
      if(this.hour == item){
        this.hour = null
        return
      }
      this.hour = item
    }
  }

  pickService(service){
    this.service = service
    this.sStep.completed = true
    this.stepper.next()
  }

  removeSelection() {
    this.hour = null
  }

  setCheckedDate(forward: boolean){
    this.removeSelection()
    if(forward) this.pickedDate = this.nextValidDate(this.pickedDate.value)
    else this.pickedDate = this.previousValidDate(this.pickedDate.value)
  }

  get reservationPossible() {
    return this.dateFilter(this.pickedDate.value) && this.hour && this.service && (!this.email.invalid || this.isLoggedIn)
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Należy podać prawidłową wartość'
    }

    return this.email.hasError('email') ? 'Błędny adres email' : ''
  }

  async bookReservation(){
    let email = this.email.value

    if(this.isLoggedIn)
      email = (await this.user.getData().toPromise()).email

    this.reservationService.makeReservation({
      email: email,
      service: this.service._id,
      status: (new status).confirmed,
      date: this.parseDate,
      beginHour: this.hour,
      finishHour: null}).subscribe(res => {
        if(!res.success) alert(res.message)
        else this.router.navigate(['/'])
      })

  }

}
