#!/bin/sh

if grep -q '<OTEL_TRACES_EXPORTER>otlp</OTEL_TRACES_EXPORTER>' pom.xml; then
  echo "Test passed: OTEL_TRACES_EXPORTER is set to otlp"
  exit 0
else
  echo "Test failed: OTEL_TRACES_EXPORTER is not set to otlp"
  exit 1
fi
