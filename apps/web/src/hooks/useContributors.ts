import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useContributors() {
	const { isPending, error, data } = useQuery({
		queryKey: ["contributorsData"],
		queryFn: async () => {
			const response = await axios.get("https://api.github.com/repos/nimbusdotstorage/Nimbus/contributors", {
				headers: {
					"User-Agent": "Nimbus",
				},
			});
			return response.data;
		},
	});

	return {
		isPending,
		error,
		data,
	};
}
