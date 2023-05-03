import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import CurrencyContainer from '@/components/CurrencyContainer';

describe('Component Test CurrencyContainer', () => {
    it('Should render properly', () => {
        render(<CurrencyContainer codes={{"EUR":"RF", "CAD":"CA", "USD":"US"}}
        fromCurrency={"EUR"} setFromCurrency={(s: string) => {}}
        handleSwap={() => {}} toCurrency={"USD"}
        setToCurrency={(s: string) => {}} currencies={["EUR", "CAD", "USD"]} />)
        
        const icon = screen.getByRole('icon')
        const iconColumn = screen.getByRole('icon-column')
        
        expect(icon).toBeInTheDocument()
        expect(iconColumn).toBeInTheDocument()
    })

    it('Snapshot', () => {
        const tree = renderer.create(<CurrencyContainer codes={{"EUR":"RF", "CAD":"CA", "USD":"US"}}
        fromCurrency={"EUR"} setFromCurrency={(s: string) => {}}
        handleSwap={() => {}} toCurrency={"USD"}
        setToCurrency={(s: string) => {}} currencies={["EUR", "CAD", "USD"]} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

