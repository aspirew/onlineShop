import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import constants from '../../const/constants'
import { UtilsService } from '../utils.service';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { FetchServiceService } from '../fetch-service.service';

@Component({
  selector: 'app-book-visit',
  templateUrl: './book-visit.component.html',
  styleUrls: ['./book-visit.component.css']
})
export class BookVisitComponent implements OnInit {

  items = ["8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"]


  @ViewChild('serviceStep') sStep: MatStep;
  @ViewChild('stepper') stepper: MatStepper;

  pickedDate = null
  hour = null
  service = null
  allServices = null
  reservations = null
  email = new FormControl('', [Validators.required, Validators.email]);
  
  constructor(private utils: UtilsService, private fetchData: FetchServiceService) { 

    this.pickedDate = this.nextValidDate(new Date())

    this.fetchData.getAllServices().subscribe((services) => {
      this.allServices = services
    })

    this.fetchData.getAllReservations().subscribe((reservations) =>{
      this.reservations = reservations
    })

  }

  ngOnInit(): void {
  }

  isActive(hour) {
    return !this.reservations?.some(res => res.hour == hour && res.date == this.parseDate)
  }

  isPressed(item){
    return this.hour == item
  }

  dateFilter = date => {
    const day = date.getDay()
    return !constants.CLOSED_AT.includes(day) && new Date(date.setHours(constants.OPENED_UNTIL)) > new Date()
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

  pick(item){ // inne elementy z ngFor może przez viewCHild
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
    return !(this.dateFilter(this.pickedDate.value) && this.hour && this.service && !this.email.invalid)
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Należy podać prawidłową wartość'
    }

    return this.email.hasError('email') ? 'Błędny adres email' : ''
  }

}
