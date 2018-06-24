import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Usuario } from '../models/usuario';
import { BaseService } from '../../services/base.service';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()
export class UsuarioService extends BaseService {

    constructor(private http: InterceptorService) { super(); }

    cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let jsons = JSON.stringify(usuario);
        let response = this.http
            .post(this.UrlServiceV1 + "nova-conta", usuario, options)
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };

    login(usuario: Usuario): Observable<Usuario> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let response = this.http
            .post(this.UrlServiceV1 + "conta ", usuario, options)
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };
}