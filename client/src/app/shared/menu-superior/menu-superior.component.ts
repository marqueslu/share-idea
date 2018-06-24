import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  public token;
  public user;

  constructor(private router: Router) {
    this.token = localStorage.getItem('rsc.token');
    this.user = JSON.parse(localStorage.getItem('rsc.user'));
  }

  ngOnInit() {
  }

  usuarioLogado(): boolean{
    return this.token !== null;
  }

}
