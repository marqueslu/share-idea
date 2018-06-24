import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Perfil } from "../../perfil/model/perfil";
import { Observable } from "rxjs/Observable";
import { Solicitacao } from "../model/solicitacao";
import { InterceptorService } from "ng2-interceptors";



@Injectable()
export class SolicitacaoService extends BaseService{

    constructor(private http:  InterceptorService) { super(); }

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('rsc.user'));
    }

    obterSolicitacoes(id: string): Observable<Solicitacao[]> {
        return this.http
            .get(this.UrlServiceV1 + "/amizade/solicitacoes/" + id, super.HeaderAutenticado())
            .map((res: Response) => <Solicitacao[]>res.json())
            .catch(super.serviceError);
    }

    responderSolicitacao(solicitacao : Solicitacao){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let jsons = JSON.stringify(solicitacao);
        let response = this.http
            .post(this.UrlServiceV1 + "/amizade/responder/", solicitacao,  super.HeaderAutenticado())
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    }

    enviarSolicitacao(solicitacao : Solicitacao){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let jsons = JSON.stringify(solicitacao);
        let response = this.http
            .post(this.UrlServiceV1 + "/amizade/solicitar/", solicitacao,  super.HeaderAutenticado())
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    }
}