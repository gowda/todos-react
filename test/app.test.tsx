import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { expect } from "./conf";

import { App, AppProps } from '../src/components/app';
import { TodoList } from "../src/components/todo-list";
import { TodoForm } from "../src/components/todo-form";

describe('<App/>', () => {
  describe('when props have an empty list', () => {
    var wrapper: ShallowWrapper;
    before((done) => {
      wrapper = shallow(<App/>);
      done();
    });

    it('does not render todo list', (done) => {
      expect(wrapper).not.to.have.descendants(TodoList);
      done();
    });

    it('renders empty list message', (done) => {
      expect(wrapper).to.include.text('No items to show');
      done();
    });

    it('renders add todo form', (done) => {
      expect(wrapper).to.have.descendants(TodoForm);
      done();
    });

  });

  describe('when props have a non-empty list', () => {
    const testProps: AppProps = {
      items: [
        {id: "-1", title: "title -1", done: false },
        {id: "-2", title: "title -2", done: false },
        {id: "-3", title: "title -3", done: false },
      ],
      title: '',
      idCounter: 0
    };

    var wrapper: ShallowWrapper;
    before((done) => {
      wrapper = shallow(<App {...testProps}/>);
      done();
    });

    it('renders the list component', (done) => {
      expect(wrapper).to.have.descendants(TodoList);
      done();
    });

    it('does not render empty list message', (done) => {
      expect(wrapper).to.not.include.text('No items to show');
      done();
    });

    it('renders add todo form', (done) => {
      expect(wrapper).to.have.descendants(TodoForm);
      done();
    });
  })
});
