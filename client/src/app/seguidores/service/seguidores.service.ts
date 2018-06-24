import { BaseService } from "../../services/base.service";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { InterceptorService } from "ng2-interceptors";
import { Seguidor } from "../models/seguidor";

@Injectable()
export class SeguidoresService extends BaseService {

    constructor(private http:  InterceptorService) { super(); }

    obterSeguidores(id: string): Observable<Seguidor[]> {

        return this.http
            .get(this.UrlServiceV1 + "seguidores/" + id, super.HeaderAutenticado())
            .map((res: Response) => <Seguidor[]>res.json())
            .catch(super.serviceError);
    }

    seguir(seguidor: Seguidor): Observable<Seguidor> {

        let jsons = JSON.stringify(seguidor);
        let response = this.http
            .post(this.UrlServiceV1 +"seguidores/", seguidor,  super.HeaderAutenticado())
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };

    obterSeguidor(id: string): Observable<Seguidor>{
        return this.http
        .get(this.UrlServiceV1 + "seguidores/obterSeguidor/" + id, super.HeaderAutenticado())
        .map((res: Response) => <Seguidor>res.json())
        .catch(super.serviceError);
    }
}