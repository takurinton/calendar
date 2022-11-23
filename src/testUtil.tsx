import { render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "ingred-ui";
import { vi } from "vitest";

export function renderWithThemeProvider(ui: JSX.Element) {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

export const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

export const scrollIntoViewMock = vi.fn();
