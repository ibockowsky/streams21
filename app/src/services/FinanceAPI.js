const axios = require('axios')

const getDataFromApi = async (cryptoCurrencyCode, currencyCode) => {
  const response = await axios
    .get(
      `https://api-pub.bitfinex.com/v2/ticker/t${cryptoCurrencyCode}${currencyCode}`
    )
    .then((response) => response)
    .catch((err) => err)

  return {
    currencies: `${cryptoCurrencyCode} -> ${currencyCode}`,
    response: response2.data,
  }
}

export const handleData = async (cryptoCurrencyCode, currencyCode) => {
  const data = await getDataFromApi(cryptoCurrencyCode, currencyCode)

  if (!data.response) {
    console.log(
      `[${cryptoCurrencyCode}] Something went wrong, please check your API.`
    )
    return
  }

  // const { ask, bid } = data.response

  const [bid, _, ask] = data.response

  const difference = +(((ask - bid) / bid) * 100).toFixed(4)
  // const difference = +(((bid - ask) / ask) * 100).toFixed(4)

  return { ask, bid, difference }
}
