import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  loading: boolean;

  data: Todo;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.loading = true;
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    this.subscription = this.httpClient.get(url).subscribe(
      (data: Todo) => {
        this.loading = false;
        this.data = data;
      },
      (error) => {
        this.loading = false;
        console.log('error loading data.');
      },
      () => {
        console.log('data stream completed.');
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
