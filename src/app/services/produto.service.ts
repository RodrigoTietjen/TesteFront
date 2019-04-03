import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Carrinho } from '../models/carrinho.model';

import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto.model';

@Injectable()
export class ProdutoService {

    private controllerUrl = 'api/produto';

    constructor(
        private http: HttpClient
    ) {
    }

    public getAll(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.controllerUrl);
    }


    public salvar(produto: Produto): Observable<Produto> {
        return this.http.post<Produto>(this.controllerUrl, produto);
    }

    public editar(produto: Produto): Observable<Produto> {
        return this.http.put(this.controllerUrl, produto);
    }

    public excluir(produtoId: number): Observable<Object> {
        return this.http.delete<Object>(this.controllerUrl + '/' + produtoId);
    }


}