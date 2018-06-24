import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Projeto } from "../model/projeto";
import { InterceptorService } from "ng2-interceptors";


@Injectable()
export class ProjetoService extends BaseService {

    constructor(private http:  InterceptorService) { super(); }

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('rsc.user'));
    }

    criarProjeto(projeto: Projeto): Observable<Projeto> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let jsons = JSON.stringify(projeto);
        let response = this.http
            .post(this.UrlServiceV1 + "projetos", projeto, super.HeaderAutenticado())
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };

    
    atualizarProjeto(projeto: Projeto): Observable<Projeto> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let jsons = JSON.stringify(projeto);
        let response = this.http
            .put(this.UrlServiceV1 + "projetos", projeto, super.HeaderAutenticado())
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };


    obterProjetos(id: string): Observable<Projeto[]> {
        return this.http
            .get(this.UrlServiceV1 + "projetos/" + id, super.HeaderAutenticado())
            .map((res: Response) => <Projeto[]>res.json())
            .catch(super.serviceError);
    }

    obterProjeto(id: string): Observable<Projeto> {
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(this.UrlServiceV1 + "projetos/obterProjeto/" + id, super.HeaderAutenticado())
            .map((res: Response) => <Projeto>res.json())
            .catch(super.serviceError);
    }
}