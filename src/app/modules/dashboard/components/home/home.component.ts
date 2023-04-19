import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { ProductElement } from 'src/app/modules/product/components/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  chartBar: any;
  chartDoughnut: any;
  
  constructor(private productService: ProductService){}

  ngOnInit() {
    this.getProducts();
  }

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
    const nameProduct: String [] = [];
    const quantity: number [] = [];

    if (resp.metadata[0].code == "00") {
      let listProduct = resp.productResponse.product;
      listProduct.forEach((element: ProductElement) => {
        nameProduct.push(element.name);
        quantity.push(element.quantity);
      });

      // grafico de barra
      this.chartBar = new Chart('canvas-bar', {
        type: 'bar',
        data: {
          labels: nameProduct,
          datasets: [
            {label: 'Productos', data: quantity}
          ]
        }
      });

      // grafico de doughnut
      this.chartDoughnut = new Chart('canvas-doughnut', {
        type: 'doughnut',
        data: {
          labels: nameProduct,
          datasets: [
            {label: 'Productos', data: quantity}
          ]
        }
      });
    }
  }
}
