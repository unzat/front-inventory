import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NewCategoryComponent } from 'src/app/modules/category/components/new-category/new-category.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  constructor(private productService: ProductService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.getProducts();
  }

  displayedColums: string[]=['id','name','price','quantity','category','picture','actions'];
  dataSourse = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts(){
    this.productService.getProducts()
      .subscribe((data:any) => {
        console.log("Respuesta de productos: ", data);
        this.processProductResponse(data);
      }, (error: any) => {
        console.log("Error productos: ", error);
      })
  }

  processProductResponse(resp: any) {
    const dataProduct: ProductElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listProduct = resp.productResponse.product;
      listProduct.forEach((element: ProductElement) => {
        //element.category = element.category.name;   
        element.picture = 'data:image/jpeg;base64,'+element.picture;
        dataProduct.push(element)
      });
      this.dataSourse = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSourse.paginator = this.paginator;
    }
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: "450px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Producto Agregado", "Guardado");
        this.getProducts();
      }else if (result == 2){
        this.openSnackBar("Algo salio mal al guardar el producto", "Error!");
        this.getProducts();
      }
    });
  }

  openSnackBar(message: string, action: string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 3000
    })
  }

  edit(id: number, name: string, price: number, quantity: number, category: any){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: "450px",
      data: {id:id, name:name, price:price, quantity:quantity, category:category}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Producto Editado", "Editado");
        this.getProducts();
      }else if (result == 2){
        this.openSnackBar("Algo salio mal al editar el producto", "Error!");
        this.getProducts();
      }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "450px",
      data: {id: id, module: "product"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Producto Eliminado", "Eliminado");
        this.getProducts();
      }else if (result == 2){
        this.openSnackBar("Algo salio mal al eliminar el producto", "Error!");
        this.getProducts();
      }
    });
  }

  buscar(termino: string) {
    if (termino.length != 0) {
      this.productService.getProductByName(termino)
        .subscribe((resp:any) => {
          this.processProductResponse(resp);
      })
    }else{
      return this.getProducts();
    }
  }
}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: any;
  picture: any;
}
