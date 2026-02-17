import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const getSpots = async () => {
    const res = await api.get('/spots');
    return res.data.data;
};

export const getNearbySpots = async (lat, lng) => {
    const res = await api.get('/spots/nearby', { params: { lat, lng } });
    return res.data.data;
};

export const getSpot = async (slug) => {
    const res = await api.get(`/spots/${slug}`);
    return res.data.data;
};

export const recordVisit = async (spotId, userId = null) => {
    const res = await api.post(`/spots/${spotId}/visit`, { user_id: userId });
    return res.data;
};

export const getLeaderboard = async () => {
    const res = await api.get('/leaderboard');
    return res.data.data;
};

export default api;
