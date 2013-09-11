var willy = require('./willy');

module.exports.User = new willy.Model('User', {
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, unique: true, select: false },
  password: { type: String, select: false },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, select: false },
  updatedAt: { type: Date, default: Date.now, select: false },
  active: { type: Boolean, default: true, select: false }
});

module.exports.Version = new willy.Model('Version', {
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, select: false },
  updatedAt: { type: Date, default: Date.now, select: false },
  active: { type: Boolean, default: true, select: false }
});

module.exports.Milestone = new willy.Model('Milestone', {
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, select: false },
  updatedAt: { type: Date, default: Date.now, select: false },
  active: { type: Boolean, default: true, select: false }
});

module.exports.Component = new willy.Model('Component', {
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, select: false },
  updatedAt: { type: Date, default: Date.now, select: false },
  active: { type: Boolean, default: true, select: false }
});

module.exports.Issue = new willy.Model('Issue', {
  name: { type: String, required: true },
  description: { type: String },
  attach: { type: String },
  status: { type: String, required: true, default: 'new' },
  kind: { type: String, required: true },
  priority: { type: String, required: true },
  version: willy.ForeignKey('Version'),
  milestone: willy.ForeignKey('Milestone'),
  component: willy.ForeignKey('Component'),
  responsable: willy.ForeignKey('User'),
  project: willy.ForeignKey('Project', {required: true}),
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now, select: false },
  active: { type: Boolean, default: true, select: false }
});

module.exports.Project = new willy.Model('Project', {
  name: { type: String, required: true },
  description: { type: String, required: true, default: '' },
  versions: willy.ManyToMany(module.exports.Version),
  milestones: willy.ManyToMany(module.exports.Milestone),
  components: willy.ManyToMany(module.exports.Component),
  readers: [willy.ForeignKey('User')],
  writers: [willy.ForeignKey('User')],
  admins: [willy.ForeignKey('User')],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now, select: false },
  active: { type: Boolean, default: true }
});
