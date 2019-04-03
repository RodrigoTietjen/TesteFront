import { Produto } from './produto.model';
import { Pedido } from './pedido.model';

export class ProdutoPedido {
    constructor(
        public produtoPedidoId?: number,
        public produto?: Produto,
        public produtoId?: number,
        public pedido?: Pedido,
        public pedidoId?: number,
        public precoVenda?: number,
        public quantidade?: number
    ) {

    }
}