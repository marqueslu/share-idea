import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericBrowserDomAdapter } from '@angular/platform-browser/src/browser/generic_browser_adapter';
import { GenericValidator } from '../../utils/generic-form-validator';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
// import {MatIconModule} from '@angular/material';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

  public errors: any[] = [];
  public cadastroForm: FormGroup;
  public usuario: Usuario;
  public displayMessage: { [key: string]: string } = {}
  public validationMessage: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) {

    this.validationMessage = {
      nome: {
        required: 'O Nome é requerido.',
        minLenght: 'O Nome precisa ter no minimo 2 caracteres',
        maxLenght: 'O Nome precisa ter no máximo 20 caracteres'
      },

      sobrenome: {
        required: 'O Sobrenome é requerido.',
        minLenght: 'O Sobrenome precisa ter no minimo 2 caracteres',
        maxLenght: 'O Sobrenome precisa ter no máximo 50 caracteres'
      },

      username: {
        required: 'O Username é requerido.',
        minLenght: 'O Username precisa ter no minimo 5 caracteres',
        maxLenght: 'O Username precisa ter no máximo 30 caracteres'
      },

      email: {
        required: 'O E-MAIL é requerido.',
        minLenght: 'E-MAIL invalido'
      },

      senha: {
        required: 'Informe a Senha.',
        minLenght: 'A senha precisa ter no minimo 6 caracteres'
      },

      senhaConfirmacao: {
        required: 'Confirme a Senha.',
        minLenght: 'A senha precisa ter no minimo 6 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessage);
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      sobrenome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      senhaConfirmacao: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  adicionarUsuario() {
    this.displayMessage = this.genericValidator.processMessages(this.cadastroForm);
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      let u = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.usuarioService.cadastrarUsuario(u)
        .subscribe(
          result => { this.onSave(result) },
          error => { this.onError(error) }
        );
    }
  }

  onSave(response) {
    this.cadastroForm.reset();
    this.errors = [];

    this.router.navigate(['/login']);
  }
  onError(error) {
    this.errors = JSON.parse(error._body).erros;
  }
}
