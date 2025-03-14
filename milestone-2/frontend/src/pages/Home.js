import React, { useState, useEffect, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Paper,
  Button,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { getPlayersTable } from "../services/api";

const Home = () => {
  const [playerSearch, setPlayerSearch] = useState("");
  const [posFilter, setPosFilter] = useState("");
  const [orderByCol, setOrderByCol] = useState("fantasy");
  const [dir, setDir] = useState("desc");
  const [playerdata, setPlayerData] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchPlayerTable = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPlayersTable(
        playerSearch,
        posFilter,
        orderByCol,
        dir
      );

      if (response.success) {
        setPlayerData(response.players || []);
      } else {
        setPlayerData([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [playerSearch, posFilter, orderByCol, dir]);

  useEffect(() => {
    fetchPlayerTable();
  }, [fetchPlayerTable, playerSearch, posFilter, orderByCol, dir]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to FantasyBasketball++ ᕙ(▀̿ĺ̯▀̿ ̿)ᕗ
      </Typography>

      {playerdata.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">No players.</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.light" }}>
                <TableCell>Name</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Position</TableCell>
                <TableCell align="right">MP</TableCell>
                <TableCell align="right">FGM</TableCell>
                <TableCell align="right">3PM</TableCell>
                <TableCell align="right">RPG</TableCell>
                <TableCell align="right">APG</TableCell>
                <TableCell align="right">SPG</TableCell>
                <TableCell align="right">BPG</TableCell>
                <TableCell align="right">TOV</TableCell>
                <TableCell align="right">PPG</TableCell>
                <TableCell align="right">Fantasy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playerdata.map((player) => (
                <TableRow key={player.player_id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.team}</TableCell>
                  <TableCell>{player.pos}</TableCell>
                  <TableCell align="right">{player.mp}</TableCell>
                  <TableCell align="right">{player.fg}</TableCell>
                  <TableCell align="right">{player.threept}</TableCell>
                  <TableCell align="right">{player.trb}</TableCell>
                  <TableCell align="right">{player.ast}</TableCell>
                  <TableCell align="right">{player.stl}</TableCell>
                  <TableCell align="right">{player.blk}</TableCell>
                  <TableCell align="right">{player.tov}</TableCell>
                  <TableCell align="right">{player.pts}</TableCell>
                  <TableCell align="right">{player.fantasy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FormatListBulletedIcon
            sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
          />
          <Typography variant="h5" component="h2">
            Manage Your Watchlists
          </Typography>
        </Box>

        <Typography variant="body1">
          Frontend implementation of R8-watchlist.
        </Typography>

        <Typography variant="body1">
          Here is where you can manage your watchlists of basketball players.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/watchlist"
            size="large"
          >
            Go to Watchlists
          </Button>
        </Box>
      </Paper> */}
    </div>
  );
};

export default Home;
