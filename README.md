# Raspberry Pi - Temperature measurement
Measure the CPU and GPU temperature of a Raspberry Pi in degrees Celsius or Fahrenheit.

## Installation

```
npm install rpi_measure_temp --save
```

## Usage
All methods are promise-based and hence await'able and then'able.

### Await
```javascript
const { measureCPU, measureGPU } = require('rpi_measure_temp');

(async () => {
    console.log('CPU Temp:', await measureCPU())
    console.log('GPU Temp:', await measureGPU())
})()
```

### Then/Catch
```javascript
const { measureCPU } = require('rpi_measure_temp')

measureCPU().then(result => {
    console.log(result)
    // ...
}).catch(error => {
    console.log(error)
})
```

### Sample output
```
{ celsius: 42.932, fahrenheit: 109.2776 }
```

### Round result
Use the JavaScript built-in functions to round your results.
```javascript
measureCPU().then(result => {
    const roundedValue = Math.round(result.celsius) // Rounding to the nearest integer
    const flooredValue = Math.floor(result.celsius) // Rounding down
    const ceiledValue = Math.ceil(result.celsius) // Rounding up
    const decimalValue = result.fahrenheit.toFixed(2) // Rounding to 2 decimal places after comma
})
```

## Note
Since the CPU and GPU of the Raspberry Pi are on one chip, the temperature sensor provides similar values for both chips.

## License
[MIT](../blob/master/LICENSE)