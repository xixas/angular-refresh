import { Subject } from 'rxjs';

export class ProductsService {
  deleteProduct(productName: string) {
    this.products = this.products.filter((p) => p !== productName);
    this.productUpdated.next();
  }
  private products: string[] = ['Book'];
  productUpdated = new Subject<void>();
  addProduct(productName: string) {
    this.products.push(productName);
    this.productUpdated.next();
  }
  getProducts() {
    return [...this.products];
  }
}
