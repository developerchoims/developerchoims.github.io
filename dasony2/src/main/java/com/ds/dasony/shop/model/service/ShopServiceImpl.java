package com.ds.dasony.shop.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.shop.model.dao.ShopDao;
import com.ds.dasony.shop.model.vo.Coupon;
import com.ds.dasony.shop.model.vo.Product;
import com.ds.dasony.shop.model.vo.Shop;

@Service
public class ShopServiceImpl implements ShopService{

	private final ShopDao shopDao;
	@Autowired
	public ShopServiceImpl(ShopDao shopDao) {
		this.shopDao = shopDao;
	}
	
	@Override
	public List<Shop> shopList(String userRegion, String shopCate) {
		return shopDao.shopList(userRegion, shopCate);
	}

	@Override
	public int shopDelete(Map<String, String> shopOkey) {
		return shopDao.shopDelete(shopOkey);
	}

	@Override
	public int shopAdd(Shop newShop) {
		return shopDao.shopAdd(newShop);
	}

	@Override
	public int modifyingShop(Shop modifyingShop) {
		return shopDao.modifyingShop(modifyingShop);
	}

	@Override
	public Shop shopInfo(String shopOkey) {
		return shopDao.shopInfo(shopOkey);
	}

	@Override
	public int addProductImg(List<Map<String, Object>> uploadedFileName) {
		return shopDao.addProductImg(uploadedFileName);
	}

	@Override
	public int addProduct(Product product) {
		return shopDao.addProduct(product);
	}

	@Override
	public String findProductNo(Product product) {
		return shopDao.findProductNo(product);
	}

	@Override
	public List<Product> productInfo(String shopOkey, String shopCate, String userRegion) {
		return shopDao.productInfo(shopOkey, shopCate, userRegion);
	}

	@Override
	public List<String> productInfoImg(String productNo) {
		return shopDao.productInfoImg(productNo);
	}

	@Override
	public int modProduct(Product product) {
		return shopDao.modProduct(product);
	}

	@Override
	public int deleteProductImg(String productNo) {
		return shopDao.deleteProductImg(productNo);
	}

	@Override
	public int productDelete(String productNo) {
		return shopDao.productDelete(productNo);
	}

	@Override
	public int productImgDelete(String productNo) {
		return shopDao.productImgDelete(productNo);
	}

	@Override
	public String shopTitle(String store) {
		return shopDao.shopTitle(store);
	}

	@Override
	public int shopHeartOn(Map<String, String> map) {
		return shopDao.shopHeartOn(map);
	}
	
	@Override
	public int shopHeartOff(Map<String, String> map) {
		return shopDao.shopHeartOff(map);
	}

	@Override
	public int shopHeartCss(Map<String, String> map) {
		return shopDao.shopHeartCss(map);
	}

	@Override
	public List<Product> productCareInfo(long userNo) {
		return shopDao.productCareInfo(userNo);
	}

	@Override
	public int couponBuy(Coupon coupon) {
		return shopDao.couponBuy(coupon);
	}

	@Override
	public List<Coupon> couponList(Map<String, String> map) {
		return shopDao.couponList(map);
	}

	@Override
	public List<Product> productBestInfo(String userRegion) {
		return shopDao.productBestInfo(userRegion);
	}


}
