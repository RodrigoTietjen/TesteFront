import { ProdutoPedido } from './produto-pedido.model';

export class Carrinho {
    constructor(
        public produtos: ProdutoPedido[] = [],
        public despesasTotais: number = 400,
        public margemLucro?: number,
        public total: number = 0
    ) {

    }
}