import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  let state = {};
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  beforeEach(() => {
    state = { ...initialState };
    deepFreeze(state);
  });

  test("should return a proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("ok is incremented", () => {
    const action = {
      type: "OK",
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("bad is incremented", () => {
    const action = {
      type: "BAD",
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test("state is reset", () => {
    const populatedState = {
      good: 5,
      ok: 7,
      bad: 1,
    };
    deepFreeze(populatedState);

    const action = {
      type: "ZERO",
    };

    const newState = counterReducer(populatedState, action);
    expect(newState).toEqual(initialState);
  });
});
