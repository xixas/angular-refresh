import { ProductsService } from './products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit, OnDestroy {
  productName = 'Book';
  products: string[] = [];
  isDisabled = true;
  private productSubscription!: Subscription;
  constructor(public productsService: ProductsService) {}
  onAddProduct(form: any) {
    console.log(form);
    form.valid && this.productsService.addProduct(form.value.productName);
  }
  onRemoveProduct(product: string) {
    this.products = this.products.filter((p) => p !== product);
  }
  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.productSubscription = this.productsService.productUpdated.subscribe(
      () => {
        this.products = this.productsService.getProducts();
      }
    );
  }
  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
