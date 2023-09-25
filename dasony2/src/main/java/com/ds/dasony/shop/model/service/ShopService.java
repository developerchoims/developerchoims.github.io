package com.ds.dasony.shop.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.shop.model.vo.Coupon;
import com.ds.dasony.shop.model.vo.Product;
import com.ds.dasony.shop.model.vo.Shop;

public interface ShopService {

	public List<Shop> shopList(String userRegion, String shopCate);

	public int shopDelete(Map<String, String> shopOkey);

	public int shopAdd(Shop shop);

	public int modifyingShop(Shop modifyingShop);

	public Shop shopInfo(String shopOkey);

	public int addProductImg(List<Map<String, Object>> uploadedFileName);

	public int addProduct(Product product);

	public String findProductNo(Product product);

	public List<Product> productInfo(String shopOkey, String shopCate, String userRegion);

	public List<String> productInfoImg(String productNo);

	public int modProduct(Product product);

	public int deleteProductImg(String productNo);

	public int productDelete(String productNo);

	public int productImgDelete(String productNo);

	public String shopTitle(String store);

	public int shopHeartOn(Map<String, String> map);

	public int shopHeartOff(Map<String, String> map);

	public int shopHeartCss(Map<String, String> map);

	public List<Product> productCareInfo(long userNo);

	public int couponBuy(Coupon coupon);

	public List<Coupon> couponList(Map<String, String> map);

	public List<Product> productBestInfo(String userRegion);


}
