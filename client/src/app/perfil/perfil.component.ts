import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilService } from './service/perfil.service';
import { error } from 'util';
import { Perfil } from './model/perfil';
import { Subscription } from 'rxjs/Subscription';
import { empty } from 'rxjs/Observer';
import { PostagemCriarComponent } from '../postagem/postagem-criar/postagem-criar.component';
import { Postagem } from '../postagem/model/postagem';
import { PostagemService } from '../postagem/service/postagem.service';
import { MensagemFactory } from '../utils/mensagem-factory';
import { Seguidor } from '../seguidores/models/seguidor';
import { SeguidoresService } from '../seguidores/service/seguidores.service';
import { Projeto } from '../projeto/model/projeto';
import { ProjetoService } from '../projeto/service/projeto.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public errors: any[] = [];
  public perfil: Perfil;
  public user;
  public perfilId: string;
  public sub: Subscription;
  public seguidor: Seguidor;
  public seguidorExistente: Seguidor;
  public postagens: Postagem[];
  public projetos : Projeto[];
  public seguidores: Seguidor[];

  constructor(
    private perfilService: PerfilService,
    private projetoServie : ProjetoService,
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private seguidorService: SeguidoresService,
    private mensagem: MensagemFactory) {
    this.perfil = new Perfil();
    this.user = this.perfilService.obterUsuario();
    this.seguidor = new Seguidor();
    this.seguidorExistente = new Seguidor();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.perfilId = params['id'];
        if (params['id'] == null) {
          this.obterPerfil(this.user.id);
          this.obterProjetos(this.user.id);
          this.obterSeguidores(this.user.id);
          this.obterPostagens(this.user.id);
        } else {
          this.obterPerfil(this.perfilId);
          this.obterProjetos(this.perfilId);
          this.obterSeguidores(this.perfilId);
          this.obterPostagens(this.perfilId);
        }

        this.obterSeguidor(this.perfilId);
      }
    );
  }

  obterPerfil(id: string) {
    this.perfilService.obterPerfil(id)
      .subscribe(perfil => this.perfil = perfil),
      result => { this.onSave(result) },
      error => { this.onError(error) };
  }

  obterProjetos(id: string){
    this.projetoServie.obterProjetos(id)
      .subscribe(projetos => this.projetos = projetos),
      result => { this.onSave(result) },
      error => { this.onError(error) };
  }

  obterSeguidores(id: string){
    this.seguidorService.obterSeguidores(id)
    .subscribe(seguidores => this.seguidores = seguidores),
    result => { this.onSave(result) },
    error => { this.onError(error) };
  }

  obterPostagens(id: string){
    this.postagemService.obterPostagens(id)
    .subscribe(postagens => this.postagens = postagens),
    result => { this.onSave(result) },
    error => { this.onError(error) };
  }

  public obterSeguidor(id: string) {
    this.seguidorService.obterSeguidor(id)
      .subscribe(seguidorExistente => this.seguidorExistente = seguidorExistente),
      result => { this.onSave(result) },
      error => { this.onError(error) };
  }

  public seguir() {
    this.seguidor.usuarioId = this.user.id;
    this.seguidor.seguidorId = this.perfilId;

    this.seguidorService.seguir(this.seguidor)
      .subscribe(
        result => { this.onSave(result) },
        error => {
          alert(JSON.parse(error._body).erros);
        });
  }

  addPostagem(result) {
    this.postagemService.obterPostagens(this.user.id)
      .subscribe(postagens => this.postagens = postagens),
      result => { this.postagens = result },
      error => { };
  }

  onSave(response) {
    this.mensagem.success("Inscrição", "Inscrição realizada com sucesso!");
    this.errors = [];
  }
  onError(error) {
    this.errors = JSON.parse(error._body).erros;
  }

}
