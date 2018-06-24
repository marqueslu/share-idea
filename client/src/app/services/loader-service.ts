import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export class LoaderService {

    private carregar = new Subject<any>();
    private stop = new Subject<any>();
    carregarConfirmado = this.carregar.asObservable();
    pararConfirmado = this.stop.asObservable();
  
    private lock = false;
  
    ativar(mensagem: string) {
        this.carregar.next(mensagem);
    }
  
    parar() {
      if (!this.lock) this.stop.next();
    }
  
    setLock(l) {
      this.lock = l;
    }
    constructor() { }
}