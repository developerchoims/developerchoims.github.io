package com.ds.dasony.shop.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.common.MisunFileUpload;
import com.ds.dasony.shop.model.service.ShopService;
import com.ds.dasony.shop.model.vo.Product;
import com.ds.dasony.shop.model.vo.Shop;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin")
public class AdminShopController {

	private final ShopService shopService;
	@Autowired
	public AdminShopController(ShopService shopService) {
		this.shopService = shopService;
	}
	
	@PostMapping("/shopInfo")
	public ResponseEntity<Shop> shopInfo (@RequestBody Map<String, String>map){
		String shopOkey = map.get("shopOkey");
		Shop shop = shopService.shopInfo(shopOkey);
		log.info("shopOkey={}============>>>",shopOkey);
		log.info("shop={}============>>>",shop);
		
		return ResponseEntity.ok(shop);
	}
	
	@PostMapping("/addProduct")
	public String addProduct(
			HttpServletRequest httpServletRequest,
            @RequestPart(value = "product") Product product) {
		log.info("product: {}=================>>>>>>>>>>///////////", product);
		// 파일 업로드 처리
	    List<Map<String, Object>> uploadedFileName = new ArrayList<>();
	    try {
	    	/*상품 정보 추가*/
	    	int productResult = shopService.addProduct(product);
	    	
	    	/*request변환*/
    		String productNo = shopService.findProductNo(product);
    		log.info("productNo: {}=================>>>>>>>>>>///////////", productNo);
	        uploadedFileName = MisunFileUpload.mulitiFileUpload(httpServletRequest, productNo, "product");
	        log.info("uploadedFileName: {}=================>>>>>>>>>>///////////", uploadedFileName);
	        
	       
	        int imgResult = shopService.addProductImg(uploadedFileName);
	        
	        
	        return "상품 추가 성공";
	        
	    } catch (IOException e) {
	    	
	        e.printStackTrace();
	        return "상품 추가 실패";
	    }
	}
	
	@PostMapping("/productInfo")
	public ResponseEntity<Object> productInfo(@RequestBody Map<String, String>map){
		String shopOkey = map.get("shopOkey");
		String shopCate = map.get("shopCate");
		String userRegion = map.get("userRegion");
		List<Product> product = new ArrayList();
		product = shopService.productInfo(shopOkey, shopCate, userRegion);
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
	
	@PostMapping("/modProduct")
	public String modProduct(
			HttpServletRequest httpServletRequest,
            @RequestPart(value = "product") Product product) {
		log.info("product: {}=================>>>>>>>>>>///////////", product);
		// 파일 수정 처리
	    List<Map<String, Object>> uploadedFileName = new ArrayList<>();
	    try {
	    	/*상품 정보 수정*/
	    	int result = shopService.modProduct(product);
	    	String productNo = product.getProductNo();
	    	/*상품 이미지 정보 삭제 - 이미지 status = 'N'*/
	        int imgDelete = shopService.deleteProductImg(productNo);
	        
	    	/*request 변환*/
	    	uploadedFileName = MisunFileUpload.mulitiFileUpload(httpServletRequest, productNo, "product");
	    	log.info("uploadedFileName: {}=================>>>>>>>>>>///////////", uploadedFileName);
	        /*상품 이미지 업로드*/
	        int imgResult = shopService.addProductImg(uploadedFileName);
	        
	        return "파일 수정 성공했습니다";
	        
    	} catch (IOException e) {
	    
	        return "파일 수정 실패했습니다";
	    }
	}
	
	@DeleteMapping("/productDelete/{productNo}")
	public ResponseEntity<String> productDelete(@PathVariable String productNo ){
		log.info("홧인:{}",productNo);
		int imgResult = shopService.productImgDelete(productNo);
		int result = shopService.productDelete(productNo);
		if(imgResult*result>0) {
			return ResponseEntity.ok("성공적으로 삭제했습니다");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상품 삭제 실패했습니다");
		}
	}
}
