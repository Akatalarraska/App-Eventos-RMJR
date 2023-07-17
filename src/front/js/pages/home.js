import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { ExpandingCards } from "../component/expandingCards";
import "../../styles/home.css";



export const Home = () => {
	const { store, actions } = useContext(Context);
	const [eventos, setEventos] = useState([]);
	

	return (
		<div className="text-center" id="principal">
			<h1 className="mt-6">IBENTO</h1>
			<p> "Bring Your Event Vision to Life: Unlock Endless Possibilities"</p>
			<div id="carouselExampleIndicators" className="carousel slide">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src="https://swissrents.com/wp-content/uploads/2022/08/Sala-de-reuniones-1-1.jpg" className="d-block w-100 slider-image" alt="Slider Image" />
					</div>
					<div className="carousel-item">
						<img src="https://cdn.papershift.com/20220926102759/Team-building.jpeg" className="d-block w-100 slider-image" alt="Slider Image" />
					</div>
					<div className="carousel-item">
						<img src="https://www.elconfidencialdigital.com/media/elconfidencialdigital/images/2018/12/27/2018122712353083998.jpg" className="d-block w-100 slider-image" alt="Slider Image" />
					</div>
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>

			<hr className="featurette-divider mt-5 mb-5" />

		
			<h1 className="mt-5 mb-5">PLAN, CREATE, PROMOTE AND EXECUTE EVENTS</h1>

			<div className="container marketing mb-5">
				<div className="row">
					<div className="col-lg-4" style={{ backgroundColor: 'var(--bs-secondary-color)' }}>
						<img className="bd-placeholder-img rounded-circle" width="240" height="240" src="https://media.discordapp.net/attachments/1098506224703635488/1120423175319203950/a48010cd-daa7-4fce-8165-43bee2fd1192.jpg?width=577&height=577" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"/>
						<h2 className="fw-normal">Manage your events easily and directly.</h2>
						<p className="hidden-text">Streamline event management with our intuitive platform, making it easy and efficient to organize and coordinate all your events.</p>
					</div>
						<div className="col-lg-4" style={{ backgroundColor: 'var(--bs-secondary-color)' }}>
						<img className="bd-placeholder-img rounded-circle" width="240" height="240" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false" src="https://media.discordapp.net/attachments/1098506224703635488/1120429161543118928/b0a0a45a-6629-4c22-a0f9-3e879b6111bd.jpg?width=577&height=577"/>
						<h2 className="fw-normal">Transform your corporate events into unique experiences.</h2>
					<p className="hidden-text">Elevate your business events into unforgettable experiences, creating meaningful connections and leaving a lasting impact on attendees.</p>
					</div>
					<div className="col-lg-4" style={{ backgroundColor: 'var(--bs-secondary-color)' }}>
						<img className="bd-placeholder-img rounded-circle" width="240" height="240" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false" src="https://media.discordapp.net/attachments/1098506224703635488/1120427093788991629/df7ff3fd-367e-48cb-9dc4-a8fffae8e75b.jpg?width=577&height=577"/>
						<h2 className="fw-normal">Elevate your brand with world-class events exclusively designed for you.</h2>
						<p className="hidden-text">Boost your brand's visibility and reputation with meticulously crafted events that showcase your unique identity and captivate your target audience.</p>
					</div>
				</div>
			</div>


				<hr className="featurette-divider mt-5 mb-5" />

				<h1 className="mt-5">Types of Events and Services</h1>

				<section className="mt-5 mb-5">
					<img src="https://www.rwlasvegas.com/wp-content/uploads/2022/05/crockfords-las-vegas-standard-deluxe-bedroom_1000x880.jpg" alt="Hoteles"/>
					<img src="https://eventosempresa.fosburycafe.es/wp-content/uploads/2021/05/P1000415.jpg" data-text="Restaurantes..."/>
					<img src="https://premiumcartransfers.com/wp-content/uploads/2016/05/transfers-eventos-chofer.jpg"data-text="Transfers"/>
					<img src="https://i0.wp.com/sonria.com/wp-content/uploads/2020/10/11Curso1.jpg?fit=960%2C640&ssl=1" data-text="Salas"/>
					<img src="https://us.123rf.com/450wm/sonjachnyj/sonjachnyj1705/sonjachnyj170500628/78906332-deliciosa-mesa-de-frutas-en-la-recepci%C3%B3n-de-la-boda-catering-de-lujo-en-el-restaurante.jpg" data-text="Caterings"/>
					<img src="https://provinciadealicante.es/wp-content/uploads/2021/12/sala-conciertos-alicante.jpg" data-text="Concerts"/>
					<img src="https://impulsapopular.com/wp-content/uploads/2020/01/4624-Lanzamiento-de-productos-qu%C3%A9-elementos-tener-en-cuenta.jpg" data-text="Lanzamientos de producto"/>
				</section>

				<hr className="featurette-divider mt-5 mb-5" />

				<h1 id="event"> Events</h1>

				<ExpandingCards eventos={eventos} />
				
				<hr className="featurette-divider mt-5 mb-5" />

				
			

			<a href="#" className="back-to-top">
				<i className="fa-solid fa-arrows-up-to-line"></i>
			</a>
		</div>
	);
};
