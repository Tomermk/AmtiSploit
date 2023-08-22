/*instrumentation.js*/
const opentelemetry = require('@opentelemetry/sdk-node');
const { trace, context } = require('@opentelemetry/api');
const {getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { BasicTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { OTLPTraceExporter} = require('@opentelemetry/exporter-trace-otlp-proto');
const { OTLPMetricExporter} = require('@opentelemetry/exporter-metrics-otlp-proto');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');

const provider = new BasicTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'amtisploit-backend'
    }),
});

const exporter = new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: 'http://127.0.0.1:4318/v1/traces',
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  });

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();



const sdk = new opentelemetry.NodeSDK({
  traceExporter: exporter,
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://localhost:4318/v1/traces', // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
      headers: {}, // an optional object containing custom headers to be sent with each request
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations(),
    new ExpressInstrumentation(),
  ],
});
sdk.start();

exports.otelMiddleware = (req, res, next) => {
    console.log("otel middleware");
    const currentSpan = trace.getSpan(context.active());

    if (currentSpan) {

      if (req.headers.authorization) {
          currentSpan.setAttribute('http.header.authorization', req.headers.authorization);
      }
    }
    next();
}