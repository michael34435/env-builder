const fs = require('fs')

module.exports = (file, output) => {
  const env = fs
    .readFileSync(file)
    .toString()
    .split('\n')

  const lines = env
    .map(variable => {
      const [name, ...value] = variable.split('=')
      const globalEnv = process.env[name] || value.join('=')

      return name ? [name, '=', globalEnv].join('') : ''
    })

  fs.writeFileSync(output, lines.join('\n'))
}
