package com.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
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
	
	private static String NOT_RGB = "请上传未被处理过的原图";
	private static String JPG = "ffd8ffe0/ffd8ffe1";
	private static String JPEG = "ffd8ffe0/ffd8ffe1";
	private static String BMP = "ffd8ffe0/ffd8ffe1";
	private static String PNG = "89504e47";
	private static String GIF = "47494638";
	private static Map<String, String> imageMap = new HashMap<String, String>();
	static {
		imageMap.put("jpg", JPG);
		imageMap.put("jpeg", JPEG);
		imageMap.put("bmp", BMP);
		imageMap.put("png", PNG);
		imageMap.put("gif", GIF);
	}
	
	// 判断文件后缀是否合法
	private static boolean suffixIsValid(String suffix, String accepts[]) {
		for(String type : accepts) {
			if(type.equals(suffix)) {
				return true;
			}
		}
		return false;
	}
	
	// 获取文件头信息，读取前4个字节--8位
	public static String getHeader(MultipartFile file) {
		byte header[] = new byte[4];
		String imgType = "";
		try {
			int read = file.getInputStream().read(header);
			StringBuilder stringBuilder = new StringBuilder(); 
			
			if(read > 0) {
				if(header == null || header.length <= 0) {      
					return null;
				}      
				for(int i = 0; i < header.length; i++) {      
					int v = header[i] & 0xFF;      
					String hv = Integer.toHexString(v);      
					if(hv.length() < 2) {      
						stringBuilder.append(0);      
					}      
					stringBuilder.append(hv);      
				} 
				// 文件头信息
				imgType = stringBuilder.toString();      
			}
			
		} catch(Exception e) {
			
		}
		
		return imgType.toLowerCase();
	}
	
	/**
	 * 检测图片是否是RGB格式，而不是经过处理后生成的图片
	 * @param url
	 * @return
	 */
	public static boolean isRGB(String url) {
		FileInputStream in = null;
		boolean valid = true;
		try {
			// 构造BufferedImage对象
			File file = new File(url);
			in = new FileInputStream(file);
			byte[] b = new byte[5];
			in.read(b);
			javax.imageio.ImageIO.read(file);
		} catch (IOException e) {
			e.printStackTrace();
			valid = false;
		} finally {
			if(in != null) {
				try {
					in.close();
				} catch(IOException e) {
					valid = false;
				}
			}
		}
		
		return valid;
	}
	
	@RequestMapping(value = "/checkImageType")
	@ResponseBody
	public Map<String, Object> checkImageType(MultipartFile file, 
			@RequestParam(required = false, defaultValue = "image/jpg,image/png,image/jpeg") String accept) {
		
		Map<String, Object> result = new HashMap<String, Object>();
		String errorMsg;
		
		// --------------------首先判断accept是否带*，某些pc上chrome会出现弹出框延迟几秒的现象 begin-------------
		if(accept.indexOf("*") != -1) {
			// 这是给程序猿看的，写专业点
			errorMsg = "accept参数不能包含*，chrome和safari会出现上传延迟";
			result.put("success", false);
			result.put("msg", errorMsg);
			return result;
		}
		// --------------------首先判断accept是否带*，某些pc上chrome会出现弹出框延迟几秒的现象 end-------------
		
		accept = accept.replace(" ", "");
		// [jpg, jpeg, png]
		String accepts[] = getAccepts(accept);
		// jpg、png、jpeg
		String imgType = file.getContentType().split("/")[1].toLowerCase();
		errorMsg = "文件格式只能是[" + accept.replace("image/", "") + "]";
		
		// ---------------------------判断文件后缀 begin------------------------------------
		if(!suffixIsValid(imgType, accepts)) {
			result.put("success", false);
			result.put("msg", errorMsg);
			return result;
		}
		// ---------------------------判断文件后缀 end------------------------------------
		
		// ---------------------------判断文件头 begin-----------------------------------
		/**
		 * 校验伪装的图片
		 * 比如a.txt-->a.jpg、a.png、a.jpeg，通过文件头前8位来对比
		 * 但是a.jpg修改为a.jpeg这种是可以通过的
		 */
		String head = getHeader(file);
		boolean valid = false;
		
		for(String headInfo : accepts) {
			String validHead = imageMap.get(headInfo);
			if(validHead.indexOf(head) != -1) {
				valid = true;
				break;
			}
		}
		
		if(!valid) {
			result.put("success", false);
			result.put("msg", NOT_RGB);
			return result;
		}
		// ---------------------------判断文件头 end-----------------------------------
		
		// ---------------------------检测图片内部格式 begin-----------------------------
		/**
		 * 有些jpg图片是PS生成的，虽然文件头也是jpg格式，但是内部格式不是RGB，也需要校验，否则java文件读取会报错
		 * 如果需要压缩图片，那么必须校验是否是RGB
		 */
		// ---------------------------检测图片内部格式 end-----------------------------
		
		result.put("success", true);
		return result;
	}
	
	/**
	 * @param file
	 * @param compress		是否裁剪	默认true,此时不能上传bmp图片或者被P过的图片
	 * @param accept		input框可接受文件类型
	 * @param finalWidth	图片缩放后宽度
	 * @param finalHeight	图片缩放后高度
	 * @param x				裁剪起始x
	 * @param y				裁剪起始y
	 * @param w				裁剪宽度
	 * @param h				裁剪高度
	 * @return
	 */
	public Map<String, Object> upload(MultipartFile file,
			@RequestParam(required = true, defaultValue = "true") boolean compress,
			@RequestParam(required = false, defaultValue = "image/jpg,image/png,image/jpeg") String accept,
			int finalWidth, int finalHeight, int x, int y, int w, int h) {
		Map<String, Object> result = new HashMap<String, Object>();
		
		// 再校验一次
//		checkImageType(file, accept)
		
		return result;
	}
	
	private static String[] getAccepts(String accept) {
		accept = accept.toLowerCase().replace(" ", "").replace("image/", "");
		return accept.split(",");
	}
	
}