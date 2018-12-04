import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {

  promise: Promise<Response>;

  futureNumber: Promise<number>;

  timerId: number;

  constructor() { }

  ngOnInit() {

    this.simplePromise();

    this.waitPromise();

    this.createNumber();
  }

  simplePromise() {
    console.log('== simple promise ==');
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    this.promise = fetch(url);

    this.promise.then( x => x.json(), error => console.log('error loading data (1)', error ))
      .then(y => console.log('simple: ', y), error => console.log('error loading data (2)', error ) )
      .catch( console.error );
    this.promise.catch( console.error );
  }

  async waitPromise() {
    console.log('== wait promise ==');
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    let response: Response;
    let data: Todo;

    try {
      response = await fetch(url);
      data = await response.json();
    } catch (exception) {
      console.log('wait: error loading data:', exception);
    }
  }

  createNumber() {
    if (this.timerId) {
      window.clearTimeout();
    }

    const result = new Promise<number>( (resolve, reject) => {
      this.timerId = window.setTimeout(() => {
        const randomNumber = Math.random();
        console.log('resolve promise', randomNumber);
        resolve( randomNumber );
      }, 2000);
    });

    this.futureNumber = result;
  }
}
