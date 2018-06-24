import { Component, OnInit } from '@angular/core';
import { Perfil } from '../perfil/model/perfil';
import { SolicitacaoService } from './service/solicitacao.service';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { Solicitacao } from './model/solicitacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {

  public solicitacoes: Solicitacao[];
  public errorMessage: string;
  public errors: any[] = [];
  public solicitacaoForm: FormGroup;
  public status: string = "";
  public user;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private fb: FormBuilder,
    private router: Router) {
    this.user = solicitacaoService.obterUsuario();
  }

  ngOnInit() {
    this.solicitacaoService.obterSolicitacoes(this.user.id)
      .subscribe(solicitacoes => this.solicitacoes = solicitacoes),
      result => { this.onSave(result) },
      error => { this.onError(error) };
  }

  responderSolicitacaoAmizade() {

  }

  onSave(response) {
    this.errors = [];
    this.router.navigate(["\feed"]);
  }
  onError(error) {
    this.errors = JSON.parse(error._body).erros;
  }

}
