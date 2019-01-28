import {
  isEmpty,
  verifyEmail,
  verifyPassword,
  isFormEmpty
} from "../verifyValue";

describe("test Verify Value", () => {
  test("isEmpty", () => {
    expect(isEmpty(2)).toBe(false);
    expect(isEmpty("2")).toBe(false);
    expect(isEmpty(["2"])).toBe(false);
    expect(isEmpty({ a: 2 })).toBe(false);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
  });

  test("Vefiry Email", () => {
    expect(verifyEmail("xxx")).toBe(false);
    expect(verifyEmail("xxx@gmail")).toBe(false);
    expect(verifyEmail(".gmail")).toBe(false);
    expect(verifyEmail(0)).toBe(false);
    expect(verifyEmail("")).toBe(false);
    expect(verifyEmail("xxx@gmail.com")).toBe(true);
  });

  test("Verify password", () => {
    [232, {}, [], null, undefined].forEach(_value =>
      expect(verifyPassword(_value)).toBe(false)
    );
    expect(verifyPassword("321")).toBe(1);
    expect(verifyPassword("323213", "3212133")).toBe(2);
    expect(verifyPassword("323213", "323213")).toBe(true);
  });

  test("check null state", () => {
    expect(
      isFormEmpty({
        a: 1,
        b: [],
        c: {},
        d: "",
        e: null,
        f: undefined
      })
    ).toEqual(["b", "c", "d", "e", "f"]);

    expect(
      isFormEmpty({
        a: 1,
        b: 2
      })
    ).toBe(true);
  });
});
