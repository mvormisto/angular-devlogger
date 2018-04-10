import { Component, OnInit } from '@angular/core';

import { Log } from '../../models/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs: Log[];

  constructor() { }

  ngOnInit() {
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
}
