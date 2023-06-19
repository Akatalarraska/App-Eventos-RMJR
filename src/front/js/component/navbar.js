import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
	<div>
		<div>
			<figure>
				<div>
					<a href="/">
						<figure>
							<img alt="Navbar logo"  style={{ height: '100px', width: '100px' }} src="https://trello.com/1/cards/6487673b8a84db1e093e494c/attachments/648d75a034e7c5e96de2b244/previews/648d75a034e7c5e96de2b295/download/image.png" />
						</figure>
					</a>
				</div>
			</figure>
		</div>
		<div>
			<nav>
				<div>
					<div>
						<a href="/destinations">Home</a>
					</div>
				</div>
				<div>
					<div>
						<a href="/day-tours">Contact</a>
					</div>
				</div>
				<div>
					<div>
						<a href="/about">Private Area</a>
					</div>
				</div>
				<div>
					<div>
						<a href="/contact">Sign Up / Log In</a>
					</div>
				</div>
			</nav>
		</div>
	</div>
);
