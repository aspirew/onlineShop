import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import constants from '../../const/constants'
import { UtilsService } from '../utils.service';
import { MatStep, MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-book-visit',
  templateUrl: './book-visit.component.html',
  styleUrls: ['./book-visit.component.css']
})
export class BookVisitComponent implements OnInit {

  data = [
    {
      title: "Masaż normalny",
      duration: 30,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu turpis non lorem sollicitudin varius. Curabitur bibendum, erat et imperdiet tempus, nibh felis porta quam, vitae interdum dui velit et augue. Nulla quis sagittis arcu, at facilisis risus. In hac habitasse platea dictumst. Donec sed dapibus turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam euismod sem et est elementum, sodales placerat elit semper. Suspendisse maximus condimentum nunc ac congue. Ut vehicula urna aliquet volutpat ultricies. Morbi eget risus hendrerit, tincidunt orci eu, ultrices arcu. Aenean bibendum nunc cursus mattis vulputate. Quisque sit amet ullamcorper est.",
      image: "https://via.placeholder.com/150x150",
      price: 50
    },
    {
      title: "Masaż nienormalny",
      duration: 60,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu turpis non lorem sollicitudin varius. Curabitur bibendum, erat et imperdiet tempus, nibh felis porta quam, vitae interdum dui velit et augue. Nulla quis sagittis arcu, at facilisis risus. In hac habitasse platea dictumst. Donec sed dapibus turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam euismod sem et est elementum, sodales placerat elit semper. Suspendisse maximus condimentum nunc ac congue. Ut vehicula urna aliquet volutpat ultricies. Morbi eget risus hendrerit, tincidunt orci eu, ultrices arcu. Aenean bibendum nunc cursus mattis vulputate. Quisque sit amet ullamcorper est.",
      image: "https://via.placeholder.com/150x150",
      price: 100
    },
    {
      title: "Masowanko",
      duration: 42,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu turpis non lorem sollicitudin varius. Curabitur bibendum, erat et imperdiet tempus, nibh felis porta quam, vitae interdum dui velit et augue. Nulla quis sagittis arcu, at facilisis risus. In hac habitasse platea dictumst. Donec sed dapibus turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam euismod sem et est elementum, sodales placerat elit semper. Suspendisse maximus condimentum nunc ac congue. Ut vehicula urna aliquet volutpat ultricies. Morbi eget risus hendrerit, tincidunt orci eu, ultrices arcu. Aenean bibendum nunc cursus mattis vulputate. Quisque sit amet ullamcorper est.",
      image: "https://via.placeholder.com/150x150",
      price: 69
    }
  ]

  reservations = [ 
    {
      service: "idk",
      date: "Piątek 31 Lipca 2020",
      hour: "9:00"
    }
]

  items = ["7:30", "9:00", "12:30", "13:00", "14:00", "15:00", "16:00", "16:30", "17:00", "18:00"]


  @ViewChild('serviceStep') sStep: MatStep;
  @ViewChild('stepper') stepper: MatStepper;

  pickedDate = null
  hour = null
  service = null
  email = new FormControl('', [Validators.required, Validators.email]);
  
  constructor(private utils: UtilsService) { 
    this.pickedDate = this.nextValidDate(new Date())
  }

  ngOnInit(): void {
  }

  isActive(hour) {
    return !this.reservations.some(res => res.hour == hour && res.date == this.parseDate)
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
    return !(this.dateFilter(this.pickedDate.value) && this.hour && this.service && !this.email.invalid)
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Należy podać prawidłową wartość'
    }

    return this.email.hasError('email') ? 'Błędny adres email' : ''
  }

}
