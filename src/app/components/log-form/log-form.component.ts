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

  isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    // Subscribing to selectedLog observable
    this.logService.selectedLog.subscribe(log => {
      if (log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.title = log.title;
        this.description = log.description;
        this.date = log.date;
      }
    });
  }

  onSubmit() {
    // Check if the onSubmit function is trying to add a NEW log, or update an existing one
    if (this.isNew) {
      // Creating a new log
      const newLog = {
        id: this.generateId(),
        title: this.title,
        date: new Date(),
      };
      // Adding the log
      this.logService.addLog(newLog);
    } else {
      // Create log to be updated
      const updLog = {
        id: this.id,
        title: this.title,
        description: null,
        date: new Date(),
      };

      this.logService.updateLog(updLog);
    }
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  clearForm() {
    this.title = null;
  }

}
