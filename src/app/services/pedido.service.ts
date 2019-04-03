import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Carrinho } from '../models/carrinho.model';

import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido.model';

@Injectable()
export class PedidoService {

    private controllerUrl = 'api/pedido';

    private novoPedidoSubject = new BehaviorSubject<any>(true);

  constructor(
      private http: HttpClient
  ) {
  }

  public getAll(): Observable<Pedido[]> {
      return this.http.get<Pedido[]>(this.controllerUrl);
  }

  public salvar(pedido: Pedido) {
    return this.http.post<Pedido>(this.controllerUrl, pedido);
  }

  public getNovoPedidoObservable(): Observable<boolean> {
      return this.novoPedidoSubject.asObservable();
  }

  public novoPedido(): void {
    this.novoPedidoSubject.next(true);
  }


}