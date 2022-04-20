import React, { useRef, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull} from "tsparticles"

import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = ({setAuthUser}) => {
	const [loginUser, setLoginUser] = useState({ email: "" });
	const [existDialog, setExistDialog] = useState(false);

	const navigate = useNavigate();

	const particlesInit = async (main) => {
		// console.log(main);

		await loadFull(main);
	};

	const particlesLoaded = (container) => {
		console.log(container)
	}

	const handleInputChange = (event) => {
		const newUser = { ...loginUser };
		newUser[event.target.id] = event.target.value;
		setLoginUser(newUser);
	};

	const existingUserCheck = () => {
		// If your json-server URL is different, please change it below!
		return fetch(`http://localhost:8088/users?email=${loginUser.email}`)
			.then((res) => res.json())
			.then((user) => (user.length ? user[0] : false));
	};

	const handleLogin = (e) => {
		e.preventDefault();

		existingUserCheck().then((exists) => {
			if (exists) {
				// The user id is saved under the key nutshell_user in session Storage. Change below if needed!
				setAuthUser(exists.id)
				navigate("/");
			} else {
				setExistDialog(true);
			}
		});
	};

	return (
		<main className="container--login">
			<dialog className="dialog dialog--auth" open={existDialog}>
				<div>User does not exist</div>
				<button
					className="button--close"
					onClick={(e) => setExistDialog(false)}
				>
					Close
				</button>
			</dialog>
			<section>
				<form className="form--login" onSubmit={handleLogin}>
					{/* <h1>Nutshell</h1> */}
					<h2>Please sign in</h2>
					<fieldset>
						<label htmlFor="inputEmail"> Email address </label>
						<input
							type="email"
							id="email"
							className="form-control"
							placeholder="Email address"
							required
							autoFocus
							value={loginUser.email}
							onChange={handleInputChange}
						/>
					</fieldset>
					<fieldset>
						<button type="submit">Sign in</button>
					</fieldset>
				</form>
			</section>
			<section className="link--register">
				<Link to="/register">Register for an account</Link>
			</section>
			<div>

			<Particles
				id="tsparticles"
				init={particlesInit}
				loaded={particlesLoaded}
				options={{
					
					background: {
					// color: {
					// 	value: "#0d47a1",
					// },
					},
					fpsLimit: 120,
					interactivity: {
					events: {
						onClick: {
						enable: true,
						mode: "push",
						},
						onHover: {
						enable: true,
						mode: "repulse",
						},
						resize: true,
					},
					modes: {
						push: {
						quantity: 4,
						},
						repulse: {
						distance: 200,
						duration: 0.4,
						},
					},
					},
					particles: {
					color: {
						value: "#ffffff",
					},
					links: {
						color: "#ffffff",
						distance: 150,
						enable: true,
						opacity: 0.5,
						width: 1,
					},
					collisions: {
						enable: true,
					},
					move: {
						direction: "none",
						enable: true,
						outModes: {
						default: "bounce",
						},
						random: false,
						speed: 1,
						straight: false,
					},
					number: {
						density: {
						enable: true,
						area: 800,
						},
						value: 80,
					},
					opacity: {
						value: 0.5,
					},
					shape: {
						type: "polygon",
					},
					size: {
						value: { min: 1, max: 1 },
					},
					},
					detectRetina: true,
				}}
    		/>
			</div>
		</main>
	);
};
