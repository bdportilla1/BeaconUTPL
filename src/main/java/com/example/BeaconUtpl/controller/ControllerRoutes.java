package com.example.BeaconUtpl.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


	@Controller
	public class ControllerRoutes {
		@RequestMapping("/")
		public String home() {
			return "login";
		}

		@RequestMapping("/i")
		public String home2() {
			return "index";
		}
		
		@PostMapping("/ingresar")
		  public String greetingForm(Model model) {
		    model.addAttribute("greeting", "a");
		    return "index";
		  }


}


