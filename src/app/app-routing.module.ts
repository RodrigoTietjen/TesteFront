import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent
  },
  { 
    path: 'produtos', 
    component: ProdutosComponent
  },
  { 
    path: 'pedidos', 
    component: PedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
