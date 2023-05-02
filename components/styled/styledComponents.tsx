import styled from 'styled-components';

export const Main = styled.main`
  min-height: 100vh;
  background-color: #675AFE;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  max-width: 350px;
  flex:1;
  padding: 2rem;
  border-radius: 0.45rem;
  background-color: white;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Text = styled.p`
  font-size: 1.125rem;
`;

export const CenterText = styled(Text)`
  text-align: center;
`;

export const ConvertText = styled(CenterText)`
  margin-bottom: .8rem;
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: .6rem 1rem;
  border: 1px solid #999;
  margin-bottom: .75rem;

  &:focus {
    border: 2px solid #675AFE;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .8rem;
`;

export const Column = styled.div`
  flex: 2;
`;

export const CurrencyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #999;
  border-radius: 0.45rem;
  padding: 8px 0;
`;

export const FlagImage = styled.img`
  max-width: 100%;
`;

export const Dropdown = styled.select`
  width: auto;
  padding: 2px;
  margin: 0 -5px 0 5px;
  background-color: white;
  font-size: 1rem;
`;

export const DropOption = styled.option``;

export const IconColumn = styled(Column)`
  display: flex;
  justify-content: center;
  flex: 1;
`;

export const Icon = styled.i`
  margin-top: 1.3rem;
  font-size: 1.375rem;
  cursor: pointer;
`;

export const Change = styled.div`
  font-size: 1rem;
`;

export const Button = styled.button`
  color: white;
  font-size: 1rem;
  cursor: pointer;
  background-color: #675AFE;
  padding: .75rem 0;
`;