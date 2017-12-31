// define model ================================================================
var Job = require('./models/job');

function getJobs(res) {
  Job.find(function(err, jobs) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    res.json(jobs); // return all jobs in JSON format
  });
}

function getSkills(res) {
  Job.find().distinct('qualifications', function (err, skills) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    res.json(skills); // return all jobs in JSON format
  });
}

module.exports = function (app) {
  // api -----------------------------------------------------------------------

  // get all jobs
  app.get('/api/jobs', function(req, res) {
    // use mongoose to get all jobs in the database
    getJobs(res);
  });

  // create Job and send all Jobs after creation
  app.post('/api/jobs', function(req, res) {
    console.log(req.body.name);

    // create a Job, information comes from AJAX request from Angular
    var body = req.body;
    Job.create(body, function (err, job) {
      if (err)
        res.send(err);
      getJobs(res); // return all jobs in JSON format
    })
  });

  // delete a Job and send all Jobs after deletion
  app.delete('/api/jobs/:job_id', function (req, res) {
    console.log("Deleting: " + req.params.job_id);

    Job.remove({
      _id: req.params.job_id,
    }, function (err, job) {
      if (err)
        res.send(err);
      getJobs(res); // return all jobs in JSON format
    });
  })

  // get all skills
  app.get('/api/skills', function (req, res) {
    // use mongoose to get all skills in the db
    getSkills(res);
  })

  // application ---------------------------------------------------------------
  app.get('/api/', function (req, res) {
    // load the single view file (Angular will handle the page changes on the front-end)
    rest.sendfile(__dirname + '/public/index.html');
  })
}
