package com.zy.action;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

public class UploadAction extends BaseAction {

	private static final long serialVersionUID = 288832652334614944L;

	private File file;
	private String fileFileName;
	private String fileContentType;
	
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
	
	public File getFile() {
		return file;
	}
	
	public void setFile(File file) {
		this.file = file;
	}
	
	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}
	
	// 检测图片类型是否合法
	public String checkImageType() {
		System.out.println(file + "--" + fileFileName + "--" + fileContentType);
		return null;
	}

	public String upload() {
//		getText("user_image.path")
		
		String servletContextPath = ServletActionContext.getServletContext()
				.getRealPath("/");
		String filePath = getText("image_path");
		/*String src = uploadImage(servletContextPath, filePath,
				fileFileName, file);*/
		
		System.out.println(file + "--" + fileFileName + "--" + fileContentType);
		
		
		/*String form = fileFileName.substring(fileFileName.indexOf(".") - 1);
		Long time = (long) (new Date().getTime() + Math.random() * 1000);
		String imagePath = servletContextPath + filePath + time + form;*/
		/*if (ImageUtil.uploadImage(file, imagePath)) {
			return "/" + filePath + time + form;
		}*/
		return null;
	}
	
	/*public static boolean uploadImage(File file, String filePath) {
		boolean String = false;
		try {
			// 将客户端上传的图片保存到本地服务器
			FileUtils.copyFile(file, new File(filePath));
			flag = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}
	
	public String uploadImage(String servletContextPath, String filePath,
			String fileFileName, File file) {
		String form = fileFileName.substring(fileFileName.indexOf(".") - 1);
		Long time = (long) (new Date().getTime() + Math.random() * 1000);
		String imagePath = servletContextPath + filePath + time + form;
		if (uploadImage(file, imagePath)) {
			return "/" + filePath + time + form;
		}
		return null;
	}*/
	
}