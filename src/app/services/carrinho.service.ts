import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Carrinho } from '../models/carrinho.model';

import * as _ from 'lodash';

@Injectable()
export class CarrinhoService {
    public carrinhoSubject: BehaviorSubject<Carrinho>;

    public carrinho: Carrinho;

  constructor() {
    this.carrinho = new Carrinho();
    this.carrinhoSubject = new BehaviorSubject(new Carrinho());
  }

  public getCarrinhoObservable() {
      return this.carrinhoSubject.asObservable();
  }

  public atualizarCarrinho(carrinho: Carrinho) {
    this.carrinho = _.cloneDeep(carrinho);
    this.carrinhoSubject.next(_.cloneDeep(carrinho));
  }

  public recalcularCarrinho(carrinho: Carrinho) {
    carrinho = _.cloneDeep(carrinho) as Carrinho;
    let total = 0;
    let despesasTotais = carrinho.despesasTotais;
    if(!despesasTotais) {
      despesasTotais = 400;
    }
    carrinho.produtos.forEach((p) => {
      p.precoVenda = (p.produto.custoCompra * p.quantidade) + (despesasTotais / carrinho.produtos.length);
      p.precoVenda = p.precoVenda * (1 + (carrinho.margemLucro || 0) / 100);
      total += p.precoVenda;
    });
    carrinho.total = total;

    this.atualizarCarrinho(carrinho);
  }

}