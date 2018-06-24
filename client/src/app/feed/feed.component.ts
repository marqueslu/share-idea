import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../perfil/service/perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Perfil } from '../perfil/model/perfil';
import { PostagemService } from '../postagem/service/postagem.service';
import { Postagem } from '../postagem/model/postagem';
import { Projeto } from '../projeto/model/projeto';
import { ProjetoService } from '../projeto/service/projeto.service';
import { Seguidor } from '../seguidores/models/seguidor';
import { SeguidoresService } from '../seguidores/service/seguidores.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public perfil: Perfil;
  public postagens: Postagem[];
  public postagensUsuario: Postagem[];
  public projetosUsuario: Projeto[];
  public seguidoresUsuario: Seguidor[];
  public errorMessage: string;
  public user;
  public errors: any[] = [];
  public sub: Subscription;

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private postagemService: PostagemService,
    private projetoService: ProjetoService,
    private seguidoresService: SeguidoresService,
    private route: ActivatedRoute) {

    this.user = perfilService.obterUsuario()
    this.perfil = new Perfil();
  }

  ngOnInit() {
    this.perfilService.obterPerfil(this.user.id)
      .subscribe(perfil => this.perfil = perfil),
      result => { this.onSave(result) },
      error => { this.onError(error) };

    this.obterPostagensFeed(this.user.id)
    this.obterPostagensUsuario(this.user.id);
    this.obterProjetosUsuario(this.user.id);
    this.obterSeguidoresUsuario(this.user.id);

  }

  obterSeguidoresUsuario(id: string) {
    this.seguidoresService.obterSeguidores(id)
      .subscribe(seguidoresUsuario => this.seguidoresUsuario = seguidoresUsuario)
    result => { this.onSave(result) };
    error => { this.onError(error) };
  }
  obterPostagensUsuario(id: string) {
    this.postagemService.obterPostagens(id)
      .subscribe(postagensUsuario => this.postagensUsuario = postagensUsuario),
      result => { this.onSave(result) };
    error => { this.onError(error) };
  }

  obterProjetosUsuario(id: string) {
    this.projetoService.obterProjetos(id)
      .subscribe(projetosUsuario => this.projetosUsuario = projetosUsuario),
      result => { this.onSave(result) };
    error => { this.onError(error) };
  }

  obterPostagensFeed(id: string) {
    this.postagemService.obterPostagensFeed(id)
      .subscribe(postagens => this.postagens = postagens),
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
