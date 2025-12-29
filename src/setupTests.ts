import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Start MSW before all tests, reset handlers after each, close after all
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
