import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchTeamsByID } from "../store/teams/action";
import { ToastContainer } from "react-toastify";

import Error from "../components/Error";
import Loading from "../components/Loading";
import MapContent from "../components/MapContent";
import NoDataFound from "../components/NoDataFound";
import { useParams } from "react-router";

function Detail() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { loading, teamDetail, errors } = useSelector((state) => state.teams);

	useEffect(() => {
		const searchParams = new URLSearchParams({ id });

		dispatch(fetchTeamsByID(searchParams.toString()));
	}, [dispatch, id]);

	if (errors) {
		return <Error />;
	}

	if (!teamDetail) {
		return <NoDataFound />;
	}

	return (
		<>
			{loading || !teamDetail[0] ? (
				<Loading />
			) : (
				<div className="container mx-auto text-center shadow-xl m-10">
					<ToastContainer />
					<div
						className="flex items-center bg-cover card bg-base-200 m-10"
						style={{
							backgroundImage: `url(${teamDetail[0].strStadiumThumb})`,
						}}
					>
						<div
							className="card glass lg:card-side text-neutral-content m-10"
							style={{ backgroundColor: "#150050" }}
						>
							<div>
								<figure className="p-6">
									<img
										alt="No Data"
										src={teamDetail[0].strTeamBadge}
										className="rounded-lg shadow-2xl"
									/>
									<div className="mt-5">
										<div className="mt-4">
											<p
												className="text-3xl font-bold"
												style={{ color: "#FF5C58" }}
											>
												Stadium Name:
											</p>
											<p className="text-2xl italic">
												{teamDetail[0].strStadium}
											</p>
										</div>
										<div className="mt-4">
											<p
												className="text-3xl font-bold"
												style={{ color: "#FF5C58" }}
											>
												Stadium Location:
											</p>
											<p className="text-2xl italic">
												{teamDetail[0].strStadiumLocation}
											</p>
										</div>
										<div className="mt-4">
											<p
												className="text-3xl font-bold"
												style={{ color: "#FF5C58" }}
											>
												Stadium Capacity:
											</p>
											<p className="text-2xl italic">
												{teamDetail[0].intStadiumCapacity}
											</p>
										</div>
									</div>
									<div
										className="items-center m-10"
										style={{
											height: "512px",
											width: "512px",
											borderWidth: 2,
											borderRadius: 10,
										}}
									>
										<MapContent />
									</div>
								</figure>
							</div>
							<div
								className="card-body items-center text-center m-10 overflow-auto"
								style={{ maxHeight: "1500px" }}
							>
								<h2
									className="text-3xl font-bold mb-2"
									style={{ color: "#FF5C58" }}
								>
									{teamDetail[0].strTeam}
								</h2>
								<p className="text-2xl italic">
									{teamDetail[0].strDescriptionEN}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Detail;
