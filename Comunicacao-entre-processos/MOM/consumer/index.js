import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

var consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();

consumer.on('ready', () => {
  consumer.subscribe(['test']);
  consumer.consume();
}).on('data', function(data) {
  const [operation, ...params] = eventType.fromBuffer(data.value);
  
  switch(operation) {
    case 'sum':
      add(params);
      return
    case 'subtract':
      sub(params);
      return
    case 'multiply':
      multiply(params);
      return
    case 'divide':
      divide(params);
      return
    case 'pow':
      pow(params);
      return
    case 'sqrt':
      sqrt(params);
      return
    case 'log':
      log(params);
      return
    case 'log10':
      log10(params);
      return
    case 'sin':
      sin(params);
      return
    case 'cos':
      cos(params);
      return
    default:
      console.log('Invalid operation');
  }
});

function add(args) {
  const result = args.reduce((a, b) => a + b, 0)
  
  console.log(result)
}
function sub(args) {
  const result = args.reduce((a, b) => a - b, 0)
  
  console.log(result)
}
function multiply(args) {
  const result = args.reduce((a, b) => a * b, 1)
  
  console.log(result)
}
function divide(args) {
  const result = args.reduce((a, b) => a / b, 1)
  
  console.log(result)
}
function pow(args) {
  const result = args.reduce((a, b) => a ** b, 1)
  
  console.log(result)
}
function sqrt(args) {
  const result = Math.sqrt(args[0])
  console.log(result)
}
function log(args) {
  const result = Math.log(args[0])
  console.log(result)
}
function log10(args) {
  const result = Math.log10(args[0])
  console.log(result)
}
function sin(args) {
  const result = Math.sin(args[0])
  console.log(result)
}
function cos(args) {
  const result = Math.cos(args[0])
  console.log(result)
}
