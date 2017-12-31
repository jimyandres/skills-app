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
  Job.find().distinct('qualifications.nameSkill', function (err, skills) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    res.json(skills); // return all skills in JSON format
  });
}

function getCities(res) {
  Job.find().distinct('city', function (err, cities) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    res.json(cities); // return all cities in JSON format
  });
}

function getCountries(res) {
  Job.find().distinct('country', function (err, countries) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    res.json(countries); // return all countries in JSON format
  });
}

function getSkillsCount(res) {
  Job.aggregate([
    { $unwind: "$qualifications" },
    {
      $group: {
        _id: "$qualifications.nameSkill",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        "_id" : 1,
        "count" : 1,
        "perc" : {
          $multiply : [ "$count", 100 ]
        }
      }
    },
  ], function (err, skillsCount) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    res.json(skillsCount); // return all skillsCount in JSON format
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

  // get skills count
  app.get('/api/skills/demand', function (req, res) {
    // use mongoose to get the skills count
    getSkillsCount(res);
  })

  // get cities count
  app.get('/api/cities', function (req, res) {
    // use mongoose to get the cities count
    getCities(res);
  })

  // get countries count
  app.get('/api/countries', function (req, res) {
    // use mongoose to get the countries count
    getCountries(res);
  })

  // application ---------------------------------------------------------------
  app.get('/api/', function (req, res) {
    // load the single view file (Angular will handle the page changes on the front-end)
    rest.sendfile(__dirname + '/public/index.html');
  })
}
