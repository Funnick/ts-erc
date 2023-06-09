import Head from 'next/head';

import { useState, useEffect, ChangeEvent } from 'react';

import { codes } from '../utils/country_flag_code';
import { read, get, write } from '@/utils/cache';

import CurrencyContainer from '../components/CurrencyContainer';
import ConvertDisplay from '@/components/ConvertDisplay';

import { Main, Card, Title, Text, Input,
        Button, CenterText } from '@/components/styled/styledComponents';

const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL === undefined ? "vacio" : process.env.NEXT_PUBLIC_BASE_URL 
const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY === undefined ? "vacio" : process.env.NEXT_PUBLIC_API_KEY

export default function Home() {
  const [ amount, setAmount ] = useState<number>(1)
  const [ prevAmount, setPrevAmount ] = useState<number>(1)
  const [ fromCurrency, setFromCurrency ] = useState<string>("EUR")
  const [ prevFromCurrency, setPrevFromCurrency] = useState<string>("EUR")
  const [ toCurrency, setToCurrency ] = useState<string>("AED")
  const [ prevToCurrency, setPrevToCurrency ] = useState<string>("AED")
  const [ currencies, setCurrencies ] = useState<string[]>([])
  const [ converted, setConverted ] = useState<number | undefined>()

  const [ converting, setConverting ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<string | undefined>()

  useEffect(() => {
    const options = {headers: {apikey: API_KEY}};
    
    setLoading(true)
    fetch(BASE_URL, options)
      .then(res => res.json())
      .then(data => {
        const dataCurrencies = [...Object.keys(data.rates)]
        const firstCurrency = dataCurrencies[0]
        const rateFirstCurrency: number = data.rates[firstCurrency]
        setCurrencies(dataCurrencies)
        setFromCurrency(data.base)
        setPrevFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setPrevToCurrency(firstCurrency)
        setConverted(amount * rateFirstCurrency)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(err.toString())
      })
  }, [])


  function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
    const num: string = e.target.value
    if (num === "") {
      setAmount(1)
      return
    }
    setAmount(parseFloat(num))
  }

  function convert() {
    const options = {headers: {apikey: API_KEY}};
    setConverting(true)

    fetch(`${BASE_URL}?symbols=${toCurrency}&base=${fromCurrency}`, options)
      .then(res => res.json())
      .then(data => {
        const rate: number = data.rates[toCurrency]
        const timestamp: number = data.timestamp
        setPrevAmount(amount)
        setPrevFromCurrency(fromCurrency)
        setPrevToCurrency(toCurrency)
        setConverted(amount * rate)
        write(fromCurrency, toCurrency, timestamp, rate)
        setConverting(false)
      })
      .catch( err => {
        console.log(err)
        setError(err.toString())
      })
  }

  function handleConvert() {
    const index = read(fromCurrency, toCurrency)
    if (index >= 0) {
      const rate = get(index)
      setPrevAmount(amount)
      setPrevFromCurrency(fromCurrency)
      setPrevToCurrency(toCurrency)
      setConverted(amount * rate)
    } else {
      convert()
    }
  }

  function handleSwap() {
    const currentFrom = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(currentFrom)
  }

  return (
    <>
      <Head>
        <title>Exchange Rate Calculator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
          <Card>

            {
              error ? 
              <>
                <Title>There is an error</Title>
                <Text>{ error }</Text>
              </>
              : loading ? <CenterText>Loading...</CenterText> :
            <>
            <Title>Currency Converter</Title>

            <Text>Enter Amount</Text>
            <Input type="number" value={amount} onChange={handleAmountChange}></Input>

            <CurrencyContainer codes={codes} fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency} handleSwap={handleSwap}
            toCurrency={toCurrency} setToCurrency={setToCurrency} currencies={currencies} />

            <ConvertDisplay converting={converting} prevAmount={prevAmount} 
              prevFromCurrency={prevFromCurrency} converted={converted} prevToCurrency={prevToCurrency}
            />
            
            <Button onClick={handleConvert}>
              Get Exchange Rate
            </Button>
            </>}
          </Card>
      </Main>
    </>
  )
}