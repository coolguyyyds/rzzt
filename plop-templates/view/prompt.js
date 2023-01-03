const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a view',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'view name please',
    validate: notEmpty('name')
  }, {
    type: 'input',
    name: 'title',
    message: 'view title please',
    validate: notEmpty('title')
  }
  ],
  actions: data => {
    // const name = '{{name}}'
    const name = data.name.trim()
    const title = data.title.trim()
    const actions = [{
      type: 'add',
      path: `src/views/${name}/index.vue`,
      templateFile: 'plop-templates/view/index.hbs',
      data: {
        name: name,
        title: title
      }
    }, {
      type: 'add',
      path: `src/router/modules/${name}.js`,
      templateFile: 'plop-templates/router/index.hbs',
      data: {
        name: name,
        title: title
      }
    }]

    return actions
  }
}
