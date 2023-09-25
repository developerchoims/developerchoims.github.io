package com.ds.dasony.shop.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.shop.model.vo.Coupon;
import com.ds.dasony.shop.model.vo.Product;
import com.ds.dasony.shop.model.vo.Shop;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class ShopDao {
	private final SqlSessionTemplate session;
	
	@Autowired
	public ShopDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<Shop> shopList(String userRegion, String shopCate) {
		Map<String, String> map = new HashMap();
		map.put("userRegion", userRegion);
		map.put("shopCate", shopCate);
		return session.selectList("shopMapper.shopList", map);
	}

	public int shopDelete(Map<String, String> shopOkey) {
		return session.delete("shopMapper.shopDelete", shopOkey);
	}

	public int shopAdd(Shop newShop) {
		return session.insert("shopMapper.shopAdd", newShop);
	}

	public int modifyingShop(Shop modifyingShop) {
		return session.update("shopMapper.modifyingShop", modifyingShop);
	}

	public Shop shopInfo(String shopOkey) {
		return session.selectOne("shopMapper.shopInfo", shopOkey);
	}

	public int addProductImg(List<Map<String, Object>> uploadedFileName) {
		return session.insert("shopMapper.addProductImg", uploadedFileName);
	}

	public int addProduct(Product product) {
		return session.insert("shopMapper.addProduct", product);
	}

	public String findProductNo(Product product) {
		return session.selectOne("shopMapper.findProductNo", product);
	}

	public List<Product> productInfo(String shopOkey, String shopCate, String userRegion) {
		Map<String, String>map = new HashMap();
		map.put("shopOkey", shopOkey);
		map.put("shopCate", shopCate);
		map.put("userRegion", userRegion);
		return session.selectList("shopMapper.productInfo", map);
	}

	public List<String> productInfoImg(String productNo) {
		return session.selectList("shopMapper.productInfoImg", productNo);
	}

	public int modProduct(Product product) {
		return session.update("shopMapper.modProduct", product);
	}

	public int deleteProductImg(String productNo) {
		return session.update("shopMapper.deleteProductImg", productNo);
	}

	public int productDelete(String productNo) {
		return session.delete("shopMapper.productDelete", productNo);
	}

	public int productImgDelete(String productNo) {
		return session.delete("shopMapper.productImgDelete", productNo);
	}

	public String shopTitle(String store) {
		return session.selectOne("shopMapper.shopTitle", store);
	}

	public int shopHeartOn(Map<String, String> map) {
		return session.insert("shopMapper.shopHeartOn", map);
	}
	public int shopHeartOff(Map<String, String> map) {
		return session.delete("shopMapper.shopHeartOff", map);
	}

	public int shopHeartCss(Map<String, String> map) {
		return session.selectOne("shopMapper.shopHeartCss", map);
	}

	public List<Product> productCareInfo(long userNo) {
		return session.selectList("shopMapper.productCareInfo", userNo);
	}

	public int couponBuy(Coupon coupon) {
		return session.insert("shopMapper.couponBuy", coupon);
	}

	public List<Coupon> couponList(Map<String, String> map) {
		return session.selectList("shopMapper.couponList", map);
	}

	public List<Product> productBestInfo(String userRegion) {
		return session.selectList("shopMapper.productBestInfo", userRegion);
	}


}
