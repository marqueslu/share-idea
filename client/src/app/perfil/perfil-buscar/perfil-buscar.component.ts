import { Component, OnInit } from '@angular/core';
import { Perfil } from '../model/perfil';
import { PerfilService } from '../service/perfil.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-buscar',
  templateUrl: './perfil-buscar.component.html',
  styleUrls: ['./perfil-buscar.component.css']
})
export class PerfilBuscarComponent implements OnInit {

  public resultados: Perfil[];
  public nome: string = "";
  public sub: Subscription;

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.nome = params['nome'];
        this.buscarPerfil(this.nome);
      }
    );
  }

  buscarPerfil(nome: string) {
    this.perfilService.buscarPerfil(nome)
      .subscribe(resultados => this.resultados = resultados),
      result => { this.onSave(result) },
      error => { this.onError(error) };
  }

  onSave(response) {
    alert(response);
  }

  onError(error) {
    alert(error);
  }

}
