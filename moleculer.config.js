// moleculer.config.js
const { Loggers, MetricReporters, TracerExporters } = require('moleculer');
const Laboratory = require("@moleculer/lab");

// For stable work with Laboratory
Loggers.register('Laboratory', Laboratory.EventLogger);
MetricReporters.register('Laboratory', Laboratory.MetricReporter);
TracerExporters.register('Laboratory', Laboratory.TraceExporter);


module.exports = {
	logger: [{
		type: "Console",
		options: {
      level: {
        "$LAB": "info",
        "**": false,
      }
    }
	}, {
    type: "Laboratory",
    options: {
      level: {
        "$LAB": false,
        "**": "info",
      }
    }
  }],
	tracing: {
      enabled: true,
      exporter: "Laboratory"
  },
  metrics: {
      enabled: true,
      reporter: "Laboratory"
  },
};
