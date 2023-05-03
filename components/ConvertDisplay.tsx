import { Change, ConvertText, FlexContainer,
    Column, CenterText, IconColumn, Text } from './styled/styledComponents';

type ConvertDisplayProps = {
    prevAmount: number
    prevFromCurrency: string
    converted?: number
    prevToCurrency: string
    converting: boolean
}

const ConvertDisplay = ({ prevAmount, prevFromCurrency, converted, prevToCurrency, converting }: ConvertDisplayProps) => {
return (
    <Change>
        { converting ? 
        <ConvertText>Converting...</ConvertText> :
        <FlexContainer>
            <Column>
                <CenterText>
                    {prevAmount} {prevFromCurrency}
                </CenterText>
            </Column>
            <IconColumn>
                <Text>
                =
                </Text>
            </IconColumn>
            <Column>
                <CenterText>
                    {converted} {prevToCurrency}
                </CenterText>
            </Column>
        </FlexContainer>
        }
    </Change>
)}

export default ConvertDisplay