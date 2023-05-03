import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import ConvertDisplay from '@/components/ConvertDisplay';

describe('Component Test ConvertDisplay', () => {
    it('Should render a "Converting..." text', () => {
        render(<ConvertDisplay prevAmount={1}
        prevFromCurrency={"EUR"} converted={5}
        prevToCurrency={"USD"} converting={true} />)
        
        const text = screen.getByText("Converting...")
        
        expect(text).toBeInTheDocument()
    })

    it('Should render a change', () => {
        render(<ConvertDisplay prevAmount={1}
        prevFromCurrency={"EUR"} converted={5}
        prevToCurrency={"USD"} converting={false} />)

        const from = screen.getByText('1 EUR')
        const to = screen.getByText('5 USD')
        
        expect(from).toBeInTheDocument()
        expect(to).toBeInTheDocument()
    })

    it('Snapshot_1', () => {
        const tree = renderer.create(
        <ConvertDisplay prevAmount={1}
        prevFromCurrency={"EUR"} converted={5}
        prevToCurrency={"USD"} converting={true} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Snapshot_2', () => {
        const tree = renderer.create(
        <ConvertDisplay prevAmount={1}
        prevFromCurrency={"EUR"} converted={5}
        prevToCurrency={"USD"} converting={false} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
}) 