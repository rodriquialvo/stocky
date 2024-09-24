const {
  generateTemplateFiles,
  CaseConverterEnum,
} = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'Create simple page',
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: './generator/templates/simple-page/',
    },
    stringReplacers: [
      {question: 'Insert page name', slot: '__PageName__'},
    ],
    output: {
      path: './src/pages/__PageName__',
      pathAndFileNameDefaultCase: CaseConverterEnum.PascalCase,
      overwrite: true,
    },
  },
  {
    option: 'Create simple component',
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: './generator/templates/simple-component/',
    },
    stringReplacers: [
      {question: 'Insert component name', slot: '__ComponentName__'},
    ],
    output: {
      path: './src/components/__ComponentName__',
      pathAndFileNameDefaultCase: CaseConverterEnum.PascalCase,
      overwrite: true,
    },
  },
]);
