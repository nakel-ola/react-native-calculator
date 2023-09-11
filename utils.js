export const handleNumber = (value, state) => {
  if (state.answer)
    return {
      currentValue: `${value}`,
      operator: null,
      previousValue: null,
      answer: null,
    };

  if (state.currentValue === "0") return { ...state, currentValue: `${value}` };
  return { ...state, currentValue: `${state.currentValue}${value}` };
};

export const handleEqual = (state) => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = {
    operator,
    previousValue,
    currentValue,
  };

  if (operator === "/") {
    return {
      answer: previous / current,
      ...resetState,
    };
  }

  if (operator === "*") {
    return {
      answer: previous * current,
      ...resetState,
    };
  }

  if (operator === "+") {
    return {
      answer: previous + current,
      ...resetState,
    };
  }

  if (operator === "-") {
    return {
      answer: previous - current,
      ...resetState,
    };
  }

  return state;
};

export const getOperatorSymbol = (operator) => {
  if (operator === "/") return "÷";
  if (operator === "*") return "x";
  return operator;
};
