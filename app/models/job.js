var mongoose = require('mongoose');

module.exports = mongoose.model('Job', {
  name: String,
  qualifications: [{
    nameSkill: String,
    experienceSkill: {type: Number, default: 0}
  }],
  city: String,
  country: String,
  experience: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  url: { type: String, default: 'NN' }
});
