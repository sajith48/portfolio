import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(async (res) => {
  if (!res.ok) throw new Error('API Error');
  return res.json();
});

const BASE_URL = 'https://alfa-leetcode-api.onrender.com';
const USERNAME = 'SAJITH_24CSR252';

export const useLeetCode = () => {
  const { data: profile, error: profileError } = useSWR(`${BASE_URL}/${USERNAME}`, fetcher, { revalidateOnFocus: false, errorRetryCount: 2 });
  const pDone = profile || profileError;

  const { data: solved, error: solvedError } = useSWR(pDone ? `${BASE_URL}/${USERNAME}/solved` : null, fetcher, { revalidateOnFocus: false, errorRetryCount: 2 });
  const sDone = solved || solvedError;

  const { data: contest, error: contestError } = useSWR(sDone ? `${BASE_URL}/${USERNAME}/contest` : null, fetcher, { revalidateOnFocus: false, errorRetryCount: 2 });
  const cDone = contest || contestError;

  const { data: calendar, error: calendarError } = useSWR(cDone ? `${BASE_URL}/${USERNAME}/calendar` : null, fetcher, { revalidateOnFocus: false, errorRetryCount: 2 });
  const calDone = calendar || calendarError;

  const { data: recent, error: recentError } = useSWR(calDone ? `${BASE_URL}/${USERNAME}/acSubmission` : null, fetcher, { revalidateOnFocus: false, errorRetryCount: 2 });
  const rDone = recent || recentError;

  const { data: badgesData, error: badgesError } = useSWR(rDone ? `${BASE_URL}/${USERNAME}/badges` : null, fetcher, { revalidateOnFocus: false, errorRetryCount: 2 });
  const bDone = badgesData || badgesError;

  return {
    profile,
    solved,
    contest,
    calendar,
    recent: recent?.submission || [],
    badges: badgesData?.badgesCount || 0,
    isLoading: !pDone || !sDone || !cDone || !calDone || !rDone || !bDone,
    isError: profileError, // Only fail if core profile fails
    username: USERNAME,
  };
};
