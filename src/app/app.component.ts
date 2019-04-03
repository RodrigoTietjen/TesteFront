import { Component } from '@angular/core';
import { CarrinhoService } from './services/carrinho.service';
import { Carrinho } from './models/carrinho.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CarrinhoDialogComponent } from './componentes/carrinho-dialog/carrinho-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public carrinho: Carrinho;

  public $carrinho: Observable<Carrinho>;

  constructor(
    private carrinhoService: CarrinhoService,
    private dialog: MatDialog
  ) {
    this.$carrinho = this.carrinhoService.getCarrinhoObservable();

    this.$carrinho.subscribe((res) => {
      this.carrinho = res;
    })
  }


  public abrirCarrinho() {
    this.carrinhoService.recalcularCarrinho(this.carrinho);
    const dialogRef = this.dialog.open(CarrinhoDialogComponent, {
      width: '500px',
      position: {top: "50px", right: "0"}
    });
  }
}
