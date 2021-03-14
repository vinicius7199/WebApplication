import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public eventos: any = [];
  public eventosFiltrados: any = [];
  exibirImagem = true;

  private _filtroLista: string = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  // tslint:disable-next-line: typedef
  alterarImagem(){
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    // tslint:disable-next-line: deprecation
    this.http.get(`https://localhost:44318/api/Eventos`).subscribe(
      response => {
        this.eventos = response,
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
  }
}