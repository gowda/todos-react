import * as React from "react";
import { shallow, ShallowWrapper, mount, ReactWrapper } from "enzyme";

import { expect } from "./conf";
import { mock, instance, verify, resetCalls, reset } from "ts-mockito";

import { TodoForm, TodoFormProps } from "../src/components/todo-form";

class TestTodoFormProps implements TodoFormProps {
  onSubmit() {
    true;
  }

  onChange(title: string) {
    true;
  }
}

describe('<TodoForm/>', () => {
  var wrapper: ShallowWrapper;
  var mockedTodoFormProps: TodoFormProps;
  var testProps: TodoFormProps;

  before((done) => {
    mockedTodoFormProps = mock(TestTodoFormProps);
    done();
  });

  describe("with only callbacks in props", () => {
    before((done) => {
      mockedTodoFormProps = mock(TestTodoFormProps);
      testProps = instance(mockedTodoFormProps);
      wrapper = shallow(<TodoForm {...testProps}/>);
      done();
    });

    it('renders a text input field', (done) => {
      expect(wrapper).to.have.descendants('input');
      done();
    });

    it('renders a button', (done) => {
      expect(wrapper).to.have.descendants('button');
      done();
    });
  });

  describe('with title in props', () => {
    var testTitle = 'Test todo title';
    before((done) => {
      mockedTodoFormProps = mock(TestTodoFormProps);
      testProps = instance(mockedTodoFormProps);
      testProps.title = testTitle;
      wrapper = shallow(<TodoForm {...testProps}/>);
      done();
    });

    it('shows given title', (done) => {
      expect(wrapper.find('input')).to.have.value(testTitle);
      done();
    });
  });

  describe('error message', () => {
    describe('when null', () => {
      before((done) => {
        mockedTodoFormProps = mock(TestTodoFormProps);
        testProps = instance(mockedTodoFormProps);
        wrapper = shallow(<TodoForm {...testProps}/>);
        done();
      });

      it('does not show', (done) => {
        expect(wrapper).to.not.have.descendants('span.text-danger');
        done();
      });
    });

    describe('when blank', () => {
      before((done) => {
        mockedTodoFormProps = mock(TestTodoFormProps);
        testProps = instance(mockedTodoFormProps);
        testProps.error = '';
        wrapper = shallow(<TodoForm {...testProps}/>);
        done();
      });

      it('does not show', (done) => {
        expect(wrapper).to.not.have.descendants('span.text-danger');
        done();
      });
    });

    describe('when present', () => {
      var errorMessage = 'Test todo error message';
      before((done) => {
        mockedTodoFormProps = mock(TestTodoFormProps);
        testProps = instance(mockedTodoFormProps);
        testProps.error = errorMessage;
        wrapper = shallow(<TodoForm {...testProps}/>);
        done();
      });

      it('shows error', (done) => {
        expect(wrapper).to.have.descendants('span.text-danger');
        expect(wrapper.find('span.text-danger')).to.have.text(errorMessage);
        done();
      });
    })
  });

  describe('change', () => {
    var changedTitle = 'Test todo changed title';

    before((done) => {
      mockedTodoFormProps = mock(TestTodoFormProps);
      testProps = instance(mockedTodoFormProps);
      wrapper = shallow(<TodoForm {...testProps}/>);
      done();
    });

    after((done) => {
      resetCalls(mockedTodoFormProps);
      done();
    });

    it('callback called with changed value', (done) => {
      var inputWrapper = wrapper.find('input');

      inputWrapper.simulate("change", { target: { value: changedTitle } });

      verify(mockedTodoFormProps.onChange(changedTitle)).once();
      done();
    });
  });

  describe('submit', () => {
    var wrapper: ReactWrapper;
    before((done) => {
      mockedTodoFormProps = mock(TestTodoFormProps);
      testProps = instance(mockedTodoFormProps);

      // Shallow render is not useful in this scenario. Button does not have
      // an on-click handler, but form has an on-submit hander.
      // https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html says:
      //
      // Even though the name would imply this simulates an actual event,
      // .simulate() will in fact target the component's prop based on the event
      // you give it. For example, .simulate('click') will actually get
      // the onClick prop and call it.
      //
      // Basically, events are not propagated through the DOM
      // https://github.com/airbnb/enzyme/issues/308#issuecomment-215348290
      wrapper = mount(<TodoForm {...testProps}/>);
      done();
    });

    afterEach((done) => {
      resetCalls(mockedTodoFormProps);
      done();
    })

    it('callback called even with empty form', (done) => {
      var formWrapper = wrapper.find('form');

      formWrapper.simulate("submit");

      verify(mockedTodoFormProps.onSubmit()).once();
      done();
    });
  });
});
