import { CacheObj,cache, clean, get, setCacheSize, write, writeFifo, writeLRU, writeLFU, validTime, read } from "../../utils/cache";

beforeEach(() => {
    clean()
    setCacheSize(3)
})

describe("Cache", () => {
    test("get", () => {
        const obj: CacheObj = { base: "EUR", symbol: "CAD", timestamp: Math.floor(new Date().getTime() / 1000) , rate: 1.42, lastUse: new Date().getTime(), frecuency: 0 }
        cache.push(obj)
        expect(get(0)).toBe(obj.rate)
    })

    test("wrapper", () => {        
        write("EUR", "CAD", Math.floor(new Date().getTime() / 1000), 1.42)
        write("EUR", "USD", Math.floor(new Date().getTime() / 1000), 1.11)
        write("USD", "EUR", Math.floor(new Date().getTime() / 1000), 0.8)
        
        expect(get(0)).toBe(1.42)
        expect(get(1)).toBe(1.11)
        expect(get(2)).toBe(0.8)
    })

    test("FIFO Policy", () => {     
        writeFifo("EUR", "CAD", Math.floor(new Date().getTime() / 1000), 1.42)
        writeFifo("EUR", "USD", Math.floor(new Date().getTime() / 1000), 1.11)
        writeFifo("USD", "EUR", Math.floor(new Date().getTime() / 1000), 0.8)
        writeFifo("EUR", "AED", Math.floor(new Date().getTime() / 1000), 50.3)

        expect(get(0)).toBe(1.11)
        expect(get(1)).toBe(0.8)
        expect(get(2)).toBe(50.3)
    })

    test("LRU Policy", () => {     
        writeLRU("EUR", "CAD", Math.floor(new Date().getTime() / 1000), 1.42)
        writeLRU("EUR", "USD", Math.floor(new Date().getTime() / 1000), 1.11)
        writeLRU("USD", "EUR", Math.floor(new Date().getTime() / 1000), 0.8)

        function sleep (time: number) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }
          
        sleep(1000).then(() => {
            get(0)
            get(2)        
    
            writeLRU("EUR", "AED", Math.floor(new Date().getTime() / 1000), 50.3)
    
            expect(get(0)).toBe(1.42)
            expect(get(1)).toBe(50.3)
            expect(get(2)).toBe(0.8)
        }); 
    })

    test("LFU Policy", () => {     
        writeLFU("EUR", "CAD", Math.floor(new Date().getTime() / 1000), 1.42)
        writeLFU("EUR", "USD", Math.floor(new Date().getTime() / 1000), 1.11)
        writeLFU("USD", "EUR", Math.floor(new Date().getTime() / 1000), 0.8)

          
        get(0)
        get(0)
        get(0)
        get(1)
        get(1)       

        writeLFU("EUR", "AED", Math.floor(new Date().getTime() / 1000), 50.3)

        expect(get(0)).toBe(1.42)
        expect(get(1)).toBe(1.11)
        expect(get(2)).toBe(50.3)
    })

    test("valid 10 minutes", () => {
        const timestamp = new Date().getTime()
        const fiveMinutesFromTimestamp = timestamp + (5 * 60 * 1000)
        const elevenMinutesFromTimestamp = timestamp + (11 * 60 * 1000)

        expect(validTime(fiveMinutesFromTimestamp, timestamp)).toBe(true)
        expect(validTime(elevenMinutesFromTimestamp, timestamp)).toBe(false)
    })

    test("read", () => {     
        writeLFU("EUR", "CAD", Math.floor(new Date().getTime() / 1000), 1.42)
        writeLFU("EUR", "USD", Math.floor(new Date().getTime() / 1000), 1.11)
        writeLFU("USD", "EUR", Math.floor(new Date().getTime() / 1000), 0.8)

        expect(read("EUR", "CAD")).toBe(0)
        expect(read("EUR", "USD")).toBe(1)
        expect(read("USD", "EUR")).toBe(2)
        expect(read("CAD", "USD")).toBe(-1)
    })
})
