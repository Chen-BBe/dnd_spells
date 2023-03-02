import React from 'react';

const LS_KEY = 'my-dnd-likes';

export const useLocalStorage = (key=LS_KEY, initialState=[]) => {
  const serializedInitialState = JSON.stringify(initialState);
  let storageValue = initialState;

  try {
    storageValue = JSON.parse(localStorage.getItem(key)) ?? initialState;
  } catch {
    localStorage.setItem(key, serializedInitialState);
  }

  const [value, setValue] = React.useState(storageValue);

  const updatedSetValue = React.useCallback(
    newValue => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key]
  );
  return [value, updatedSetValue];
};