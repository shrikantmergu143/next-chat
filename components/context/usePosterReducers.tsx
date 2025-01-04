import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Create memoized selector
const selectPosterReducers = createSelector(
  (state) => state?.allReducers,
  (allReducers) => ({
    ...allReducers,
  })
);

export const usePosterReducers = () => {
  return useSelector(selectPosterReducers);
};
export default usePosterReducers;