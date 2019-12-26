interface StoryDefinition {
  section: string
  title: string
  path: string
}

function createStory(
  section: string,
  title: string,
  path: string
): StoryDefinition {
  return {
    section,
    title,
    path,
  }
}

export default [
  createStory('Examples', 'basic', 'basic'),
  createStory('Examples', 'basic-schema', 'basic-schema'),
  createStory('Examples', 'basic-from', 'basic-form'),
  createStory('Examples/Schema-form', 'antd', 'schema-antd'),
  createStory('Examples/Schema-form', 'antd-evt', 'schema-antd-evt'),
  createStory('Examples/Schema-form', 'fusion', 'schema-fusion'),
  createStory('Examples/Schema-form', 'fusion-evt', 'schema-fusion-evt'),

]
