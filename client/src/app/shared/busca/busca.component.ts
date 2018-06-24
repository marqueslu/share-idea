import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator } from '../../utils/generic-form-validator';




@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent {

  buscaForm: FormGroup;
  busca: any;
  nome: string = "";
  private genericValidator: GenericValidator;
  constructor(
    private router: Router, private fb: FormBuilder) {

    this.buscaForm = fb.group({
      'nome': ['', Validators.required]
    });
  }

  buscar(busca) {
    this.nome = busca.nome;
    if (this.nome === '') {
      alert('Digite alguma coisa....:/');
    }
    else {
      this.router.navigate(['buscar/', this.nome]);
    }
  }

}
