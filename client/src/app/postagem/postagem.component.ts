import { Component, OnInit, Input } from '@angular/core';
import { Postagem } from './model/postagem';
import { PostagemService } from './service/postagem.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";
import { PostagemEditarComponent } from './postagem-editar/postagem-editar.component';



@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
@Component({
  selector: 'app-postagens',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})

export class PostagemComponent implements OnInit {

  @Input()  postagens: Postagem[];
  public perfilId: string = "";
  public sub: Subscription;
  public user;
  private id;

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService:DialogService) {
    this.user = postagemService.obterUsuario();
    this.id = JSON.parse(localStorage.getItem('rsc.user')).id;

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.perfilId = params['id'];
        if(params['id'] == null){
          this.perfilId = this.user.id;
          this.obterPostagens(this.perfilId);
        }
        else{
        this.obterPostagens(this.perfilId);
      }
    }
    );
    console.log(this.perfilId);
  }

  obterPostagens(id: string) {
    this.postagemService.obterPostagens(id)
      .subscribe(postagens => this.postagens = postagens),
      result => { this.onSave(result) },
      error => { this.onError(error) };
  }

  onSave(response) {
       alert(response);
  }

  onError(error) {
    alert(error);
  }

  editar(postagem){

    let disposable = this.dialogService.addDialog(PostagemEditarComponent, {
      title:'Editar Postagem',
      postagemId: postagem.id})
      .subscribe((ok)=>{
        if(ok) this.obterPostagens(this.perfilId);
      });

   }
}
