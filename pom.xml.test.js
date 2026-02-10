const fs = require('fs');
const xml2js = require('xml2js');

describe('pom.xml', () => {
  it('should contain the OTEL_TRACES_EXPORTER environment variable', (done) => {
    const pomXml = fs.readFileSync('pom.xml', 'utf8');
    const parser = new xml2js.Parser();
    parser.parseString(pomXml, (err, result) => {
      const jibPlugin = result.project.build[0].pluginManagement[0].plugins[0].plugin.find(p => p.artifactId[0] === 'jib-maven-plugin');
      const env = jibPlugin.configuration[0].container[0].environment[0];
      expect(env.OTEL_TRACES_EXPORTER[0]).toBe('otlp');
      done();
    });
  });
});
