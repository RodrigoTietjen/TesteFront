import { ProdutoPedido } from './produto-pedido.model';

export class Pedido {
    constructor(
        public pedidoId?: number,
        public data?: Date,
        public valorTotal?: number,
        public produtos: ProdutoPedido[] = [],
        public despesasTotais?: number,
        public margemLucro?: number
    ) {

    }
}