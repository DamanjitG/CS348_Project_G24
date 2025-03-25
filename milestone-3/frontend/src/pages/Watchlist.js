import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  CircularProgress,
  Alert,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  getUserWatchlist,
  removeFromWatchlist,
  createWatchlist,
  addToWatchlist,
  getUserWatchlists,
  deleteWatchlist,
  getBestTeam,
} from "../services/api";

const Watchlist = () => {
  // For demonstration/testing purposes
  const username = "user1";
  const [watchlistName, setWatchlistName] = useState("watchlist1");
  const [availableWatchlists, setAvailableWatchlists] = useState([
    "watchlist1",
  ]);

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openAddPlayerDialog, setOpenAddPlayerDialog] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [newPlayerId, setNewPlayerId] = useState("");
  const [bestTeam, setBestTeam] = useState({});

  const fetchWatchlists = useCallback(async () => {
    try {
      const response = await getUserWatchlists(username);

      if (
        response.success &&
        response.watchlists &&
        response.watchlists.length > 0
      ) {
        const watchlistNames = response.watchlists.map((w) => w.watchlist_name);
        setAvailableWatchlists(watchlistNames);

        if (
          !watchlistNames.includes(watchlistName) &&
          watchlistNames.length > 0
        ) {
          setWatchlistName(watchlistNames[0]);
        }
      } else if (
        response.success &&
        (!response.watchlists || response.watchlists.length === 0)
      ) {
        setAvailableWatchlists(["watchlist1"]);
      } else {
        console.error("Failed to fetch watchlists:", response.error);
      }
    } catch (err) {
      console.error("Error fetching watchlists:", err);
    }
  }, [username, watchlistName]);

  const fetchWatchlist = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUserWatchlist(username, watchlistName);

      if (response.success) {
        setWatchlist(response.watchlist || []);
      } else {
        setError(response.error || "Failed to fetch watchlist");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [watchlistName]);

  const fetchBestTeam = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getBestTeam(username, watchlistName);

      if (response.success) {
        setBestTeam(response.bestteam[0] || "no best team");
      } else {
        setError(response.error || "Failed to fetch best team");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [watchlistName]);

  useEffect(() => {
    fetchWatchlists().then(() => {
      fetchWatchlist();
      fetchBestTeam();
    });
  }, [fetchWatchlists, fetchWatchlist, fetchBestTeam]);

  const handleCreateWatchlist = async () => {
    if (!newWatchlistName.trim()) {
      setError("Watchlist name cannot be empty");
      return;
    }

    try {
      const response = await createWatchlist(username, newWatchlistName);

      if (response.success) {
        setAvailableWatchlists((prev) => [...prev, newWatchlistName]);
        setWatchlistName(newWatchlistName);
        setSuccessMessage(`Watchlist "${newWatchlistName}" created`);
        setOpenCreateDialog(false);
        setNewWatchlistName("");
        setTimeout(() => setSuccessMessage(null), 3000);
        fetchWatchlists();
      } else {
        setError(response.error || "Failed to create watchlist");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error(err);
    }
  };

  const handleAddToWatchlist = async () => {
    if (!newPlayerId.trim()) {
      setError("Player ID cannot be empty");
      return;
    }

    try {
      const response = await addToWatchlist(
        username,
        watchlistName,
        newPlayerId
      );

      if (response.success) {
        setSuccessMessage("Player added to watchlist");
        setOpenAddPlayerDialog(false);
        setNewPlayerId("");
        setTimeout(() => setSuccessMessage(null), 3000);
        fetchWatchlist();
        fetchBestTeam();
      } else {
        setError(response.error || "Failed to add player to watchlist");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error(err);
    }
  };

  const handleDeleteWatchlist = async () => {
    try {
      const response = await deleteWatchlist(username, watchlistName);
      if (response.success) {
        setAvailableWatchlists((prev) =>
          prev.filter((name) => name !== watchlistName)
        );
        setSuccessMessage("Watchlist deleted");
        setTimeout(() => setSuccessMessage(null), 3000);
        fetchWatchlists();
      } else {
        setError(response.error || "Failed to delete watchlist");
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error(err);
    }
  };

  const handleRemoveFromWatchlist = async (playerId) => {
    try {
      const response = await removeFromWatchlist(
        username,
        watchlistName,
        playerId
      );

      if (response.success) {
        setWatchlist((prevWatchlist) =>
          prevWatchlist.filter((player) => player.player_id !== playerId)
        );

        setSuccessMessage("Player removed from watchlist");
        fetchBestTeam();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.error || "Failed to remove player from watchlist");
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error(err);
    }
  };

  const handleWatchlistChange = (event) => {
    setWatchlistName(event.target.value);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h4" component="h1">
              Your Watchlists
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="watchlist-select-label">
                Select Watchlist
              </InputLabel>
              <Select
                labelId="watchlist-select-label"
                id="watchlist-select"
                value={watchlistName}
                label="Select Watchlist"
                onChange={handleWatchlistChange}
              >
                {availableWatchlists.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setOpenCreateDialog(true)}
            >
              Create New
            </Button>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => setOpenAddPlayerDialog(true)}
              startIcon={<AddIcon />}
            >
              Add Player
            </Button>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccessMessage(null)}
        >
          {successMessage}
        </Alert>
      )}

      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Best Team for Watchlist: {watchlistName}
      </Typography>

      {bestTeam === "no best team" ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">No regulation team can be constructed from this watchlist.</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          {console.log(bestTeam)}
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.light" }}>
                <TableCell>PG</TableCell>
                <TableCell>Fantasy</TableCell>
                <TableCell>SG</TableCell>
                <TableCell>Fantasy</TableCell>
                <TableCell>SF</TableCell>
                <TableCell>Fantasy</TableCell>
                <TableCell>PF</TableCell>
                <TableCell>Fantasy</TableCell>
                <TableCell>C</TableCell>
                <TableCell>Fantasy</TableCell>
                <TableCell>Total Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{bestTeam.PG}</TableCell>
                <TableCell>{bestTeam.PG_fantasy}</TableCell>
                <TableCell>{bestTeam.SG}</TableCell>
                <TableCell>{bestTeam.SG_fantasy}</TableCell>
                <TableCell>{bestTeam.SF}</TableCell>
                <TableCell>{bestTeam.SF_fantasy}</TableCell>
                <TableCell>{bestTeam.PF}</TableCell>
                <TableCell>{bestTeam.PF_fantasy}</TableCell>
                <TableCell>{bestTeam.C}</TableCell>
                <TableCell>{bestTeam.C_fantasy}</TableCell>
                <TableCell>{bestTeam.total_fantasy}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <br></br>

      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Watchlist: {watchlistName}
        <Button
          variant="outlined"
          color="error"
          size="small"
          sx={{ ml: 2 }}
          onClick={handleDeleteWatchlist}
        >
          Delete Watchlist
        </Button>
      </Typography>

      {watchlist.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">This watchlist is empty.</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.light" }}>
                <TableCell>Name</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Position</TableCell>
                <TableCell align="right">PPG</TableCell>
                <TableCell align="right">APG</TableCell>
                <TableCell align="right">RPG</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {watchlist.map((player) => (
                <TableRow key={player.player_id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.team}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell align="right">{player.points_per_game}</TableCell>
                  <TableCell align="right">{player.assists_per_game}</TableCell>
                  <TableCell align="right">
                    {player.rebounds_per_game}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleRemoveFromWatchlist(player.player_id)
                      }
                      aria-label="remove from watchlist"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>Create New Watchlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Watchlist Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateWatchlist} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAddPlayerDialog}
        onClose={() => setOpenAddPlayerDialog(false)}
      >
        <DialogTitle>Add Player to Watchlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Player ID"
            type="text"
            fullWidth
            variant="outlined"
            value={newPlayerId}
            onChange={(e) => setNewPlayerId(e.target.value)}
            helperText="Enter the player ID to add to this watchlist"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddPlayerDialog(false)}>Cancel</Button>
          <Button onClick={handleAddToWatchlist} variant="contained">
            Add Player
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Watchlist;
