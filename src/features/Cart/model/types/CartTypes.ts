export interface CartProduct {
  id: string;
  quantity: number;
}

export interface CartSchema {
  products: { [key: string]: CartProduct };
}

export interface AddProductToCartPayload {
  productId: string;
  quantity: number;
}

export interface RemoveProductToCartPayload {
  productId: string;
  removeAll: boolean;
}
