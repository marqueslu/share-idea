import { Component, OnInit } from '@angular/core';
import { SeguidoresService } from './service/seguidores.service';
import { Seguidor } from './models/seguidor';


@Component({
  selector: 'app-seguidores',
  templateUrl: './seguidores.component.html',
  styleUrls: ['./seguidores.component.css']
})

export class SeguidoresComponent implements OnInit {

  public seguidores: Seguidor[];
  public errorMessage: string;
  public user;

  constructor(private seguidorService: SeguidoresService) {
    this.user = seguidorService.obterUsuario();
  }

  ngOnInit() {
    this.seguidorService.obterSeguidores(this.user.id)
      .subscribe(seguidores => this.seguidores = seguidores,
      error => this.errorMessage);
  }
}
