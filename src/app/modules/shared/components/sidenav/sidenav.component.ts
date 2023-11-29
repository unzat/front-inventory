import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
  mobileQuery: MediaQueryList;
  username: string="";

  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Categorias", route: "category", icon: "category"},
    {name: "Productos", route: "product", icon: "add_shopping_cart"},
    {name: "Clientes", route: "customer", icon: "people"},
    {name: "Proveedores", route: "supplier", icon: "local_shipping"},
    {name: "Ventas", route: "sale", icon: "trending_up"},
    {name: "Compras", route: "purchase", icon: "payment"},
  ]

  constructor(media: MediaMatcher, private keycloakService: KeycloakService){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
  ngOnInit(): void {
    this.username = this.keycloakService.getUsername();
    this.username = this.username.toUpperCase();
  }

  logout() {
    this.keycloakService.logout();
  }
}
