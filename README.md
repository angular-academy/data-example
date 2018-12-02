# Dataclient

Inhalt: wie gehen wir mit Daten um, die wir erst in der Zukunft erhalten. Welche Sprachkonstrukte und Patterns haben wir dafür?

## Der Plan

* Callbacks
* Promises
* Observables

## Inhalt

WIr präsentieren in der heutigen Woche drei verschiedene Möglichkeiten, Dateien in Javascript Anwendungen zu laden. Im Anschluss werden wir bevorzugt auf RxJS eingehen.

### Callbacks

In HTML / Javascript kann man über das [EventTarget](https://developer.mozilla.org/de/docs/Web/API/EventTarget) - Interface Callbacks registieren. HGierdurch kann man den Lebenszyklus und Änderungen von Objekten abfangen.

Hierzu haben wir zwei Möglichkeiten:
* EventHandler über [addEventListener](https://developer.mozilla.org/de/docs/Web/API/EventTarget/addEventListener) registieren. Hierbei können wir mehrere Handler registrieren
* EventHandler über inline über Properties binden (zb. *button.onclick = ...*). Hier überschriebt der zuletzt zugewiesene Handler den vorherigen.

TIP: pre *addEventListener* hinzugefügt Hanlder lassen sich mit [removeEventListener](https://developer.mozilla.org/de/docs/Web/API/EventTarget/removeEventListener) entfernen


Wir wollen Callbacks am Beispiel des [XMLHttpRequest](https://developer.mozilla.org/de/docs/Web/API/XMLHttpRequest) Objektes kennenlernen. Über dieses Objekt können wir Dateien asynchron laden. Das Ergebnis ist dann entweder ein Text, ein JSON oder ein Blob.

Wir erzeugen ein XMLHttpRequest Objekt:
```typescript
this.xmlHttpRequest = new XMLHttpRequest();
```

Und setzen Eventhandler für interessante Ereignisse. Ein erfolgreiches Ergebnis kriegen wir im *load* Event:
```typescript
this.xmlHttpRequest.onload = (event) => {
    console.log('LOAD EVENT', event);
    this.data = JSON.parsw(this.xmlHttpRequest.responseText);
};
```

Mittels *open* initialisieren wir einen Request
```typescript
this.xmlHttpRequest.open(method, url);
```

Und mittels *send* starten wir ihn
```typescript
this.xmlHttpRequest.send();
```

### Promises

Ein [Promise](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise) repräsentiert ein Objekt, dessen Wert bei Erstellung nicht bekannt sein muss. Mitte4ls Promises können wir Ergebnisse für asynchrone

* *pending*: weder fullfiled noch rejected
* *fullfiled*: Operation erfolgreich
* rejected: Operation

Promises sind seit ECMA-Script 6 Bestandteil der Sprache.

#### Daten laden
Die [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) stellt die Funktion *fetch* bereit, mittels der wir Daten laden können. Wir können zwei Callbacks (für *resolve* und *reject*) auf die *then* Methode des Promises registieren:

```typescript
this.promise = fetch(url);

this.promise.then( x => x.json(), error => console.log('error loading data (1)', error ))
      .then(y => console.log('simple: ', y), error => console.log('error loading data (2)', error ) )
      .catch( console.error );
    this.promise.catch( console.error );
```

Der Rückgabewert ist ein Promise vom Type *Response*. Die *json()* Methode liefert uns ein Promise, das bei Erfolg die fertigen JSON Daten enthält.

#### Promises erstellen

* todo

### Observables

Link: RxJS: http://reactivex.io/rxjs/manual/overview.html

Ein [Observable](http://reactivex.io/rxjs/manual/overview.html#observable) ist eine Verallgemeinerung eines Promises. Anstatt eines zukünftigen Wertes repräsentiert es eine Menge zukünftiger Werte.

Ein Observable beobachtet man mittels *subscribe* . Es können drei Callbacks übergeben werden:
* *next* für den nächsten Wert
* *error* im Fehlerfall. Das Observable ist dann geschlossen.
* *completed* für das Ende (es folgen keine zukünftigen Werte).

#### Daten laden
In Angular liefert der [HttpClient](https://angular.io/api/common/http/HttpClient) ein Observable für das Ergebnis einer Operation. Hierzu fügen wir im App-Module das [HttpClientModule](https://angular.io/api/common/http/HttpClientModule) hinzu:

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    // ...
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    // ...
})
```

und in einer Komponente den Client selber

```typescript
constructor(private httpClient: HttpClient) { }
```

wir können einen Request über die *get* Methode vorbereiten. Der HttpClient wrappt ein XMLHttpRequest Objekt, die Anfrage startet mit einem *subscribe*

```typescript
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
```

TIP: subscribe liefert als Ergebnis eine [Subscription](http://reactivex.io/rxjs/manual/overview.html#subscription) . Es gehört zum guten Programmierstil, jedes Subscribe in einer Subscription zu speichern und im Zuge des Komponenten-Lifecycles mit *unsubscribe* das Interesse an einem Observable zu beenden:

```typescript
ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
}
```

#### Observables erstellen

* todo
