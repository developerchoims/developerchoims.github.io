package com.ds.dasony.shop.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.point.controller.PointController;
import com.ds.dasony.point.model.vo.Point;
import com.ds.dasony.shop.model.service.ShopService;
import com.ds.dasony.shop.model.vo.Coupon;
import com.ds.dasony.shop.model.vo.Product;
import com.ds.dasony.shop.model.vo.Shop;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class ShopController {

	private final ShopService shopService;
	@Autowired
	public ShopController(ShopService shopService) {
		this.shopService = shopService;
	}
	
	@PostMapping("/shopList")
	public Map<String, Object> shopList(@RequestBody Map<String, String>map) {
		String userRegion = map.get("userRegion");
		String shopCate = map.get("shopCate");
		log.info(shopCate);
		
		Map<String, Object> shopMap = new HashMap();
		
		List<Shop> shops = new ArrayList();
		
		shops = shopService.shopList(userRegion, shopCate);
		
		if(shops != null) {
			shopMap.put("shopList", shops);
		}
		
		
		return shopMap;

	}
	
	@DeleteMapping("/shopDelete")
	public ResponseEntity<String> shopDelete(@RequestParam Map<String, String>shopOkey){
		int result = shopService.shopDelete(shopOkey);
		try {
			if(result > 0) {
				return ResponseEntity.ok("삭제 성공하였습니다.");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("삭제 실패했습니다.");
			}
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패했습니다.");
		}
	}
	
	@PostMapping("/shopAdd")
	public ResponseEntity<String> shopAdd(@RequestBody Shop newShop){
		
		String shopRegion = newShop.getShopRegion();
		String shopOkey = "";

		if ("서울특별시 강남구".equals(shopRegion)) {
		    shopOkey = "02kn";
		} else if ("서울특별시 강동구".equals(shopRegion)) {
		    shopOkey = "02kd";
		} else if ("서울특별시 관악구".equals(shopRegion)) {
		    shopOkey = "02ka";
		} else if ("서울특별시 노원구".equals(shopRegion)) {
		    shopOkey = "02nw";
		}
		
		switch(newShop.getShopCate()) {
		case "카페/베이커리" : newShop.setShopCate("B"); log.info("1실행됨"); break;
		case "외식" : newShop.setShopCate("O"); log.info("2실행됨"); break;
		case "편의점" : newShop.setShopCate("C"); log.info("3실행됨"); break;
		case "문화생활" : newShop.setShopCate("L"); log.info("4실행됨"); break;
		}

		newShop.setShopOkey(shopOkey);
		

		int result = shopService.shopAdd(newShop);
		try {
			if(result > 0) {
				return ResponseEntity.ok("상점 추가 성공했습니다.");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상점 추가 실패했습니다.");
			}
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상점 추가 실패했습니다.");
		}
	}
	
	@PostMapping("/modifyingShop")
	public ResponseEntity<String> modifyingShop(@RequestBody Shop modifyingShop){
		
		switch(modifyingShop.getShopCate()) {
		case "카페/베이커리" : modifyingShop.setShopCate("B"); log.info("1실행됨"); break;
		case "외식" : modifyingShop.setShopCate("O"); log.info("2실행됨"); break;
		case "편의점" : modifyingShop.setShopCate("C"); log.info("3실행됨"); break;
		case "문화생활" : modifyingShop.setShopCate("L"); log.info("4실행됨"); break;
		}
		
		int result = shopService.modifyingShop(modifyingShop);
		
		if(result > 0) {
			return ResponseEntity.ok("상점 수정을 성공했습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상점 수정을 실패했습니다.");
		}
		
	}
	
	@PostMapping("/shopTitle")
	public ResponseEntity<String> shopTitle(@RequestBody Map<String, String>map ){
		String store = map.get("store");
		log.info(store);
		String shopTitle = shopService.shopTitle(store);
		return ResponseEntity.ok(shopTitle);
	}
	@PostMapping("/shopHeartCss")
	public boolean shopHeartCss(@RequestBody Map<String, String>map){
		int result = shopService.shopHeartCss(map);
		
		if(result>0) {
			return true;
		} else {
			return false;
		}
	}
	
	@PostMapping("/shopHeartOn")
	public ResponseEntity<String> shopHeartOn(@RequestBody Map<String, String>map){
		log.info("map=>>>>>{},",map);
		int result = shopService.shopHeartOn(map);
		
		if(result>0) {
			return ResponseEntity.ok("찜한 상품은 마음함에서 확인하실 수 있어요");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("다시 시도해주세요.");
		}
	}
	
	@PostMapping("/shopHeartOff")
	public ResponseEntity<String> shopHeartOff(@RequestBody Map<String, String>map){
		log.info("map=>>>>>{},",map);
		int result = shopService.shopHeartOff(map);
		
		if(result>0) {
			return ResponseEntity.ok("찜한 목록에서 삭제되었습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("다시 시도해주세요.");
		}
	}
	
	@PostMapping("/productCareInfo")
	public ResponseEntity<Object> productCareInfo(@RequestBody Map<String, String>map){
		long userNo = Long.parseLong(map.get("userNo"));
		log.info("userNo={}",userNo);
		List<Product> product = new ArrayList();
		List<String> productImg = new ArrayList();
		product = shopService.productCareInfo(userNo);

		Map<String, Object> productMap = new HashMap();
		
		if(product!=null) {
			for(int i = 0; i<product.size();i++) {
				String productNo = product.get(i).getProductNo();
				productImg = shopService.productInfoImg(productNo);
				
				
				List<String> productPath = new ArrayList();
				for(int j = 0; j<productImg.size(); j++) {
					log.info(productImg.get(j));
					productPath.add("http://localhost:8083/dasony/resources/images/product/"+productImg.get(j));
				}
				product.get(i).setProductImg(productPath);
				productMap.put("product", product);
				
			}
			log.info("productMap{}", productMap);
			return ResponseEntity.ok(productMap);
			
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("다시 시도해주세요.");
		}
		
	}
	
	@PostMapping("/couponBuy")
	public void couponBuy(@RequestBody Map<String, Object>map) {
		Map<String, Object> productData = (Map<String, Object>) map.get("product");

		Product product = new Product();
		product.setProductNo((String) productData.get("productNo"));
		product.setShopOkey((String) productData.get("shopOkey"));
		product.setProductName((String) productData.get("productName"));
		product.setProductAmount((Integer) productData.get("productAmount"));
		product.setProductImg((List) productData.get("productImg"));
		product.setShopCate((String) productData.get("shopCate"));
		product.setShopName((String) productData.get("shopName"));
		
		LocalDate today = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = today.format(formatter);

		Point point = Point.builder()
			.userNo(Long.parseLong((String) map.get("userNo")))
			.pointContent(product.getProductName()+"을 구매")
			.pointAmount(product.getProductAmount())
			.ExpireDate("N")
			.pointEventDate(String.valueOf(formattedDate))
			.pointCate("S")
			.build();

		int pointResult = PointController.spendPoint(point);
		
		
		Coupon coupon = Coupon.builder()
								.couponName(product.getProductName())
								.userNo((String)map.get("userNo"))
								.productNo(product.getProductNo())
								.build();
		int result = shopService.couponBuy(coupon);
		
		if(pointResult+result!=4) {
			log.info("므ㅜㄴ제 ㅇㅆ어..");
		} else {
			log.info("굿굿");
		}
	}
	
	@PostMapping("/couponList")
	public ResponseEntity<Map<String, Object>> couponList(@RequestBody Map<String, String>map){
		List<Coupon> couponList = new ArrayList();
		couponList = shopService.couponList(map);
		
		List<Product> product = new ArrayList();
		
		product = shopService.productInfo(null, null, null);
		
		List<String> productImg = new ArrayList();
		
		Map<String, Object> productMap = new HashMap();
		
		for(int i = 0; i<product.size();i++) {
			String productNo = product.get(i).getProductNo();
			productImg = shopService.productInfoImg(productNo);
			
			List<String> productPath = new ArrayList();
			
			for(int j = 0; j<productImg.size(); j++) {
				productPath.add("http://localhost:8083/dasony/resources/images/product/"+productImg.get(j));
			}
			product.get(i).setProductImg(productPath);
			productMap.put("product", product);
			
		}
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("productMap", productMap);
		resultMap.put("couponList", couponList);
		log.info("couponList={}", couponList);
		log.info("productMap={},==>>>>>>>>>>", productMap);
		return ResponseEntity.ok(resultMap);
	}
	
	@PostMapping("/productBestInfo")
	public ResponseEntity<Object> productBestInfo(@RequestBody Map<String, String>map){
		String userRegion = map.get("userRegion");
		List<Product> product = new ArrayList();
		product = shopService.productBestInfo(userRegion);
		List<String> productImg = new ArrayList();
		Map<String, Object> productMap = new HashMap();
		log.info("userRegion:",userRegion);
		for(int i = 0; i<product.size();i++) {
			String productNo = product.get(i).getProductNo();
			productImg = shopService.productInfoImg(productNo);
			
			
			List<String> productPath = new ArrayList();
			for(int j = 0; j<productImg.size(); j++) {
				log.info(productImg.get(j));
				productPath.add("http://localhost:8083/dasony/resources/images/product/"+productImg.get(j));
			}
			product.get(i).setProductImg(productPath);
			productMap.put("product", product);
			
		}
		log.info("product={},==>>>>>>>>>>", product);
			return ResponseEntity.ok(productMap);
	}

	

	
}
