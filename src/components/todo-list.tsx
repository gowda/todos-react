import * as React from "react";
import { TodoProps, Todo } from "./todo";

interface DefaultProps {
  items: TodoProps[];
}

export type TodoListProps = {} & Partial<DefaultProps>

export class TodoList extends React.Component<TodoListProps> {
  static defaultProps: DefaultProps = {
    items: []
  };

  render() {
    var { items } = this.props as DefaultProps;
    var listItems = items.map(item => {
      return (
        <li key={item.id} className="list-group-item">
          <Todo {...item}></Todo>
        </li>
      );
    });

    return (
      <ul className="list-group list-group-flush mt-2 mb-4">
        {listItems}
      </ul>
    );
  }
}
