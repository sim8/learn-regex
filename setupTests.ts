import '@testing-library/jest-dom';
window.gtag = () => {
  // no op
};

window.matchMedia = jest.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
}));
