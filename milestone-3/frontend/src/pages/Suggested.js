import React, { useState, useEffect, useCallback, useRef } from "react";
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
  InputAdornment,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";

import { getSuggested } from "../services/api";

const Suggested = ({ username }) => {
  // const [playerSearch, setPlayerSearch] = useState("");
  // const [posFilter, setPosFilter] = useState("");
  // const [orderByCol, setOrderByCol] = useState("fantasy");
  // const [dir, setDir] = useState("desc");
  const [playerdata, setPlayerData] = useState([]);

  var temp = "";

  const [loading, setLoading] = useState(true);

  const fetchSuggested = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getSuggested(username);

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
  }, []);

  useEffect(() => {
    fetchSuggested();
  }, [fetchSuggested]);

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
        You may like...
      </Typography>
      {/* <TextField
        autoFocus
        margin="dense"
        label="Find Players"
        type="text"
        fullWidth
        variant="outlined"
        onChange={(e) => {
          temp = e.target.value;
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon
                    onClick={(e) => {
                      console.log(playerSearch);
                      setPlayerSearch(temp);
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      ></TextField> */}
      {/* <FormControl fullWidth margin="dense">
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
      </FormControl> */}

      {playerdata.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">No players.</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.light" }}>
                <TableCell>
                  Name
                  <br></br>
                  {/* {playerSearch !== "" && (
                    <>Current Search Query: {playerSearch}</>
                  )} */}
                </TableCell>
                <TableCell>
                  Team
                  <br></br>
                  {/* {playerSearch !== "" && (
                    <>Current Search Query: {playerSearch}</>
                  )} */}
                </TableCell>
                <TableCell align="right">
                  <>Fantasy Points</>
                  {/* {orderByCol !== "fantasy" && (
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
                  )} */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playerdata.map((player) => (
                <TableRow>
                  <TableCell>{player.label}</TableCell>
                  <TableCell>{player.team}</TableCell>
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

export default Suggested;
