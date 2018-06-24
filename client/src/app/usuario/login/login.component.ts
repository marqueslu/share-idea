import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericBrowserDomAdapter } from '@angular/platform-browser/src/browser/generic_browser_adapter';
import { GenericValidator } from '../../utils/generic-form-validator';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { Router } from '@angular/router';
import { PerfilService } from '../../perfil/service/perfil.service';
import { Perfil } from '../../perfil/model/perfil';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public errors: any[] = [];
  public loginForm: FormGroup;
  public usuario: Usuario;
  public usuarioNovo: Perfil;

  displayMessage: { [key: string]: string } = {}
  validationMessage: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private perfilService: PerfilService) {

    this.validationMessage = {
      email: {
        required: 'O E-MAIL é requerido.',
      },
      senha: {
        required: 'Informe a Senha.'
      }

    };
    this.genericValidator = new GenericValidator(this.validationMessage);
    this.usuario = this.usuarioService.obterUsuario();
    this.usuarioNovo = new Perfil();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });

  }

  login() {
    this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    if (this.loginForm.dirty && this.loginForm.valid) {
      let u = Object.assign({}, this.usuario, this.loginForm.value);

      this.usuarioService.login(u)
        .subscribe(
          result => { this.onSave(result) },
          error => { this.onError(error) }
        );
    }
  }

  onSave(response) {

    this.loginForm.reset();
    this.errors = [];

    localStorage.setItem('rsc.token', response.result.access_token);
    localStorage.setItem('rsc.user', JSON.stringify(response.result.user));

    // this.perfilService.obterPerfil(this.usuario.id)
    //   .subscribe(usuarioNovo => this.usuarioNovo = usuarioNovo),
    //   result => { this.onSave(result) },
    //   error => { this.onError(error) };


    // if (this.usuarioNovo.ativo === false) {
    //   this.router.navigate(['/perfil-editar/' + this.usuario.id]);
    // } else {
      this.router.navigate(['/feed']);
    // }
  }
  onError(error) {
    this.errors = JSON.parse(error._body).erros;
  }
} 
