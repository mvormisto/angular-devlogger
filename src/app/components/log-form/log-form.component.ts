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
  hideDescription: boolean = true;

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

  // When the form is submitted, onSubmit runs
  onSubmit() {
    // First we check if the onSubmit function is trying to add a NEW log
    if (this.isNew) {
      // When the log.isNew is true, add the log to the array
      // Creating a constnt from the new log info
      const newLog = {
        id: this.generateId(),
        title: this.title,
        description: this.description,
        date: new Date(), // This adds the current date
      };
      // Sends the constant to logService, and asks for addLog method inside the service
      this.logService.addLog(newLog);
    } else {
      // Create log to be updated
      const updLog = {
        id: this.id,
        title: this.title,
        description: null,
        date: new Date(),
      };

      // Call the update service, and update the log
      this.logService.updateLog(updLog);

    }

    // When you submit the form, call clearState function
    this.clearState();

  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  clearState() {
    this.title = null;
    this.isNew = true;
    this.description = null;
    this.id = null;
    this.logService.clearState();
  }

  toggleDescriptionVisibility() {
    this.hideDescription = !this.hideDescription;
  }
}
