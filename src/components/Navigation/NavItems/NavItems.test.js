import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavItems from "./NavItems";
import NavItem from "./NavItem/NavItem";

configure({ adapter: new Adapter() });

describe("<NavItems /> Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });
  it("should render two <NavItem /> components if user is not logged in", () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it("should render three <NavItem /> components if user is logged in", () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it("should check, whather there is a logout button after login", () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(
      true
    );
  });
});
