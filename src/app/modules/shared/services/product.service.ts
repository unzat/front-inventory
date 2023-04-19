import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * get all the products
   */
  getProducts() {
    const endpoint = `${base_url}/products`;
    return this.http.get(endpoint);
  }

  /**
   * save products
   * @param body 
   * @returns 
   */
  saveProduct(body: any) {
    const endpoint = `${base_url}/products`;
    return this.http.post(endpoint, body);
  }

  /**
   * update products
   * @param body 
   * @param id 
   * @returns 
   */
  updateProduct(body: any, id: any) {
    const endpoint = `${base_url}/products/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * delete products
   * @param id 
   * @returns 
   */
  deleteProduct(id: any) {
    const endpoint = `${base_url}/products/${id}`;
    return this.http.delete(endpoint);
  }
  
  /**
   * get products by name
   * @param name 
   * @returns 
   */
  getProductByName(name: any) {
    const endpoint = `${base_url}/products/filter/${name}`;
    return this.http.get(endpoint);
  }

  /**
   * export excel products
   */
  exportExcelProducts() {
    const endpoint = `${base_url}/products/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}
