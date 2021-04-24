import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from '@app/models/Evento';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class EventoService {
  baseURL = 'https://localhost:44318/api/Eventos';
  constructor(private http: HttpClient) {}

  public getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL)
    .pipe(take(1));
  }
  public getElementosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`)
    .pipe(take(1));
  }
  public getElementoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`)
    .pipe(take(1));
  }

  public post(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseURL, evento)
    .pipe(take(1));
  }

  public put(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento)
    .pipe(take(1));
  }

  public deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`)
    .pipe(take(1));
  }

}
