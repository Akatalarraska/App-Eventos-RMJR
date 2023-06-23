import React, { Component } from "react";
import "../../styles/footer.css";


export const Footer = () => (
	<footer className="footer">
		<div className="containerf">
			<div className="row">
				<div className="footer-col">
					<h4>Ibento</h4>
					<ul>
						<li><a href="#">About Us</a></li>
						<li><a href="#">Our services</a></li>
						<li><a href="#">Privacy Policy</a></li>
					</ul>
				</div>

				<div className="footer-col">
					<h4>Get Help</h4>
					<ul>
						<li><a href="#">FAQ</a></li>
						<li><a href="#">Contact</a></li>
						<li><a href="#">Cookies</a></li>
					</ul>
				</div>

				<div className="footer-col">
					<h4>Follow Us</h4>
					<div className="social-links"> 
						<a href="#"><i class="fa-brands fa-facebook"></i></a>
						<a href="#"><i class="fa-brands fa-instagram"></i></a>
						<a href="#"><i class="fa-brands fa-twitter"></i></a>
						<a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
					</div>
				</div>

				<div className="footer-col">
					<h4>Event Advisor</h4>
					<ul>
						<li><a href="https://www.xe.com/">Exchange ratios</a></li>
						<li><a href="https://earth.google.com/web/@-87.92022939,76.77079263,2010.66194106a,218.07571462d,35y,205.69758898h,4.82941663t,0r">World Map</a></li>
						<li><a href="https://www.sanidad.gob.es/profesionales/saludPaises.do">Meteorology</a></li>
						<li><a href="https://www.sanidad.gob.es/profesionales/saludPaises.do">Sanitary situation</a></li>

					</ul>
				</div>

			</div>
		</div>

	</footer>
);
