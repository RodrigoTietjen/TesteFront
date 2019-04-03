import { Component, Inject } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'produto-dialog',
  templateUrl: './produto-dialog.component.html',
  styleUrls: ['./produto-dialog.component.scss']
})
export class ProdutoDialogComponent {

    public produto: Produto;

    constructor(
        private produtoService: ProdutoService,
        public dialogRef: MatDialogRef<ProdutoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Produto,
        private snackBar: MatSnackBar
    ) {
        this.produto = data;
    }

    readUrl(event:any) {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
      
          reader.onload = (event: ProgressEvent) => {
            this.produto.foto = (<FileReader>event.target).result;
          }
          reader.readAsDataURL(event.target.files[0]);
        }
      }

    public sucesso() {
        this.snackBar.open('Produto salvo com sucesso!', '', {
            duration: 2000,
        });
        this.fechar();
    }

    public fechar() {
        this.dialogRef.close(this.produto);
    }
  
}
