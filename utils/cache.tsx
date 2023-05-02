export type CacheObj = { 
    base: string, 
    symbol: string, 
    timestamp: number,
    rate: number, 
    lastUse: number, 
    frecuency: number
}

export let cache: CacheObj[] = []

let cacheSize = 10

// ten minutes
const validityTime = 10 * 60 * 1000

const wrapper = (replacementPolicy: (obj: CacheObj) => void) => (base: string, symbol: string, timestamp: number, rate: number) => {
    const currentTime = new Date().getTime();

    if (cache.length < cacheSize) {
        cache.push({ base: base, symbol: symbol, timestamp: timestamp * 1000, rate: rate, lastUse: currentTime, frecuency: 0 })
    } else {
        replacementPolicy({ base: base, symbol: symbol, timestamp: timestamp * 1000, rate: rate, lastUse: currentTime, frecuency: 0 })
    }
}

const random = (obj: CacheObj) => {
    const index = Math.floor(Math.random() * cacheSize);
    cache[index] = obj
}

const fifo = (obj: CacheObj) => {
    cache.shift()
    cache.push(obj) 
}

const lru = (obj: CacheObj) => {
    let leastRecent = 0
    let lowerTime = cache[leastRecent].timestamp

    cache.forEach((elem, i) => {
        if (elem.timestamp < lowerTime){
            lowerTime = elem.timestamp
            leastRecent = i
        }
    })

    cache[leastRecent] = obj
}

const lfu = (obj: CacheObj) => {
    let leastFrec = 0 
    let lowerFrec = cache[leastFrec].frecuency

    cache.forEach((elem, i) => {
        if (elem.frecuency < lowerFrec){
            lowerFrec = elem.frecuency
            leastFrec = i
        }
    })

    cache[leastFrec] = obj
}

export const validTime = (currentTime: number, timestamp: number) => currentTime - timestamp < validityTime

export const read = (base: string, symbol: string) => {
    const currentTime = new Date().getTime();
    
    let index = -1;
    cache.forEach((elem, i) => {
        if (elem.base === base &&
            elem.symbol === symbol &&
            validTime(currentTime, elem.timestamp))
            index = i;
    })

    return index;
}

export const get = (index: number) => {
    const currentTime = new Date().getTime();

    cache[index] = {...cache[index], lastUse: currentTime, frecuency: cache[index].frecuency + 1 }
    return cache[index].rate
};

export const clean = () => cache = []

export const setCacheSize = (size: number) => cacheSize = size 

export const write = wrapper(fifo)

export const writeFifo = wrapper(fifo)

export const writeLRU = wrapper(lru)

export const writeLFU = wrapper(lfu)