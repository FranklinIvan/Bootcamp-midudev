const suma = (a, b) => a + b

// if (suma(0, 0) !== 0) console.error('suma of 0 and 0 expected to be 0')
// if (suma(1, 3) !== 4) console.error('suma of 1 and 3 expected to be 4')

const checks = [
  { a: 1, b: 2, result: 3 },
  { a: 0, b: 0, result: 0 },
  { a: -3, b: -3, result: -6 }
]

checks.forEach(check => {
  const { a, b, result } = check

  console.assert(suma(a, b) === result, `sumaof ${a} and ${b} expected to be ${result}`)
})

console.log(`${checks.length} checks performed... `)
