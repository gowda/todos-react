import * as React from "react";
import { TodoProps } from "./todo";
import { TodoList } from "./todo-list";
import { TodoForm } from "./todo-form";

interface DefaultProps {
  items: TodoProps[];
  title: string;
  id: number;
}

export type AppProps = {} & Partial<DefaultProps>

export class App extends React.Component<AppProps> {
  static defaultProps: DefaultProps = {
    items: [],
    title: '',
    id: 0
  };

  state: AppProps;

  constructor(props: AppProps) {
    super(props);
    this.state = {items: props.items, id: 0, title: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange(title: string) {
    this.setState({...this.state, title: title});
  }

  handleSubmit() {
    var id: number = this.state.id + 1;
    var idString: string = `${this.state.id}`;

    this.setState({
      items: [...this.state.items,
        {id: idString, title: this.state.title, done: false}
      ],
      id: id,
      title: ''
    });
  }

  render() {
    var content = <TodoList items={this.state.items}></TodoList>;
    if (this.state.items.length === 0) {
      content = <h4 className="text-center">No items to show</h4>;
    }

    return (
      <div>
        <div className="row">
          <div className="col-auto mx-auto">
            <TodoForm
              title={this.state.title}
              onChange={this.handleTitleChange}
              onSubmit={this.handleSubmit}>
            </TodoForm>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {content}
          </div>
        </div>
      </div>
    );
  }
}
