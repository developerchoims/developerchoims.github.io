package com.ds.dasony.shop.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductCare {
	
	private int userNo;
	private String productNo;
	private Shop shop;
	private Product product;
	private ProductImg productImg;
	
	public Shop getShop() {
	    return shop;
	}

	public void setShop(Shop shop) {
	    this.shop = shop;
	}
	
	public Product getProduct() {
	    return product;
	}

	public void setProduct(Product product) {
	    this.product = product;
	}
	
	public ProductImg getProductImg() {
	    return productImg;
	}

	public void setProductImg(ProductImg productImg) {
	    this.productImg = productImg;
	}
	
	
}
