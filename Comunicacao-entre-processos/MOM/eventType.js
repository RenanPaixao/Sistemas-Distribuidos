import avro from 'avsc';

export default avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'calc',
      type: { type: 'array', items: ['int' | 'string'] }
    }
  ]
});
