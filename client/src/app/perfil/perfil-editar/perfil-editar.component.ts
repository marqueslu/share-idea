import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Perfil } from '../model/perfil';
import { Subscription } from 'rxjs/Subscription';
import { GenericValidator } from '../../utils/generic-form-validator';
import { PerfilService } from '../service/perfil.service';
import { Router, ActivatedRoute } from '@angular/router';


import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { MensagemFactory } from '../../utils/mensagem-factory';


firebase.initializeApp({
  apiKey: 'AIzaSyC0DX76cg2gZHQVlZbiHFnHEfEoEzq80Nw',
  authDomain: 'redesocialtcc-46645.firebaseapp.com',
  databaseURL: 'https://redesocialtcc-46645.firebaseio.com',
  storageBucket: 'gs://redesocialtcc-46645.appspot.com',
  messagingSenderId: '778208277600'
});


@Component({
  selector: 'app-perfil-editar',
  templateUrl: './perfil-editar.component.html',
  styleUrls: ['./perfil-editar.component.css']
})

export class PerfilEditarComponent implements OnInit {

  public errors: any[] = [];
  editarForm: FormGroup;
  perfil: Perfil;
  perfilId: string = "";
  public sub: Subscription;

  displayMessage: { [key: string]: string } = {}
  validationMessage: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private perfilService: PerfilService,
    private route: ActivatedRoute,
    private router: Router,
    private mensagem: MensagemFactory) {
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
        minLenght: 'O Username precisa ter no minimo 5 caracteres',
        maxLenght: 'O Username precisa ter no máximo 30 caracteres'
      },
      sobre: {
        minLenght: 'O sobre precisa ter no minimo 1 caracteres',
        maxLenght: 'O sobre precisa ter no máximo 300 caracteres'
      },
      profissao: {

      },
      genero: {

      }


    };

    this.genericValidator = new GenericValidator(this.validationMessage);
    this.perfil = new Perfil();

  }

  ngOnInit() {
    this.editarForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      sobrenome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dataNascimento: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      sobre: ['', [Validators.minLength(1), Validators.maxLength(300)]],
      profissao: ['', []],
      genero: ['', []],
      foto: ['', []]
    });

    this.sub = this.route.params.subscribe(
      params => {
        this.perfilId = params['id'];
        this.obterPerfil(this.perfilId);
      }
    );
  }

  obterPerfil(id: string) {
    this.perfilService.obterPerfil(id)
      .subscribe(
        perfil => this.preencherFormPerfil(perfil),
        response => {
          if (response.status == 404) {
            this.router.navigate(['Não encontrado :('])
          }
        }
      );
  }

  preencherFormPerfil(perfil: Perfil): void {

    this.perfil = perfil;

    this.editarForm.patchValue({
      id: this.perfilId,
      nome: this.perfil.nome,
      sobrenome: this.perfil.sobrenome,
      username: this.perfil.username,
      email: this.perfil.email,
      dataNascimento: this.perfil.dataNascimento,
      sobre: this.perfil.sobre,
      profissao: this.perfil.profissao,
      genero: this.perfil.genero,
      foto: this.perfil.foto
    });
  }

  atualizarPerfil() {

    this.displayMessage = this.genericValidator.processMessages(this.editarForm);

    if (this.editarForm.valid) {

      let u = Object.assign({}, this.perfil, this.editarForm.value);

      this.perfilService.editarPerfil(u)
        .subscribe(
          result => { this.onSave() },
          error => {
            this.errors = JSON.parse(error._body).errors;
          });
    }
  }

  uploadFoto(event: any) {
    const file: File = event.target.files[0];
    const metaData = { 'contentType': file.type };
    const storeageRef: firebase.storage.Reference = firebase.storage().ref().child('/perfil/' + this.perfilId);
    storeageRef.put(file, metaData);
  }

  onSave() {
    this.mensagem.success("Perfil", "Perfil alterado com sucesso");
    this.router.navigate(['/perfil/' + this.perfilId]);
  }

  onError(error) {
    this.errors = JSON.parse(error._body).erros;
    alert(this.errors);
  }
}
