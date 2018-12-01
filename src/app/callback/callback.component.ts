import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit, OnDestroy {

  loading: boolean;
  error: boolean;
  data: null;

  xmlHttpRequest: XMLHttpRequest;

  readyStates: string[];

  constructor() {
    this.loading = false;
    this.error = false;
    this.readyStates = [
      'UNSENT',
      'OPENED',
      'HEADERS_RECEIVED',
      'LOADING',
      'DONE'
    ];
  }

  ngOnInit() {
    console.log('INIT CALLBACK');
    const method = 'GET';
    const url = 'https://jsonplaceholder.typicode.com/todos/2';
    this.loading = true;
    this.xmlHttpRequest = new XMLHttpRequest();
    this.xmlHttpRequest.onabort = (event) => {
      console.log('ABORT EVENT', event);
    };
    this.xmlHttpRequest.onerror = (event) => {
      console.log('ERROR EVENT', event);
    };
    this.xmlHttpRequest.onload = (event) => {
      console.log('LOAD EVENT', event);
      this.loading = false;
      this.data = JSON.parse(this.xmlHttpRequest.responseText);
    };
    this.xmlHttpRequest.onloadend = (event) => {
      console.log('LOADEND EVENT', event);
    };
    this.xmlHttpRequest.onreadystatechange = (event) => {
      console.log('READYSTATECHANGE EVENT', event);
      console.log(this.readyStates[ this.xmlHttpRequest.readyState ]);
    };
    this.xmlHttpRequest.open(method, url);
    this.xmlHttpRequest.send();
  }

  ngOnDestroy() {
    if (this.xmlHttpRequest) {
      this.xmlHttpRequest.abort();
    }
  }

}
