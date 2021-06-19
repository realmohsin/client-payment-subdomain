const handleFetchResponse = async fetchResponse => {
  if (!fetchResponse.ok) {
    try {
      const json = await fetchResponse.json()
      if (json.error && json.error.message) {
        throw new Error(
          `${fetchResponse.url} ${fetchResponse.status} ${json.error.message}`
        )
      }
    } catch (error) {
      alert('Something went wrong!')
      console.log(error)
      throw error
    }
  }

  return fetchResponse.json()
}

export default handleFetchResponse
