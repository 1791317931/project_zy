package com.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.util.ImageUtils;

@RequestMapping(value = "/upload")
@Controller
public class UploadController {
	
	private static String UPLOAD_PATH = "upload/img/";
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
	
	public static String[] getAccepts(String accept) {
		accept = accept.toLowerCase().replace(" ", "").replace("image/", "");
		return accept.split(",");
	}
	
	// 判断文件后缀是否合法
	public static boolean suffixIsValid(String suffix, String accepts[]) {
		for(String type : accepts) {
			if(type.equals(suffix)) {
				return true;
			}
		}
		return false;
	}
	
	public static Map<String, Object> fileTypeIsValid(MultipartFile file,
			@RequestParam(defaultValue = "image/jpg,image/jpeg,image/png", required = false) String accept) {
		
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
		String imgType = ImageUtils.getType(file);
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
		String head = ImageUtils.getHeader(file);
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
		
		result.put("success", true);
		
		return result;
	}
	
	@RequestMapping(value = "/check", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> checkImageType(MultipartFile file, 
			@RequestParam(required = false, defaultValue = "image/jpg,image/png,image/jpeg") String accept) {
		
		return fileTypeIsValid(file, accept);
	}
	
	/**
	 * @param file
	 * @param resize		是否缩放	默认true,此时不能上传bmp图片或者被P过的图片
	 * @param cut			是否裁剪	默认true,此时不能上传bmp图片或者被P过的图片
	 * @param accept		input框可接受文件类型
	 * @param fw			图片缩放后宽度
	 * @param fh			图片缩放后高度
	 * @param x				裁剪起始x
	 * @param y				裁剪起始y
	 * @param w				裁剪宽度
	 * @param h				裁剪高度
	 * @return
	 */
	@RequestMapping(value = "/save_cut", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> upload(HttpServletRequest request, MultipartFile file,
			@RequestParam(required = true, defaultValue = "true") boolean resize,
			@RequestParam(required = true, defaultValue = "true") boolean cut,
			@RequestParam(required = false, defaultValue = "image/jpg,image/png,image/jpeg") String accept,
			int fw, int fh, int x, int y, int w, int h) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		// 保存路径
		String savePath = request.getServletContext().getRealPath("/") + UPLOAD_PATH;
		// 文件名
		String fileName = UUID.randomUUID() + "";
		
		Map<String, Object> map = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		if(StringUtils.isEmpty(savePath)) {
			success = false;
			msg = "图片保存路径不能为空";
		}
		if(StringUtils.isEmpty(fileName)) {
			success = false;
			msg = "图片保存名称不能为空";
		}
		if(!success) {
			map.put("success", success);
			map.put("msg", msg);
			return map;
		}
		
		result = fileTypeIsValid(file, accept);
		boolean valid = (boolean) result.get("success");
		
		// 校验文件类型是否合法
		if (valid) {
			// 1、首先上传图片
			Map<String, Object> fileMap = ImageUtils.uploadFile(file, savePath, UPLOAD_PATH, fileName, fw, fh);
			
			// 2、校验已经上传图片是否合法：P过的图片保存为jpg格式时，默认的模式是CMYK模式（注意，这是给印刷机用的）。在图像-->模式中改为RGB模式才是显示器用的
			boolean isRGB = ImageUtils.isRGB((String) fileMap.get("fullPath"));
			
			if(!isRGB) {
				map.put("success", false);
				map.put("msg", NOT_RGB);
			} else {
				// 3、缩放
				if(resize) {
					ImageUtils.getImgResizePath(fileMap, fw, fh);
				}
				
				// 4、裁剪
				if(cut) {
					ImageUtils.getImgCutPath(fileMap, x, y, w, h);
				}
				
				String finalPath = savePath + fileName + "." + fileMap.get("type");
				ImageUtils.copyFile(fileMap.get("fullPath") + "", finalPath);
				// delFolder(system_physical_path + savePath + fileName);
				
				map.put("success", success);
				map.put("imgPath", UPLOAD_PATH + fileName + "." + fileMap.get("type"));
			}
		} else {
			map.put("success", false);
			map.put("msg", result.get("msg"));
		}
		
		return map;
	}
	
	/**
	 * 从服务器获取图片并处理
	 * @param imgPath		图片在服务器的物理路径
	 * @param resizable		是否裁剪
 	 * @param cutable		是否裁剪
	 * @param accept		input框可接受文件类型
	 * @param fw			文件最终宽度
	 * @param fh			文件最终高度
	 * @param x				文件截取x
	 * @param y				文件截取y
	 * @param w				文件截取宽度
	 * @param h				文件截取高度
	 * @return
	 */
	@RequestMapping(value = "/save_cut_from_server", method = RequestMethod.POST)	
	@ResponseBody
	public Map<String, Object> cutAndSaveFromServer(HttpServletRequest request, String imgPath,
			int fw, int fh, int x, int y, int w, int h,
			@RequestParam(required = true, defaultValue = "true") boolean resizable,
			@RequestParam(required = true, defaultValue = "true") boolean cutable,
			@RequestParam(defaultValue = "image/jpg,image/jpeg,image/png", required = false) String accept) throws Exception {
		
		String basePath = UPLOAD_PATH;
		String realPath = request.getServletContext().getRealPath("/");
		// 保存路径
		String savePath = realPath + basePath;
		// 文件名
		String fileName = UUID.randomUUID() + "";
		
		Map<String, Object> map = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		String imgUrl = realPath + imgPath;
		
		if(StringUtils.isEmpty(imgPath)) {
			success = false;
			msg = "图片路径不能为空";
		}
		if(StringUtils.isEmpty(savePath)) {
			success = false;
			msg = "图片保存路径不能为空";
		}
		if(StringUtils.isEmpty(fileName)) {
			success = false;
			msg = "图片保存名称不能为空";
		}
		// 判断图片是否存在，比如数据迁移时可能数据存在，但图片不存在
		try {
			if(!new File(imgUrl).exists()) {
				success = false;
				msg = "服务器不存在该图片";
			}
		} catch (Exception e) {
			success = false;
			msg = "服务器不存在该图片";
		}
		
		if(!success) {
			map.put("success", success);
			map.put("msg", msg);
			return map;
		}
		
		try {
			File directory = new File(savePath);
			// 如果没有文件目录，创建目录
			if(!directory.exists()) {
				directory.mkdirs();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Map<String, Object> fileMap = new HashMap<String, Object>();
		fileMap.put("savePath", savePath);
		fileMap.put("fileName", fileName);
		fileMap.put("fullPath", realPath + imgPath);
		
		// 缩放
		if(resizable) {
			ImageUtils.getImgResizePath(fileMap, fw, fh);
		}
		
		// 裁剪
		if(cutable) {
			ImageUtils.getImgCutPath(fileMap, x, y, w, h);
		}
		
		String finalPath = savePath + fileName + "." + fileMap.get("type");
		ImageUtils.copyFile(fileMap.get("fullPath") + "", finalPath);
		// delFolder(system_physical_path + savePath + fileName);
		
		map.put("success", success);
		map.put("imgPath", UPLOAD_PATH + fileName + "." + fileMap.get("type"));
		
		return map;
	}
	
}