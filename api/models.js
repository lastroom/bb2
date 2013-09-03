var willy = require('./willy');

module.exports.User = new willy.Model('User', {
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

module.exports.Version = new willy.Model('Version', {
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

module.exports.Milestone = new willy.Model('Milestone', {
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

module.exports.Component = new willy.Model('Component', {
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

module.exports.Status = new willy.Model('Status', {
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

module.exports.Kind = new willy.Model('Kind', {
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

module.exports.Priority = new willy.Model('Priority', {
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

module.exports.Issue = new willy.Model('Issue', {
  name: { type: String, required: true },
  description: { type: String, required: true },
  attach: { type: String, required: true },
  status: willy.ForeignKey('Status'),
  kind: willy.ForeignKey('Kind'),
  priority: willy.ForeignKey('Priority'),
  responsable: willy.ForeignKey('User'),
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

module.exports.Project = new willy.Model('Project', {
  name: { type: String, required: true },
  description: { type: String, required: true, default: '' },
  versions: [module.exports.Version],
  milestones: [module.exports.Milestone],
  components: [module.exports.Component],
  issues: [module.exports.Issue],
  readers: [module.exports.User],
  writers: [module.exports.User],
  admins: [module.exports.User],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});
