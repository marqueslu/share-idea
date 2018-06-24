import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Perfil } from "../model/perfil";
import { InterceptorService } from "ng2-interceptors";



@Injectable()
export class PerfilService extends BaseService {

    constructor(private http:  InterceptorService) { super(); }

    obterPerfil(id: string): Observable<Perfil> {
        return this.http
            .get(this.UrlServiceV1 + "/perfil/" + id, super.HeaderAutenticado())
            .map((res: Response) => <Perfil[]>res.json())
            .catch(super.serviceError);
    }

    buscarPerfil(nome: string) : Observable<Perfil[]>{
        return this.http
        .get(this.UrlServiceV1 + "/perfil/buscar/" + nome, super.HeaderAutenticado())
            .map((res: Response) => <Perfil[]>res.json())
            .catch(super.serviceError);
    }

    editarPerfil(perfil: Perfil): Observable<Perfil> {
        let response = this.http
            .put(this.UrlServiceV1 + "/perfil/", perfil, super.HeaderAutenticado())
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };
}