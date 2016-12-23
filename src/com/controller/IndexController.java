/**
 * 
 */
package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author zhangyong
 *
 */
@RequestMapping(value = "/index")
@Controller
public class IndexController {

	@RequestMapping
	public String index() {
		return "/plugins/index";
	}
}