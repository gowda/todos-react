import * as React from "react";

export interface TodoProps {
  id: string,
  title: string;
  done: Boolean;
}

export const Todo = (props: TodoProps) => {
  return <h4>{props.title}</h4>;
};
