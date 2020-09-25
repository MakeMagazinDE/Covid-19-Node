const fetch = require('node-fetch');
const Covid19Api = 'https://api.covid19api.com/summary';

module.exports = function(RED) {
  function Covid19ApiNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on('input', function(msg) {
      fetch(Covid19Api)
      .then(response => response.json())
      .then(data => {
        const country = msg.payload
        const summary = data.Countries.find(c => c.Country === country);
        return summary;
      })
      .then(summary => {
        msg.payload = summary ? summary.NewConfirmed : -1;
        node.send(msg);
      })
      .catch(error => console.log(error));
    });
  }
  RED.nodes.registerType('covid19api', Covid19ApiNode);
}
