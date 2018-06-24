import { Component, OnInit } from '@angular/core';
import { Projeto } from '../model/projeto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from '../../utils/generic-form-validator';
import { ProjetoService } from '../service/projeto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { MensagemFactory } from '../../utils/mensagem-factory';

@Component({
  selector: 'app-projeto-editar',
  templateUrl: './projeto-editar.component.html',
  styleUrls: ['./projeto-editar.component.css']
})
export class ProjetoEditarComponent implements OnInit {

  public projeto: Projeto;
  public projetoForm: FormGroup;
  public errors: any[] = [];
  public user;
  public sub: Subscription;
  public projetoId: string = "";

  displayMessage: { [key: string]: string } = {}
  validationMessage: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private projetoService: ProjetoService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.user = this.projetoService.obterUsuario();
    this.projeto = new Projeto();
  }

  ngOnInit() {
    this.projetoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
      descCurta: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      conteudo: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.sub = this.route.params.subscribe(
      params => {
        this.projetoId = params['id'];
        this.obterProjeto(this.projetoId);
      }
    );
  }

  obterProjeto(id: string) {
    this.projetoService.obterProjeto(id)
      .subscribe(
        projeto => this.preencherFormProjeto(projeto),
        response => {
          if (response.status == 404) {
            this.router.navigate(['Não encontrado :('])
          }
        }
      );
  }

  preencherFormProjeto(projeto: Projeto): void {
    this.projeto = projeto;

    this.projetoForm.patchValue({
      titulo: this.projeto.titulo,
      descCurta: this.projeto.descCurta,
      conteudo: this.projeto.conteudo
    });
  }

  editarProjeto() {
    this.displayMessage = this.genericValidator.processMessages(this.projetoForm);

    if (this.projetoForm.dirty && this.projetoForm.valid) {

      let p = Object.assign({}, this.projeto, this.projetoForm.value);
      let user = this.user;

      p.usuarioId = user.id;

      this.projetoService.atualizarProjeto(p)
        .subscribe(
          result => { this.onSave(result) },
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
    this.mensagem.success("Projeto","Projeto alterado com sucesso!");
    this.router.navigate(['/projetos/' + this.user.id]);
    this.projetoForm.reset();
  }

  onError(error) {
    alert(error);
  }

}
