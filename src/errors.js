function handleError(error) {
    if (error.response) {
      return new Error(`API error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      return new Error('No response received from the server');
    } else {
      return new Error(`Request error: ${error.message}`);
    }
  }
  
  module.exports = { handleError };