import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProdutoDialogComponent } from '../produtos/dialog/produto-dialog.component';
import { Carrinho } from '../../models/carrinho.model';

import * as _ from 'lodash';
import { CarrinhoService } from '../../services/carrinho.service';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'carrinho-dialog',
  templateUrl: './carrinho-dialog.component.html',
  styleUrls: ['./carrinho-dialog.component.scss']
})
export class CarrinhoDialogComponent {

  public carrinho: Carrinho;
  
  constructor(
    public dialogRef: MatDialogRef<ProdutoDialogComponent>,
    public carrinhoService: CarrinhoService,
    public pedidoService: PedidoService
  ) {
    this.carrinhoService.getCarrinhoObservable().subscribe((res) => {
      this.carrinho = res;
    });
  }

  public recalcular() {
    this.carrinhoService.recalcularCarrinho(this.carrinho);
  }

  public removerProduto(idx: number) {
    this.carrinho.produtos.splice(idx, 1);
    this.carrinhoService.atualizarCarrinho(this.carrinho);
    this.recalcular();
  }

  public finalizarPedido() {
    const pedido = new Pedido();
    pedido.despesasTotais = this.carrinho.despesasTotais;
    pedido.produtos = this.carrinho.produtos;
    pedido.valorTotal = this.carrinho.total;
    pedido.margemLucro = this.carrinho.margemLucro;

    this.pedidoService.salvar(pedido).subscribe((res) => {
      this.pedidoService.novoPedido();
    });
    this.carrinhoService.atualizarCarrinho(new Carrinho());
  }
}
