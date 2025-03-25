import React, { useState, useEffect, useCallback } from "react";
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Icon,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortIcon from "@mui/icons-material/Sort";

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
  }, [fetchPlayerTable]);

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

      <TextField
        autoFocus
        margin="dense"
        label="Find Players"
        type="text"
        fullWidth
        variant="outlined"
        value={playerSearch}
        onChange={(e) => setPlayerSearch(e.target.value)}
      />
      <FormControl fullWidth margin="dense">
        <InputLabel>Position</InputLabel>
        <Select
          value={posFilter}
          label="Position"
          onChange={(e) => setPosFilter(e.target.value)}
        >
          <MenuItem value={""}>Any</MenuItem>
          <MenuItem value={"PG"}>Point Guard</MenuItem>
          <MenuItem value={"SG"}>Shooting Guard</MenuItem>
          <MenuItem value={"SF"}>Small Forward</MenuItem>
          <MenuItem value={"PF"}>Power Forward</MenuItem>
          <MenuItem value={"C"}>Center</MenuItem>
        </Select>
      </FormControl>

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
                <TableCell align="right">
                  <>FGM</>
                  {orderByCol !== "fg" && (
                    <IconButton
                      onClick={(e) => {
                        setDir("desc");
                        setOrderByCol("fg");
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  )}
                  {orderByCol === "fg" && dir === "desc" && (
                    <IconButton onClick={(e) => setDir("asc")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {orderByCol === "fg" && dir === "asc" && (
                    <IconButton onClick={(e) => setDir("desc")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  <>3PM</>
                  {orderByCol !== "threept" && (
                    <IconButton
                      onClick={(e) => {
                        setDir("desc");
                        setOrderByCol("threept");
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  )}
                  {orderByCol === "threept" && dir === "desc" && (
                    <IconButton onClick={(e) => setDir("asc")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {orderByCol === "threept" && dir === "asc" && (
                    <IconButton onClick={(e) => setDir("desc")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  <>FTM</>
                  {orderByCol !== "ft" && (
                    <IconButton
                      onClick={(e) => {
                        setDir("desc");
                        setOrderByCol("ft");
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  )}
                  {orderByCol === "ft" && dir === "desc" && (
                    <IconButton onClick={(e) => setDir("asc")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {orderByCol === "ft" && dir === "asc" && (
                    <IconButton onClick={(e) => setDir("desc")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  <>RPG</>
                  {orderByCol !== "trb" && (
                    <IconButton
                      onClick={(e) => {
                        setDir("desc");
                        setOrderByCol("trb");
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  )}
                  {orderByCol === "trb" && dir === "desc" && (
                    <IconButton onClick={(e) => setDir("asc")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {orderByCol === "trb" && dir === "asc" && (
                    <IconButton onClick={(e) => setDir("desc")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  <>APG</>
                  {orderByCol !== "ast" && (
                    <IconButton
                      onClick={(e) => {
                        setDir("desc");
                        setOrderByCol("ast");
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  )}
                  {orderByCol === "ast" && dir === "desc" && (
                    <IconButton onClick={(e) => setDir("asc")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {orderByCol === "ast" && dir === "asc" && (
                    <IconButton onClick={(e) => setDir("desc")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  <>SPG</>
                  {orderByCol !== "stl" && (
                    <IconButton
                      onClick={(e) => {
                        setDir("desc");
                        setOrderByCol("stl");
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  )}
                  {orderByCol === "stl" && dir === "desc" && (
                    <IconButton onClick={(e) => setDir("asc")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {orderByCol === "stl" && dir === "asc" && (
                    <IconButton onClick={(e) => setDir("desc")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  <>BPG</>
                  {orderByCol !== "blk" && (
                    <IconButton
                      onClick={(e) => {
                        setDir("desc");
                        setOrderByCol("blk");
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  )}
                  {orderByCol === "blk" && dir === "desc" && (
                    <IconButton onClick={(e) => setDir("asc")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {orderByCol === "blk" && dir === "asc" && (
                    <IconButton onClick={(e) => setDir("desc")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  <>TOV</>
                  {orderByCol !== "tov" && (
                    <IconButton
                      onClick={(e) => {
                        setDir("desc");
                        setOrderByCol("tov");
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  )}
                  {orderByCol === "tov" && dir === "desc" && (
                    <IconButton onClick={(e) => setDir("asc")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {orderByCol === "tov" && dir === "asc" && (
                    <IconButton onClick={(e) => setDir("desc")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  <>PPG</>
                  {orderByCol !== "pts" && (
                    <IconButton
                      onClick={(e) => {
                        setDir("desc");
                        setOrderByCol("pts");
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  )}
                  {orderByCol === "pts" && dir === "desc" && (
                    <IconButton onClick={(e) => setDir("asc")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {orderByCol === "pts" && dir === "asc" && (
                    <IconButton onClick={(e) => setDir("desc")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  <>Fantasy</>
                  {orderByCol !== "fantasy" && (
                    <IconButton
                      onClick={(e) => {
                        setDir("desc");
                        setOrderByCol("fantasy");
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  )}
                  {orderByCol === "fantasy" && dir === "desc" && (
                    <IconButton onClick={(e) => setDir("asc")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                  {orderByCol === "fantasy" && dir === "asc" && (
                    <IconButton onClick={(e) => setDir("desc")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                </TableCell>
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
                  <TableCell align="right">{player.ft}</TableCell>
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
