import * as React from "react";

interface DefaultProps {
  title: string;
}

export type TodoFormProps = {
  error?: string;
  onChange: (title: string) => void;
  onSubmit: () => void;
} & Partial<DefaultProps>;

export class TodoForm extends React.Component<TodoFormProps> {
  static defaultProps: DefaultProps = {
    title: '',
  };

  props: TodoFormProps;

  constructor(props: TodoFormProps) {
    super(props);
    this.props = props;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // https://stackoverflow.com/a/48443771
  handleChange(event: { target: HTMLInputElement}) {
    this.props.onChange(event.target.value);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    this.props.onSubmit();
    e.preventDefault();
  }

  render() {
    var { title, error } = this.props as TodoFormProps;
    var errorNode = null;
    if (error) {
      errorNode =
        <div className="row">
          <div className="col">
            <span className="text-danger">{error}</span>
          </div>
        </div>;
    }

    return (
      <div className="row">
        <div className="col-12">
          <form
            className="form-inline row mt-2 mb-2"
            onSubmit={this.handleSubmit}>
            <div className="form-group col w-50 ml-auto mb-2">
              <input
                className="form-control w-100"
                placeholder="What's pending?"
                value={title}
                onChange={this.handleChange}>
              </input>
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-primary mb-2 col-auto mr-auto px-4">
              Add
            </button>
          </form>
          {errorNode}
        </div>
      </div>
    );
  };
}
