import { Injectable } from '@angular/core';
// import {ITEMS} from './mock-items';
import {Item} from './item';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {tick} from '@angular/core/testing';

declare var WebSocket: any;

const serverUrl = '192.168.1.162:3000';
const httpServerUrl = `http://${serverUrl}`;
const itemUrl = `${httpServerUrl}/api/item`;

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemSubject: BehaviorSubject<Item[]>;
  private itemUpdated: BehaviorSubject<Item>;
  constructor(private http: HttpClient) {
    console.log('service');
    this.itemSubject = new BehaviorSubject(null);
    this.itemUpdated = new BehaviorSubject(null);
    const ws: any = new WebSocket(`ws://${serverUrl}`);
    ws.onopen = () => {
      const token = localStorage.getItem('token');
      ws.send(JSON.stringify({token}));
    };
    ws.onmessage = eventRecv => {
      console.log(eventRecv.data);
      const {event, payload} = JSON.parse(eventRecv.data);

      console.log(payload);
      switch (event) {
        case 'created': {
          const items = this.itemSubject.getValue() || [];
          items.push(payload);
          this.itemSubject.next(items);
          break;
        }
        case 'deleted': {
          const items = this.itemSubject.getValue() || [];
          for (let i = items.length - 1; i >= 0; i--) {
            if (items[i]._id === payload._id) {
              items.splice(i, 1);
            }
          }
          this.itemSubject.next(items);
          break;
        }
        case 'updated': {
          console.log('get value: ', this.itemSubject.getValue());
          const items = this.itemSubject.getValue() || [];
          for (let i = 0; i < items.length; i++) {
            if (items[i]._id === payload._id) {
              this.itemUpdated.next(payload);
              Object.assign(items[i], payload);
            }
          }
          this.itemSubject.next(items);
          break;
        }
      }
      console.log(event);
    };
  }
  httpOptions() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }
  getItemUpdated() {
    return this.itemUpdated.asObservable();
  }
  save(item: Item) {
    return this.http.post<Item>(itemUrl, item, this.httpOptions());
  }
  update(item: Item) {
    return this.http.put(`${itemUrl}/${item._id}`, item, this.httpOptions());
  }
  delete(item: Item) {
    console.log('service ', item);
    return this.http.delete(`${itemUrl}/${item._id}`, this.httpOptions());
  }
  getAll(): Observable<Item[]> {
    return this.itemSubject.asObservable();
  }
  refresh(): Observable<Item[]> {
    return this.http.get<Item[]>(itemUrl, this.httpOptions())
      .pipe(tap(items => this.itemSubject.next(items)));
  }
  getById(id: string) {
    console.log(`${itemUrl}/${id}`);
    return this.http.get<Item>(`${itemUrl}/${id}`, this.httpOptions());
  }

  getPaginated(page: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${itemUrl}?page=${page}`, this.httpOptions());
  }
}
