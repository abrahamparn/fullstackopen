import React from "react";
import { filterChange } from "../../reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";

export default function VisibilityFilter() {
  const selectedFilter = useSelector(({ filter }) => filter);
  console.log(selectedFilter);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="radio"
        name="filter"
        checked={selectedFilter === "ALL"}
        onChange={() => dispatch(filterChange("ALL"))}
      />
      all{" "}
      <input
        type="radio"
        name="filter"
        checked={selectedFilter === "IMPORTANT"}
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      important{" "}
      <input
        type="radio"
        name="filter"
        checked={selectedFilter === "NONIMPORTANT"}
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      />
      nonimportante
    </div>
  );
}
