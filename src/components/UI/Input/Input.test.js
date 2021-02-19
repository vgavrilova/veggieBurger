import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Import from "./Input";

configure({ adapter: new Adapter() });

describe("<Input /> Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Import />);
  });

  it("should render an input field if this was chosen", () => {
    wrapper.setProps({ inputType: "input" });
    expect(wrapper.containsMatchingElement(<input />)).toBe(true);
  });
});
