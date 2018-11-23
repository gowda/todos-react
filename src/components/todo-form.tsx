import * as React from "react";

interface DefaultProps {
  title: string;
  error: string;
}

export type TodoFormProps = {
  onChange: (title: string) => void;
  onSubmit: () => void;
} & Partial<DefaultProps>;

export class TodoForm extends React.Component<TodoFormProps> {
  static defaultProps: DefaultProps = {
    title: '',
    error: null
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
    var error = null;
    if (this.props.error) {
      error =
        <div className="row">
          <div className="col">
            <span className="text-danger">{this.props.error}</span>
          </div>
        </div>;
    }

    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <form
                className="form-inline mx-auto"
                onSubmit={this.handleSubmit}>
                <div className="form-group mx-sm-3 mb-2">
                  <input
                    className="form-control"
                    placeholder="What's pending?"
                    value={this.props.title}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <button
                  type="submit"
                  className="btn btn-sm btn-primary mb-2">
                  Add
                </button>
              </form>
            </div>
          </div>
          {error}
        </div>
      </div>
    );
  };
}
