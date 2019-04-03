import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { MatIconModule, MatButtonModule, MatTableModule, MatDialogModule, MatInputModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CarrinhoService } from './services/carrinho.service';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';
import { PedidoService } from './services/pedido.service';
import { ProdutoService } from './services/produto.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProdutoDialogComponent } from './componentes/produtos/dialog/produto-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarrinhoDialogComponent } from './componentes/carrinho-dialog/carrinho-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PedidosComponent,
    ProdutoDialogComponent,
    ProdutosComponent,
    CarrinhoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [CarrinhoService, PedidoService, ProdutoService, HttpClient],
  bootstrap: [AppComponent],
  entryComponents: [ProdutoDialogComponent, CarrinhoDialogComponent]
})
export class AppModule { }
