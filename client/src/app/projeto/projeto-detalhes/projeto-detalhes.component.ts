import { Component, OnInit } from '@angular/core';
import { Projeto } from '../model/projeto';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetoService } from '../service/projeto.service';
import { PerfilService } from '../../perfil/service/perfil.service';
import { Perfil } from '../../perfil/model/perfil';

@Component({
  selector: 'app-projeto-detalhes',
  templateUrl: './projeto-detalhes.component.html',
  styleUrls: ['./projeto-detalhes.component.css']
})
export class ProjetoDetalhesComponent implements OnInit {

  public errors: any[] = [];
  public projeto: Projeto;
  public user;
  public projetoId: string = "";
  public sub: Subscription;
  public perfil: Perfil;

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private route: ActivatedRoute,
    private perfilService : PerfilService) {
    this.user = this.projetoService.obterUsuario();
    this.projeto = new Projeto();
    this.perfil = new Perfil();

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.projetoId = params['id'];
        this.obterProjeto(this.projetoId);
        this.obterPerfil(this.projeto.usuarioId);
      }
    );
    
  }

  obterProjeto(id: string) {
    this.projetoService.obterProjeto(id)
      .subscribe(projeto => this.projeto = projeto),
      result => { this.onSave(result) },
      error => { this.onError(error) };
  }

  obterPerfil(id: string) {
    this.perfilService.obterPerfil(id)
      .subscribe(perfil => this.perfil = perfil),
      result => { this.onSave(result) },
      error => { this.onError(error) };
  }

  onSave(response) {
    this.errors = [];
  }
  onError(error) {
    this.errors = JSON.parse(error._body).erros;
  }
}
