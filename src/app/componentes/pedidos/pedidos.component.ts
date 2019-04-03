import { Component } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { MatTableDataSource } from '@angular/material';
import { Pedido } from '../../models/pedido.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {

    public pedidoDataSource = new MatTableDataSource<Pedido>([]);

    public $novoPedido: Observable<boolean>;

    constructor(
        private pedidoService: PedidoService
    ) {
        this.$novoPedido = this.pedidoService.getNovoPedidoObservable();
        this.$novoPedido.subscribe((res) => {
            this.pedidoService.getAll().subscribe((res) => {
                this.pedidoDataSource.data = res;
                this.pedidoDataSource._updateChangeSubscription();
            });
        });
    }
  
}
