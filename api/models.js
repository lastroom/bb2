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

module.exports.Status = new willy.Model('Status', {
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, select: false },
  updatedAt: { type: Date, default: Date.now, select: false },
  active: { type: Boolean, default: true, select: false }
});

module.exports.Kind = new willy.Model('Kind', {
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, select: false },
  updatedAt: { type: Date, default: Date.now, select: false },
  active: { type: Boolean, default: true, select: false }
});

module.exports.Priority = new willy.Model('Priority', {
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, select: false },
  updatedAt: { type: Date, default: Date.now, select: false },
  active: { type: Boolean, default: true, select: false }
});

module.exports.Issue = new willy.Model('Issue', {
  name: { type: String, required: true },
  description: { type: String, required: true },
  attach: { type: String, required: true },
  status: willy.ForeignKey('Status'),
  kind: willy.ForeignKey('Kind'),
  priority: willy.ForeignKey('Priority'),
  responsable: willy.ForeignKey('User'),
  project: willy.ForeignKey(module.exports.Project),
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
  readers: willy.ManyToMany(module.exports.User, 'ObjectId'),
  writers: willy.ManyToMany(module.exports.User, 'ObjectId'),
  admins: willy.ManyToMany(module.exports.User, 'ObjectId'),
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now, select: false },
  active: { type: Boolean, default: true }
});
