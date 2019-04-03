import { Component } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';
import { ProdutoDialogComponent } from './dialog/produto-dialog.component';
import { CarrinhoService } from '../../services/carrinho.service';
import { Observable } from 'rxjs';
import { Carrinho } from '../../models/carrinho.model';
import { ProdutoPedido } from '../../models/produto-pedido.model';

import * as _ from 'lodash';

@Component({
  selector: 'produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

  public url;

  public produtoDataSource = new MatTableDataSource([]);

  public carrinho: Carrinho;
  public $carrinho: Observable<Carrinho>;

    constructor(
        private produtoService: ProdutoService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        public carrinhoService: CarrinhoService
    ) {
      this.buscarProdutos();
      this.$carrinho = this.carrinhoService.getCarrinhoObservable();

      this.$carrinho.subscribe(res => {
        this.carrinho = res;
      });

    }

    buscarProdutos() {
      console.log('buscou');
      this.produtoService.getAll().subscribe((res) => {
        const prod = res.filter(p => p.custoCompra > 0);
        this.produtoDataSource.data = prod;
        this.produtoDataSource._updateChangeSubscription();
      });
    }

    public addOrEditProduto(produto?: Produto, idx?: number) {
      if(!produto){
        produto = new Produto();
      }
      const dialogRef = this.dialog.open(ProdutoDialogComponent, {
        width: '380px',
        data: _.cloneDeep(produto)
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){

          if(result.produtoId){
            this.produtoService.editar(result).subscribe((res) => {
              this.buscarProdutos();
            });
        } else {
            this.produtoService.salvar(result).subscribe((res) => {
              this.buscarProdutos();
            });
        }
        }
      });
    }

    public excluirProduto(produto: Produto, idx: number) {
      this.produtoService.excluir(produto.produtoId).subscribe((res) => {
        this.produtoDataSource.data.splice(idx, 1);
        this.produtoDataSource._updateChangeSubscription();
        this.snackBar.open('Produto excluído com sucesso!', '', {
          duration: 2000,
        });
      });
    }

    public adicionarCarrinho(produto: Produto) {
      const idx = this.carrinho.produtos.findIndex(p => p.produto.produtoId === produto.produtoId);

      if(idx !== -1) {
        this.snackBar.open('Este produto já está no Carrinho!', '', {
          duration: 2000,
        });
      } else {
        const produtoPedido = new ProdutoPedido();
        produtoPedido.produto = produto;
        produtoPedido.produtoId = produto.produtoId;
        produtoPedido.quantidade = 1;
        produtoPedido.precoVenda = produto.custoCompra;
        this.carrinho.produtos.push(produtoPedido);

        this.carrinhoService.atualizarCarrinho(this.carrinho);

        this.snackBar.open('Produto adicionado!', '', {
          duration: 2000,
        });
      }
    }
  
}
