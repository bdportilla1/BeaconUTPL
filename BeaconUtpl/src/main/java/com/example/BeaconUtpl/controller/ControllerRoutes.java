package com.example.BeaconUtpl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;



	@Controller
	public class ControllerRoutes {
		@RequestMapping("/")
		public String home() {
			return "index";
		}

		@GetMapping("/createUser")
		public String homae() {
			return "index";
		}


}


