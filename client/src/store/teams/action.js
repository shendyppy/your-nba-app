import {
  SET_LOADING,
  SET_TEAMS,
  SET_ERROR,
  SET_TEAM_DETAIL,
  SET_LENGTH,
} from "./actionType";

import nbaAPI from "../../apis/nbaAPI";
import searchingAPI from "../../apis/searchingAPI";
import nbaAPIByID from "../../apis/nbaByIdAPI";

export function setLoading(payload) {
  return { type: SET_LOADING, payload };
}

export function setTeams(payload) {
  return { type: SET_TEAMS, payload };
}

export function setTeamDetail(payload) {
  return { type: SET_TEAM_DETAIL, payload };
}

export function setError(payload) {
  return { type: SET_ERROR, payload };
}

export function setLength(payload) {
  return { type: SET_LENGTH, payload };
}

export function fetchTeams(offset, limit) {
  return async function (dispatch) {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));

      const response = await nbaAPI.get();

      dispatch(setLength(response.data.teams.length));

      dispatch(setTeams(response.data.teams.slice(offset, offset + limit)));
    } catch (err) {
      dispatch(setError(err));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function fetchTeamsByID(id) {
  return async function (dispatch) {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));

      const response = await nbaAPIByID.get(`/lookupteam.php?${id}`);

      dispatch(setTeamDetail(response.data.teams));
    } catch (err) {
      dispatch(setError(err));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function fetchSearchedTeams(payload, offset, limit) {
  return async function (dispatch) {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));

      const response = await searchingAPI.get(`/searchteams.php?${payload}`);

      dispatch(setLength(response.data.teams.length));

      dispatch(setTeams(response.data.teams.slice(offset, offset + limit)));
    } catch (err) {
      dispatch(setError(err));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
