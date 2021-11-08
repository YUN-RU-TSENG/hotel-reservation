/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import test from "../components/test.vue";

describe("Component Admin", () => {
  it("render profile", () => {
    const wrapper = mount(test);

    expect(wrapper.get('[data-test="test"]').text()).toBe("test");
  });
});
