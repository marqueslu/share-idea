import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

export abstract class BaseService {

    protected UrlServiceV1: string = "https://rede-social-api-tcc.azurewebsites.net/api/v1/";
    // protected UrlServiceV1: string = "http://localhost:59584/api/v1/";

    public Token: string = "";

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('rsc.user'));
    }

    protected serviceError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(error);
        return Observable.throw(error);
    }

    protected extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    protected HeaderBasico(): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return options;
    }

    protected HeaderAutenticado(): RequestOptions {
        this.Token = localStorage.getItem('rsc.token');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${this.Token}`);
        let options = new RequestOptions({ headers: headers });

        return options;
    }
}


