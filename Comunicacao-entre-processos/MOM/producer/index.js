import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'test'
});

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

const allOperations = ['sum','subtract', 'multiply', 'divide', 'pow', 'sqrt', 'log', 'log10', 'sin', 'cos']

const op = allOperations.reduce((acc, value) => ({...acc, value}), {} )


function queueCalcMessage() {
  const event = [op.sum, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const success = stream.write(eventType.toBuffer(event));
  if (success) {
    console.log(`message queued (${JSON.stringify(event)})`);
  }
}

queueCalcMessage();

