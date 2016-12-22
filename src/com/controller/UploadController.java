package com.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping(value = "/upload")
@Controller
public class UploadController {
	
	private static String JPG_TYPE = "ffd8ffe0/ffd8ffe1";
	private static String JPEG_TYPE = "ffd8ffe0/ffd8ffe1";
	private static String BMP_TYPE = "ffd8ffe0/ffd8ffe1";
	private static String PNG_TYPE = "89504e47";
	private static String GIF_TYPE = "47494638";
	private static String ALL_TYPE = "*";
	private static Map<String, String> imageMap = new HashMap<String, String>();
	static {
		imageMap.put("jpg", JPG_TYPE);
		imageMap.put("jpeg", JPEG_TYPE);
		imageMap.put("bmp", BMP_TYPE);
		imageMap.put("png", PNG_TYPE);
		imageMap.put("gif", GIF_TYPE);
	}
	
	@RequestMapping(value = "/checkImageType")
	@ResponseBody
	public String checkImageType(MultipartFile file, 
			@RequestParam(required = false, defaultValue = "image/jpg,image/png,image/jpeg") String accept) {
		return "1111";
	}
	
}