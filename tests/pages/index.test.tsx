import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import renderer from 'react-test-renderer';
import Home from "@/pages";
import fetch from 'jest-fetch-mock';

describe("Home page test", () => {
    it("renders a header", async () => {
      fetch.mockResponseOnce(JSON.stringify({ rates: {"CAD": 1.42, "EUR": 1, "USD": 1.11}, base: "EUR" }))

      await act(async () => render(<Home />));

      const title = screen.getByText("Currency Converter")
      const text = screen.getByText("Enter Amount")
      const input = screen.getByRole('spinbutton')
      const button = screen.getByRole('button')
      
      expect(title).toBeInTheDocument()
      expect(text).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    });

    it('Snapshot', async () => {
      fetch.mockResponseOnce(JSON.stringify({ rates: {"CAD": 1.42, "EUR": 1, "USD": 1.11}, base: "EUR" }))

      const tree = await act(async () => renderer.create(<Home />).toJSON());

      expect(tree).toMatchSnapshot()
  })
});