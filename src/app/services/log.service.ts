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

  constructor() {
    this.logs = [
      {
        id: '1',
        title: 'Generated components',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, dolor?',
        date: new Date ('12/26/2017 12:54:23')
      },
      {
        id: '2',
        title: 'Generated UI',
        // tslint:disable-next-line:max-line-length
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, ut? Animi modi dolore amet aspernatur quas, labore quibusdam ab fuga.',
        date: new Date ('12/27/2017 12:54:23')
      },
      {
        id: '3',
        title: 'Added logs component',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        date: new Date ('12/28/2017 12:54:23')
      }
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
  }

  deleteLog(log: Log) {
    this.logs.forEach((x, index) => {
      // When the log gets updated, the old one is spliced from the array
      if (log.id === x.id) {
        this.logs.splice(index, 1);
      }
    });
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
    // And the new one gets put first in the array.
    this.logs.unshift(log);
  }
}
