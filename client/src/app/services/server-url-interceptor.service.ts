import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import { XHRBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { ToastyService, ToastOptions, ToastData, ToastyConfig } from 'ng2-toasty';
import { LoaderService } from './loader-service';
import { Injectable } from '@angular/core';
import { MensagemFactory } from '../utils/mensagem-factory';

@Injectable()
export class ServerUrlInterceptor implements Interceptor  {

    constructor( private loader: LoaderService) {
 
    }
    public interceptBefore(request: InterceptedRequest): InterceptedRequest {
       if(request.options.method != 0) this.loader.ativar("Carregando...");
        return request;
    }

    public interceptAfter(response: InterceptedResponse): InterceptedResponse {
        this.loader.parar();
       
        return response;
    }
}