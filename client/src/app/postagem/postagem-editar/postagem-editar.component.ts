import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Postagem } from "../model/postagem";
import { Subscription } from "rxjs/Subscription";
import { GenericValidator } from "../../utils/generic-form-validator";
import { PostagemService } from "../service/postagem.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { MensagemFactory } from "../../utils/mensagem-factory";

export interface dtoPostagemModal {
  title:string;
  postagemId: string;
}

@Component({
  selector: 'app-postagem-editar',
  templateUrl: './postagem-editar.component.html',
  styleUrls: ['./postagem-editar.component.css']
})

export class PostagemEditarComponent extends DialogComponent<dtoPostagemModal, boolean> implements dtoPostagemModal, OnInit {

  public errors: any[] = [];
  public postagemForm: FormGroup;
  public postagem: Postagem;
  public postagemId: string;
  public sub: Subscription;
  title:string;
  


  displayMessage: { [key: string]: string } = {}
  validationMessage: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    dialogService: DialogService,
    private mensagem: MensagemFactory) {
      super(dialogService);
    this.validationMessage = {
      conteudo: {
        maxLenght: 'Máximo 1000 caracteres'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessage);
    this.postagem = new Postagem();
  }

  ngOnInit() {
    this.postagemForm = this.fb.group({
      conteudo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]]
    });

    this.sub = this.route.params.subscribe(
      params => {
        this.obterPostagem(this.postagemId);
      }
    );
  }

  obterPostagem(id: string) {
    this.postagemService.obterPostagem(id)
      .subscribe(
        postagem => this.preencherFormPostagem(postagem),
        response => {
          if (response.status == 404) {
            this.router.navigate(['Não encontrado :('])
          }
        }
      );
  }

  preencherFormPostagem(postagem: Postagem): void {
    this.postagem = postagem;

    this.postagemForm.patchValue({
      conteudo: this.postagem.conteudo
    });
  }

  editarPostagem() {
    if (this.postagemForm.dirty && this.postagemForm.valid) {
      let p = Object.assign({}, this.postagem, this.postagemForm.value);
      let user = this.postagemService.obterUsuario();
      p.usuarioId = this.postagem.usuarioId;
     
      this.postagemService.editar(p)
        .subscribe(
          result => { 
            this.onSave();
            
           },
          error => {
            this.errors = JSON.parse(error._body).errors;
          });
          
    }
  }

  onSave() {
    this.mensagem.success("Postagem","Postagem alterada com sucesso!");
    this.errors = [];
    this.result = true;
    this.close();
    //this.router.navigate(['/feed']);
  }

  onError(error) {
    this.errors = JSON.parse(error._body).erros;
    alert(this.errors);
  }

  
}

