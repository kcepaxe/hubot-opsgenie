OPS_API_KEY = process.env.WHOS_ON_CALL_API_KEY;

WEBHOOK_SECRET = process.env.WHOS_ON_CALL_WEBHOOK_SECRET;

MM_API_KEY = process.env.MATTERMOST_ACCESS_TOKEN;

Opsgenie = (function() {
  function Opsgenie() {
    this.properties = {
      name: null,
      dude: null,
      url: null
    };
  }

  return Opsgenie;

})();

Mmheader = (function() {
  function Mmheader() {
    this.properties = {
      name: null,
      url: null
    };
  }

  return Mmheader;

})();

module.exports = function(robot) {
  var getJson, i, j, k, len, myteam, onCallDude;
  getJson = function(a) {
    var b;
    b = JSON.stringify(a);
    return robot.logger.info("" + b);
  };
  onCallDude = "";
  for (j = k = 0, len = SCHEDULE_NAMES.length; k < len; j = ++k) {
    i = SCHEDULE_NAMES[j];
    myteam = new Opsgenie;
    myteam.name = i;
    myteam.url = "https://api.eu.opsgenie.com/v2/schedules/" + ("" + i) + "/on-calls?scheduleIdentifierType=name&flat=true";
    getJson(robot.http(myteam.url, callback).header("Authorization", "GenieKey " + OPS_API_KEY).get()(function(err, res, body) {
      var callbak, error;
      if (err != null) {
        return robot.logger.error(err);
      }
      try {
        body;
        robot.logger.info("" + body);
        callbak = JSON.parse(body);
        return robot.logger.info(body + " " + json.data + " " + onCall);
      } catch (_error) {
        error = _error;
        res.send("Ran into an error parsing JSON :(");
      }
    }));
  }
  return robot.logger.info("" + onCallDude);
};
