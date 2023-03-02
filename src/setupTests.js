// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './mocks/api/server';
import { dndQueryApi } from './redux/apiSlice';
import { setupStore } from './redux/store';

const store = setupStore({});


// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(dndQueryApi.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());