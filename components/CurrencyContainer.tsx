import CurrencyColumn from './CurrencyColumn';

import { FlexContainer, IconColumn, Icon } from './styled/styledComponents';

type CurrencyContainerProps = {
    codes: { [currency: string]: string }
    fromCurrency: string
    setFromCurrency: (value: string) => void
    handleSwap: () => void
    toCurrency: string
    setToCurrency: (value: string) => void
    currencies: string[]
}

const CurrencyContainer = ({ codes, fromCurrency, setFromCurrency, handleSwap, toCurrency, setToCurrency, currencies }: CurrencyContainerProps) => {
  return (
        <FlexContainer>
            <CurrencyColumn title="From" flagCode={codes[fromCurrency]} currency={fromCurrency}
            setCurrency={setFromCurrency}  currencies={currencies} />

            <IconColumn role="icon-column">
                <Icon role="icon" className="fas fa-exchange-alt" onClick={handleSwap} />                
            </IconColumn>

            <CurrencyColumn title="To" flagCode={codes[toCurrency]} currency={toCurrency}
            setCurrency={setToCurrency}  currencies={currencies} />
        </FlexContainer>
)}

export default CurrencyContainer