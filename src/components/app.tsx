import * as React from "react";
import { TodoProps } from "./todo";
import { TodoList } from "./todo-list";
import { TodoForm } from "./todo-form";

interface DefaultProps {
  items: TodoProps[];
  title: string;
  idCounter: number;
}

export type AppProps = {} & Partial<DefaultProps>

export class App extends React.Component<AppProps> {
  static defaultProps: DefaultProps = {
    items: [],
    title: '',
    idCounter: 0
  };

  state: AppProps;

  constructor(props: AppProps) {
    super(props);
    this.state = props;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange(title: string) {
    this.setState({...this.state, title: title});
  }

  handleSubmit() {
    var { items, idCounter } = this.state as DefaultProps;
    var id: number = idCounter + 1;
    var idString: string = `${id}`;

    this.setState({
      items: [...items,
        {id: idString, title: this.state.title, done: false}
      ],
      id: id,
      title: ''
    });
  }

  render() {
    var { items, title } = this.state as DefaultProps;
    var content = <TodoList items={items}></TodoList>;
    if (items.length === 0) {
      content = <h4 className="text-center">No items to show</h4>;
    }

    return (
      <div>
        <div className="row">
          <div className="col-auto mx-auto">
            <TodoForm
              title={title}
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
