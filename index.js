const req = require('require-from-string')
const { getOptions } = require('loader-utils')

const defaultGetData = async (exported, context) => {
  const exportedResult = typeof exported === 'function' ? exported(context) : exported
  const result = exportedResult.then ? await exportedResult : exportedResult

  return `export default ${JSON.stringify(result)}`
}

module.exports = async function (source) {
  this.cacheable()

  const done = this.async()
  const options = getOptions(this) || {}
  const context = Object.assign({}, options.context, {
    loader: this
  })
  const getData = options.getData || defaultGetData

  try {
    let exported = req(source, this.resourcePath)
    exported = exported.default || exported
    const data = await getData(exported, context)
    done(null, data)
  } catch (err) {
    done(err)
  }
}
