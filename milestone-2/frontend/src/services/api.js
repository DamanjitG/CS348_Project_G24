import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getUserWatchlist = async (username, watchlistName) => {
  try {
    const response = await api.get(`/watchlist/${username}/${watchlistName}`)
    return response.data
  } catch (error) {
    console.error('Error fetching watchlist:', error)
    return { success: false, error: error.message }
  }
}

export const getUserWatchlists = async (username) => {
  try {
    const response = await api.get(`/watchlists/${username}`)
    return response.data
  } catch (error) {
    console.error('Error fetching watchlists:', error)
    return { success: false, error: error.message }
  }
}

export const addToWatchlist = async (username, watchlistName, playerId) => {
  try {
    const response = await api.post('/watchlist/add', {
      username: username,
      watchlist_name: watchlistName,
      player_id: playerId
    })
    return response.data
  } catch (error) {
    console.error('Error adding to watchlist:', error)
    return { success: false, error: error.message }
  }
}

export const removeFromWatchlist = async (username, watchlistName, playerId) => {
  try {
    const response = await api.delete('/watchlist/remove', {
      data: { 
        username: username, 
        watchlist_name: watchlistName, 
        player_id: playerId 
      }
    })
    return response.data
  } catch (error) {
    console.error('Error removing from watchlist:', error)
    return { success: false, error: error.message }
  }
}

export const createWatchlist = async (username, watchlistName) => {
  try {
    const response = await api.post('/watchlist', {
      username: username,
      watchlist_name: watchlistName
    })
    return response.data
  } catch (error) {
    console.error('Error creating watchlist:', error)
    return { success: false, error: error.message }
  }
}

export const deleteWatchlist = async (username, watchlistName) => {
  try {
    const response = await api.delete('/watchlist', {
      data: { 
        username: username, 
        watchlist_name: watchlistName 
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting watchlist:', error)
    return { success: false, error: error.message }
  }
}
