/**
 * Helper function to extract error messages from various error response formats
 */
export function extractErrorMessage(error: any): string {
  // Case 1: Error has a response object with data that contains a message
  if (error.response?.data) {
    // Common case: message is directly in the data object
    if (typeof error.response.data.message === 'string') {
      return error.response.data.message;
    }
    
    // Case 2: Django/DRF style errors - might be an object with field-specific errors
    if (typeof error.response.data === 'object') {
      // Django Rest Framework often returns field errors as an object
      const fieldErrors = Object.entries(error.response.data)
        .filter(([key, value]) => key !== 'detail' && Array.isArray(value))
        .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`);
      
      if (fieldErrors.length > 0) {
        return fieldErrors.join('; ');
      }
      
      // DRF often has a 'detail' field for non-field errors
      if (error.response.data.detail) {
        return error.response.data.detail;
      }

      // Especially after 'detail' field, we need to check if there is 'message' field
      if (error.response.data.message) {
        return error.response.data.message;
      }

      // Especially after 'message' field, we need to check if there is 'error' field
      if (error.response.data.error) {
        return error.response.data.error;
      }
      
      // If we have a structured error object but couldn't extract specific messages,
      // convert it to a string
      return JSON.stringify(error.response.data);
    }
  }
  
  // Case 3: Error has a message property (standard JS Error)
  if (error.message) {
    return error.message;
  }
  
  // Case 4: Error is a string
  if (typeof error === 'string') {
    return error;
  }
  
  // Fallback
  return "An unknown error occurred";
}