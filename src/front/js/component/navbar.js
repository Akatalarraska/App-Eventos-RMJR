import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
	<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
		<a className="navbar-brand" href="/">
			<img
			alt="Navbar logo"
			style={{ height: '80px', width: '150px' }}
			src="https://trello.com/1/cards/6487673b8a84db1e093e494c/attachments/648d75a034e7c5e96de2b244/previews/648d75a034e7c5e96de2b295/download/image.png"
		/>
		</a>
		<button
			className="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNav">
			<ul className="navbar-nav ms-auto">
				<li className="nav-item mx-2">
					<a href="/destinations" className="btn btn-outline-primary">Home</a>
				</li>
				<li className="nav-item mx-2">
					<a href="/day-tours" className="btn btn-outline-primary">Contact</a>
				</li>
				<li className="nav-item mx-2">
					<a href="/about" className="btn btn-outline-primary">Private Area</a>
				</li>
				<li className="nav-item mx-2">
					<button className="btn btn-outline-primary">Sign Up / Log In</button>
				</li>
			</ul>
		</div>
  </nav>
);
