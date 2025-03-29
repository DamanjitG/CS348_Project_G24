import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

const Navbar = () => {
	const location = useLocation();

	return (
		<AppBar position="static" sx={{ mb: 4 }}>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					component={RouterLink}
					to="/"
				>
					<SportsBasketballIcon />
				</IconButton>

				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					FantasyBasketball++
				</Typography>

				<Button
					color="inherit"
					component={RouterLink}
					to="/"
					sx={{
						mx: 1,
						fontWeight: location.pathname === "/" ? "bold" : "normal",
					}}
				>
					Home
				</Button>

				<Button
					color="inherit"
					component={RouterLink}
					to="/watchlist"
					sx={{
						mx: 1,
						fontWeight: location.pathname === "/watchlist" ? "bold" : "normal",
					}}
				>
					Watchlists
				</Button>
				
				<Button
					color="inherit"
					component={RouterLink}
					to="/custom"
					sx={{
						mx: 1,
						fontWeight: location.pathname === "/custom" ? "bold" : "normal",
					}}
				>
					Custom Player
				</Button>
				<Button
					color="inherit"
					component={RouterLink}
					to="/hotlist"
					sx={{
						mx: 1,
						fontWeight: location.pathname === "/hotlist" ? "bold" : "normal",
					}}
				>
					Hotlist
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
