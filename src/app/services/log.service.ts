import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Log } from '../models/log';

@Injectable()
export class LogService {

  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, title: null, description: null, date: null});

  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);

  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    // Check if there is anything inside local storage
    if (localStorage.getItem('logs') === null) {
      // If nothing in local storage, just make an empty array
      this.logs = [];
    } else {
      // Because the data is stored as JSON strings, we need to convert it back
      // JSON.parse is the opposit of JSON.stringify
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    // Sort the logs by the date
    return of(this.logs.sort((a, b) => {
      return b.date - a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // Add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
    // Stringify converts the value ('this.logs' object array) to a JSON string
  }

  updateLog(log: Log) {
    // Loop through the logs-array
    // x is each individual log in the logs array
    this.logs.forEach((x, index) => {
      // When the log gets updated, the old one is spliced from the array
      if (log.id === x.id) {
        this.logs.splice(index, 1);
      }
    });
    // And the new one gets put first in the array
    this.logs.unshift(log);

    // Update the local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((x, index) => {
      // When the log gets updated, the old one is spliced from the array
      if (log.id === x.id) {
        this.logs.splice(index, 1);
      }
    });

    // Delete from the local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
