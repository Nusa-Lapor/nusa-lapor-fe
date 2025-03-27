/**
 * Converts a camelCase string to snake_case
 */
export function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * Converts snake_case string to camelCase
 */
export function snakeToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Recursively converts all object keys from camelCase to snake_case
 */
export function convertObjectKeysToSnakeCase<T>(obj: any): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertObjectKeysToSnakeCase) as unknown as T;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = camelToSnakeCase(key);
    acc[snakeKey] = convertObjectKeysToSnakeCase(obj[key]);
    return acc;
  }, {} as any) as T;
}

/**
 * Recursively converts all object keys from snake_case to camelCase
 */
export function convertObjectKeysToCamelCase<T>(obj: any): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertObjectKeysToCamelCase) as unknown as T;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = snakeToCamelCase(key);
    acc[camelKey] = convertObjectKeysToCamelCase(obj[key]);
    return acc;
  }, {} as any) as T;
}