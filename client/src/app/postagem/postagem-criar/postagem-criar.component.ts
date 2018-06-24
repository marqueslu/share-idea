import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Postagem } from '../model/postagem';
import { PostagemService } from '../service/postagem.service';
import { Router } from '@angular/router';
import { GenericValidator } from '../../utils/generic-form-validator';
import { ToastyService, ToastOptions, ToastData, ToastyConfig } from 'ng2-toasty';
import { MensagemFactory } from '../../utils/mensagem-factory';

@Component({
  selector: 'app-postagem-criar',
  templateUrl: './postagem-criar.component.html',
  styleUrls: ['./postagem-criar.component.css']
})
export class PostagemCriarComponent implements OnInit {

  postagemForm: FormGroup;
  postagem: Postagem;
  displayMessage: { [key: string]: string } = {}
  validationMessage: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  editor: any;
  @Output() emitirPostagem = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
    private postagemService: PostagemService,
    private router: Router,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
  private mensagem: MensagemFactory) {
    this.validationMessage = {
      conteudo: {
        maxLenght: 'A pode ter no máximo 1000 caracteres'
      }
    };
   // this.toastyConfig.position = "top-right";

    this.genericValidator = new GenericValidator(this.validationMessage);
  }

  ngOnInit() {
    this.postagemForm = this.fb.group({
      conteudo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]]
    });
  }

  criarPostagem() {
    this.displayMessage = this.genericValidator.processMessages(this.postagemForm);
   
    if (this.postagemForm.dirty && this.postagemForm.valid) {

      let p = Object.assign({}, this.postagem, this.postagemForm.value);
      let user = this.postagemService.obterUsuario();
      this.postagem = p.postagem;
      p.usuarioId = user.id;
    
      this.postagemService.postar(p)
        .subscribe(
        result => { this.onSave(result) },
        error => { this.onError(error) }
        );
        
    }
  }

  onSave(response) {
    //this.router.navigate(['/feed']);
  
    this.emitirPostagem.emit();
    this.postagemForm.reset();
   
    //Limpa a textarea
    this.editor = '';
   
   this.mensagem.success("Postagem", "Postagem realizada com sucesso!");
  }

  onError(error) {
    alert(error);
  }

}
