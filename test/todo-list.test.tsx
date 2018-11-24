import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { expect } from "./conf";

import { Todo, TodoProps } from "../src/components/todo";
import { TodoList } from "../src/components/todo-list";

describe('<TodoList/>', () => {
  describe("with empty list", () => {
    var wrapper: ShallowWrapper;

    before((done) => {
      wrapper = shallow(<TodoList/>);
      done();
    });

    after((done) => {
      wrapper = null;
      done();
    });

    it('does not have any items', (done) => {
      expect(wrapper).to.not.have.descendants(Todo);
      done();
    });
  });

  describe("with list items", () => {
    var todoList: TodoProps[];
    var wrapper: ShallowWrapper;

    before((done) => {
      todoList = [
        {id: "-1", title: "title -1", done: false },
        {id: "-2", title: "title -2", done: false },
        {id: "-3", title: "title -3", done: false },
      ];

      wrapper = shallow(<TodoList items={todoList}/>);
      done();
    });

    after((done) => {
      wrapper = null;
      done();
    });

    it('lists all items', (done) => {
      expect(wrapper.find(Todo)).to.have.lengthOf(todoList.length);
      done();
    });
  });
});
