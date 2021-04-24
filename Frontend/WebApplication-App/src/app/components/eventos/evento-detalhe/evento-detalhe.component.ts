import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  evento = {} as Evento;
  form: FormGroup;
  isLoading: boolean = false;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get bsconfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD-MM-YYYY hh:mm',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }
  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.estadoSalvar = 'put';
      this.spinner.show();
      this.eventoService.getElementoById(+eventoIdParam).subscribe({
        next: (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
        },
        error: (error: any) => {
          console.log(error);
          this.spinner.hide();
          this.toastr.error('Erro ao carregar o Evento.', 'Erro!');
        },
        complete: () => this.spinner.hide(),
      });
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public SalvarAlteracao(): void {
    this.isLoading = true;
    if (this.form.valid) {
      this.estadoSalvar === 'post'
        ? (this.evento = { ...this.form.value })
        : (this.evento = { id: this.evento.id, ...this.form.value });

      this.eventoService[this.estadoSalvar](this.evento).subscribe({
        next: (result: any) => {
          this.toastr.success('Evento salvo com sucesso!', 'Sucesso!');
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao salvar o evento!', 'Erro!');
        }
      }).add(() => (this.isLoading = false));
    }
  }
}
