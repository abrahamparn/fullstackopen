import React from "react";
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

export default function AnecdoteFilter() {
  const dispatch = useDispatch();
  const handleOnchange = (event) => {
    dispatch(filterChange(event.target.value));
  };
  return (
    <div>
      filter <input onChange={handleOnchange} name="filter" />
    </div>
  );
}
