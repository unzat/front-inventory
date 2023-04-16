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
}
