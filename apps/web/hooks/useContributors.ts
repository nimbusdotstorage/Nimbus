import { useQuery } from "@tanstack/react-query";

export default function useContributors() {
	const { isPending, error, data } = useQuery({
		queryKey: ["contributorsData"],
		queryFn: () =>
			fetch("https://api.github.com/repos/nimbusdotstorage/Nimbus/contributors", {
				headers: {
					"User-Agent": "Nimbus",
				},
			}).then(res => res.json()),
	});

	return {
		isPending,
		error,
		data,
	};
}
