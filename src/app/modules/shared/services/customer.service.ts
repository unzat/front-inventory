import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { 
    
  }
  /**
   * get all customers
   * @returns 
   */
  getCustomers() {
    const endpoint = `${base_url}/customers`;
    return this.http.get(endpoint);
  }

  /**
   * save customer
   */
  saveCustomer(body: any){
    const endpoint = `${base_url}/customers`;
    return this.http.post(endpoint, body);
  }

  /**
   * update customers
   */
  updateCustomer(body: any, id: any) {
    const endpoint = `${base_url}/customers/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * delete customers
   */
  deleteCustomer(id: any) {
    const endpoint = `${base_url}/customers/${id}`;
    return this.http.delete(endpoint);
  }
  
  /**
   * search customers
   */
  getCustomerById(id: any) {
    const endpoint = `${base_url}/customers/${id}`;
    return this.http.get(endpoint);
  }

  /**
   * export excel customers
   */
  exportExcelCustomers() {
    const endpoint = `${base_url}/customers/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}
