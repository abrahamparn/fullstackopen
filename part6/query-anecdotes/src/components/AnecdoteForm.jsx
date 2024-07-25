import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../../request";
import { useNotificationDispatch } from "../utils/NotificationContext";
import Notification from "./Notification";
import { useNotification } from "../utils/NotificationContext";
const AnecdoteForm = () => {
  const { setNotification } = useNotification();
  const queryClient = useQueryClient();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log(content);
    newAnecdoteMutation.mutate({ content: content, votes: 0 });
    setNotification(`${content} has been added`);
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      console.log("hai");
      const anecdote = queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });
      console.log(anecdote);
      queryClient.setQueryData(
        { queryKey: ["anecdotes"] },
        anecdote.concat(newAnecdote)
      );
    },
  });

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
