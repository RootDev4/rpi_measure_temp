'use strict'

const { exec } = require('child_process')
const fs = require('fs')

/**
 * Measures CPU temperature
 * @returns JSON object with celsius and fahrenheit results
 */
const measureCPU = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile('/sys/class/thermal/thermal_zone0/temp', { flag: 'r' }, (error, data) => {
                if (error || !data) reject(error || 'The CPU temperature cannot be measured.')

                const celsius = parseFloat(data) / 1000
                const fahrenheit = celsius * 9 / 5 + 32

                resolve({ celsius, fahrenheit})
            })
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Measures GPU temperature
 * @returns JSON object with celsius and fahrenheit results
 */
const measureGPU = () => {
    return new Promise((resolve, reject) => {
        try {
            exec('/usr/bin/vcgencmd measure_temp', (error, stdout, stderr) => {
                if (error || stderr != '' || !stdout) reject(error || stderr || 'The GPU temperature cannot be measured.')

                const result = stdout.match(/temp=(.*)'C/i)
                if (!result || result.length != 2) reject('The GPU temperature cannot be measured.')

                const celsius = parseFloat(result[1])
                const fahrenheit = celsius * 1.8 + 32

                resolve({ celsius, fahrenheit })
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Export
module.exports = { measureCPU, measureGPU }