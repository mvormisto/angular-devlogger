import { Component, OnInit } from '@angular/core';

import { LogService } from '../../services/log.service';

import { Log } from '../../models/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.stateClear.subscribe(clear => {
      if (clear) {
        // If clear is true
        this.selectedLog = {id: '', title: '', description: '', date: ''};
      }
    });

    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    // Set the selectedLog equal to the log-object the user just clicked
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    // Confirm is an alert
    if (confirm('Are you sure you want to delete this item?') ){
      this.logService.deleteLog(log);
    }
  }
}
