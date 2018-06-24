import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../perfil/service/perfil.service';
import { Subscription } from 'rxjs/Subscription';
import { Perfil } from '../perfil/model/perfil';
import { ProjetoService } from './service/projeto.service';
import { Projeto } from './model/projeto';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})

export class ProjetoComponent implements OnInit {

  public errors: any[] = [];
  public perfil: Perfil;
  public projetos: Projeto[];
  public user;
  public perfilId: string = "";
  public sub: Subscription;

  constructor(
    private perfilService: PerfilService,
    private projetoService: ProjetoService,
    private router: Router,
    private route: ActivatedRoute) {
    this.user = projetoService.obterUsuario();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.perfilId = params['id'];
        if(params['id'] == null){
          this.perfilId = this.user.id;
          this.obterProjetos(this.perfilId);
        }
        else{
        this.obterProjetos(this.perfilId);
      }
    }
    );
  }

  obterProjetos(id: string) {
    this.projetoService.obterProjetos(id)
      .subscribe(projetos => this.projetos = projetos),
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
