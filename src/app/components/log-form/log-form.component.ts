import { Component, OnInit } from '@angular/core';

import { LogService } from '../../services/log.service';

import { Log } from '../../models/log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit {
  id: string;
  title: string;
  description: string;
  date: any;

  constructor(private logService: LogService) { }

  ngOnInit() {
    // Subscribing to selectedLog observable
    this.logService.selectedLog.subscribe(log => {
      if (log.id !== null) {
        this.id = log.id;
        this.title = log.title;
        this.description = log.description;
        this.date = log.date;
      }
    });
  }

}
