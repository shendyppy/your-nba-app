import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setFavorite } from "../store/favorites/action";

function TeamCard({ team, favorite }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);

  const goToDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  const addToFavorite = (payload) => {
    if (favorites.filter((el) => el.idTeam === payload.idTeam).length === 0) {
      dispatch(setFavorite(payload));
      toast.success("You have successfully added favorite!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Already in your favorite!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (team) {
    return (
      <>
        <div
          class="card text-center shadow-2xl m-3"
          style={{ borderWidth: 2, borderColor: "#150050" }}
        >
          <ToastContainer />
          <figure class="px-10 pt-10">
            <img
              src={team.strTeamBadge}
              alt="No Data"
              class="rounded-xl"
              style={{ minHeight: "100%" }}
            />
          </figure>
          <div class="card-body">
            <h2 class="text-3xl font-bold mb-2">{team.strTeam}</h2>
            <p class="text-2xl">{team.strStadium}</p>
            <div class="justify-center card-actions">
              <button
                class="btn btn-outline"
                style={{ backgroundColor: "#150050", width: "200px" }}
                onClick={(e) => {
                  e.preventDefault();
                  addToFavorite(team);
                }}
              >
                <p class="text-xl" style={{ color: "#FF5C58" }}>
                  Add to Favorites
                </p>
              </button>
              <button
                class="btn btn-outline"
                style={{ backgroundColor: "#150050", width: "200px" }}
                onClick={(e) => {
                  e.preventDefault();
                  goToDetail(team.idTeam);
                }}
              >
                <p class="text-xl" style={{ color: "#FF5C58" }}>
                  More Info
                </p>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (favorite) {
    return (
      <>
        <div
          class="card text-center shadow-2xl m-3"
          style={{ borderWidth: 2, borderColor: "#150050" }}
        >
          <ToastContainer />
          <figure class="px-10 pt-10">
            <img
              src={favorite.strTeamBadge}
              alt="No Data"
              class="rounded-xl"
              style={{ minHeight: "100%" }}
            />
          </figure>
          <div class="card-body">
            <h2 class="text-3xl font-bold mb-2">{favorite.strTeam}</h2>
            <p class="text-2xl">{favorite.strStadium}</p>
            <div class="justify-center card-actions">
              <button
                class="btn btn-outline"
                style={{ backgroundColor: "#150050", width: "200px" }}
                onClick={(e) => {
                  e.preventDefault();
                  goToDetail(favorite.idTeam);
                }}
              >
                <p class="text-xl" style={{ color: "#FF5C58" }}>
                  More Info
                </p>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TeamCard;
