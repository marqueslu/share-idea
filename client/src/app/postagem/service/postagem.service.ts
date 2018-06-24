import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BaseService } from '../../services/base.service';
import { Postagem } from '../model/postagem';
import { InterceptorService } from 'ng2-interceptors';


@Injectable()
export class PostagemService extends BaseService {

    constructor(private http:  InterceptorService) { super(); }

    postar(postagem: Postagem): Observable<Postagem> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let jsons = JSON.stringify(postagem);
        let response = this.http
            .post(this.UrlServiceV1 + "postagens", postagem,  super.HeaderAutenticado())
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };

    obterPostagem(id: string): Observable<Postagem> {
        return this.http
            .get(this.UrlServiceV1 + "/postagem/" + id, super.HeaderAutenticado())
            .map((res: Response) => <Postagem[]>res.json())
            .catch(super.serviceError);
    }

    editar(postagem: Postagem): Observable<Postagem> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let response = this.http
            .put(this.UrlServiceV1 + "postagens", postagem, super.HeaderAutenticado())
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };

    obterPostagens(id: string): Observable<Postagem[]> {

        return this.http
            .get(this.UrlServiceV1 + "postagens/" + id, super.HeaderAutenticado())
            .map((res: Response) => <Postagem[]>res.json())
            .catch(super.serviceError);
    }

    obterPostagensFeed(id: string): Observable<Postagem[]> {

        return this.http
            .get(this.UrlServiceV1 + "postagens/postagensFeed/" + id, super.HeaderAutenticado())
            .map((res: Response) => <Postagem[]>res.json())
            .catch(super.serviceError);
    }
}