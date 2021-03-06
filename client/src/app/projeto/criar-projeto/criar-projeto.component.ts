import { Component, OnInit } from '@angular/core';
import { Projeto } from '../model/projeto';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from '../../utils/generic-form-validator';
import { ProjetoService } from '../service/projeto.service';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { MensagemFactory } from '../../utils/mensagem-factory';

@Component({
  selector: 'app-criar-projeto',
  templateUrl: './criar-projeto.component.html',
  styleUrls: ['./criar-projeto.component.css']
})

export class CriarProjetoComponent implements OnInit {

  public projeto: Projeto;
  public projetoForm: FormGroup;
  public errors: any[] = [];
  public user;

  displayMessage: { [key: string]: string } = {}
  validationMessage: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private projetoService: ProjetoService,
    private router: Router,
    private mensagem: MensagemFactory) {

    this.validationMessage = {
      titulo: {
        required: 'O Titulo é requerido.',
        minLenght: 'O Titulo precisa ter no minimo 1 caracteres',
        maxLenght: 'O Titulo precisa ter no máximo 300 caracteres'
      },

      descCurta: {
        required: 'A Descrição Curta é requerida.',
        minLenght: 'A Descrição Curta precisa ter no minimo 1 caracteres',
        maxLenght: 'A Descrição Curta precisa ter no máximo 500 caracteres'
      },

      conteudo: {
        required: 'O Conteudo é requerido.',
        minLenght: 'O Conteudo  precisa ter no minimo 1 caracteres'
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessage);
    this.user = projetoService.obterUsuario();
  }

  ngOnInit() {
    this.projetoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
      descCurta: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      conteudo: ['', [Validators.required, Validators.minLength(1)]],
      fotoProjeto:[]
    });
  }


  criarProjeto(){
    this.displayMessage = this.genericValidator.processMessages(this.projetoForm);

    if (this.projetoForm.dirty && this.projetoForm.valid) {

      let p = Object.assign({}, this.projeto, this.projetoForm.value);
      
      let user = this.user;

      p.usuarioId = user.id;
      
      this.projetoService.criarProjeto(p)
        .subscribe(
        result => { this.onSave(result)},
        error => { this.onError(error) }
        );
    }
  }

  
   uploadFoto(event: any) {
     const file: File = event.target.files[0];
     const metaData = { 'contentType': file.type };
    const storeageRef: firebase.storage.Reference = firebase.storage().ref().child('/projetos/' + this.projeto.id);
    storeageRef.put(file, metaData);
   }


  onSave(response) {
    this.mensagem.success("Projeto", "Projeto criado com sucesso!");
    this.router.navigate(['/projetos/'+this.user.id]);
    this.projetoForm.reset();
  }
  

  onError(error) {
    alert(error);
  }

}
