import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import CurrencyColumn from '@/components/CurrencyColumn';

describe('Component Test CurrencyColumn', () => {
    it('Should render a currency column properly', () => {
        render(<CurrencyColumn title="From" 
        flagCode="US" currency="USD"
        setCurrency={(s: string) => {}}
        currencies={["EUR", "CAD", "USD"]} />)
        
        const text = screen.getByText('From')
        const dropdown = screen.getByRole('combobox')
        const options = screen.getAllByRole('option')
        
        expect(text).toBeInTheDocument()
        expect(dropdown).toBeInTheDocument()
        expect(options.length).toBe(3)
        expect(options[0]).toHaveTextContent("EUR")
        expect(options[1]).toHaveTextContent("CAD")
        expect(options[2]).toHaveTextContent("USD")
    })

    it('Snapshot', () => {
        const tree = renderer.create(
        <CurrencyColumn title="From" 
        flagCode="US" currency="USD"
        setCurrency={(s: string) => {}}
        currencies={["EUR", "CAD", "USD"]} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
}) 