import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { expect } from "./conf";

import { Todo } from "../src/components/todo";

describe('<Todo/>', () => {
  var wrapper: ShallowWrapper;
  var testProps = {id: 'test-todo-id', title: 'Test todo title', done: false};

  before((done) => {
    wrapper = shallow(<Todo {...testProps}/>);
    done();
  });

  it('renders a todo item title', (done) => {
    expect(wrapper.find('h4')).to.have.text(testProps.title);
    done();
  });
});
