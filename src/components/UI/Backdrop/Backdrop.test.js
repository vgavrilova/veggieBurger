import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Backdrop from "./Backdrop";

configure({ adapter: new Adapter() });

describe("<Backdrop /> Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Backdrop />);
  });
  it("has a div with backdrop when it is shown", () => {
    wrapper.setProps({ show: true });
    expect(wrapper.containsMatchingElement(<div />)).toBe(true);
  });
  it("has no children when shouln't be shown", () => {
    expect(wrapper.containsMatchingElement(<div />)).toBe(false);
  });
});
