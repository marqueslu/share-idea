import { ToastyService, ToastOptions, ToastData, ToastyConfig } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class MensagemFactory {

    constructor(private toastyService: ToastyService,
        private toastyConfig: ToastyConfig ) {
    }


    public  success(titulo: string, msg: string, ) : void {
        let toastOptions: ToastOptions = {
            title: titulo,
            msg: msg,
            showClose: true,
            timeout: 3000,
            theme: 'bootstrap'
        };
          this.toastyService.success(toastOptions);
    }
   public error(titulo: string, msg: string) {
    let toastOptions: ToastOptions = {
        title: titulo,
        msg: msg,
        showClose: true,
        timeout: 3000,
        theme: 'bootstrap'
    };
      this.toastyService.error(toastOptions);
    }
}