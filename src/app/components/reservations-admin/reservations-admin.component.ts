import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/services/reservations.service';
import { FetchServiceService } from 'src/app/services/fetch-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { status } from '../../constants'
import { SelectionModel } from '@angular/cdk/collections';

interface reservation {
  _id: string,
  name: string,
  email: string,
  date:string,
  begin: string,
  finish: string,
  status: string
}

@Component({
  selector: 'app-reservations-admin',
  templateUrl: './reservations-admin.component.html',
  styleUrls: ['./reservations-admin.component.css']
})
export class ReservationsAdminComponent implements OnInit {

  reservations = []
  displayedColumns: string[] = ['name', 'email', 'date', 'begin', 'finish'];
  beingLoaded = true
  selectedRows: Set<reservation> = new Set()
  hours = null
  constants = null

  constructor(private reservation: ReservationsService,
    private fetch: FetchServiceService) {

      this.loadCurrentState()

  this.fetch.getConstants().subscribe(res => {
    this.constants = res
    this.hours = this.constants.STANDARD_HOURS
  })
}

  select(row){
    if(this.selectedRows.has(row)){
      this.selectedRows.delete(row)
    }
    else this.selectedRows.add(row)
  }

  async deleteRes(){
    const errs = []
    for (let item of this.selectedRows) {
      const res = await this.reservation.deleteReservation(item._id).toPromise()
      if(!res.success)
        errs.push(res.message)
    }
    this.selectedRows.clear()
    if(errs.length > 0) alert(errs)
    this.loadCurrentState()
  }

  async cancelRes(){
    const errs = []
    for (let item of this.selectedRows) {
      const res = await this.reservation.cancelReservation(item._id, status.cancelled).toPromise()
      if(!res.success)
        errs.push(res.message)
    }
    this.selectedRows.clear()
    if(errs.length > 0) alert(errs)
    this.loadCurrentState()
  }

  loadCurrentState(){
    this.reservations = []
    this.beingLoaded = true
    this.reservation.getAllReservations().subscribe(async res => {
      let tmpTable: Array<reservation> = []
      for(const r of res) tmpTable.push( {
        _id: r._id,
        name: (await this.fetch.getServiceById(r.service).toPromise()).title,
        email: r.email,
        date: r.date,
        begin: r.beginHour,
        finish: r.finishHour,
        status: r.status
      }
    )
    this.reservations.push(tmpTable.filter(e => e.status == status.confirmed))
    this.reservations.push(tmpTable.filter(e => e.status == status.awaiting))
    this.reservations.push(tmpTable.filter(e => e.status == status.closed))
    this.reservations.push(tmpTable.filter(e => e.status == status.cancelled))

    console.log(this.reservations)

    this.beingLoaded = false
  })
  }

  ngOnInit(): void {
  }

}
