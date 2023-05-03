import { Column, Text, CurrencyWrapper,
    FlagImage, Dropdown, DropOption } from './styled/styledComponents';

type CurrencyProps = {
    title: string
    flagCode: string
    currency: string
    setCurrency: (value: string) => void
    currencies: string[]
}

const CurrencyColumn = ({ title, flagCode, currency, setCurrency, currencies }: CurrencyProps) => {
return (
    <Column>
        <Text>{title}</Text>

        <CurrencyWrapper>
            <FlagImage
                src={`https://flagsapi.com/${flagCode}/flat/64.png`}
                height={25}
                width={25}
                alt={`${flagCode}-flag`}
            />
            <Dropdown value={currency} onChange={e => setCurrency(e.target.value)}>
                {currencies.map(curr => {
                    return <DropOption key={curr} value={curr}>{curr}</DropOption>
                })}
            </Dropdown>
        </CurrencyWrapper>
    </Column>
)}

export default CurrencyColumn