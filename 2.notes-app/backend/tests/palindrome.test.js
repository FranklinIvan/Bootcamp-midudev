const { palindrome } = require('../utils/for_testing')

describe.skip('palindrome', () => {
  test('of franklin', () => {
    const result = palindrome('franklin')
    expect(result).toBe('nilknarf')
  })

  test('of undefined', () => {
    const result = palindrome()
    expect(result).toBeUndefined()
  })
})
