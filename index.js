const fs = require('fs')

module.exports = (input, output) => {
  const env = fs
    .readFileSync(input)
    .toString()
    .split('\n')

  const lines = env
    .map(variable => {
      const [name, ...value] = variable.trim().split('=')
      const globalEnv = process.env[name] || value.join('=')

      return name ? [name, '=', globalEnv].join('') : ''
    })

  fs.writeFileSync(output, lines.join('\n'))
}
