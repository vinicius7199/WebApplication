import { ValidatorField } from './../../../helpers/ValidatorField';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  submited: boolean = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmeSenha')
    };

    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['',
        [Validators.required, Validators.email]
      ],
      telefone: ['', Validators.required],
      descricao: ['', Validators.required],
      senha: ['',
        [Validators.nullValidator, Validators.minLength(6)]
      ],
      confirmeSenha: ['', Validators.nullValidator],
    }, formOptions);
  }

  onSubmit() {
    this.submited = true
    if(this.form.invalid) {
      return;
    }
  }
  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }
}
