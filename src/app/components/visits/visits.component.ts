import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FetchServiceService } from '../../services/fetch-service.service';
import { ReservationsService } from '../../services/reservations.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  reservations = null
  displayedColumns: string[] = ['name', 'date', 'begin', 'finish', 'status'];
  beingLoaded = true

  constructor(private reservation: ReservationsService,
    private fetch: FetchServiceService) {
    this.reservation.getAllUserReservations().subscribe(async res => {
      let tmpTable = []
      for(const r of res) tmpTable.push( {
        name: (await this.fetch.getServiceById(r.service).toPromise()).title,
        date: r.date,
        begin: r.beginHour,
        finish: r.finishHour,
        status: r.status
      }
    )
    console.log(tmpTable)
    this.reservations = new MatTableDataSource(tmpTable)
    this.beingLoaded = false
  }
  )}

  ngOnInit(): void {
  }

}
