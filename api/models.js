var willy = require('./willy');

var models = {};

models.User = new willy.Model('User', {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

models.Version = new willy.Model('Version', {
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

models.Milestone = new willy.Model('Milestone', {
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

models.Component = new willy.Model('Component', {
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

models.Status = new willy.Model('Status', {
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

models.Kind = new willy.Model('Kind', {
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

models.Priority = new willy.Model('Priority', {
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

models.Issue = new willy.Model('Issue', {
  name: { type: String, required: true },
  description: { type: String, required: true },
  attach: { type: String, required: true },
  status: { type: Schema.Types.ObjectId, ref: 'Status' },
  kind: { type: Schema.Types.ObjectId, ref: 'Kind' },
  priority: { type: Schema.Types.ObjectId, ref: 'Priority' },
  responsable: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

models.Project = new willy.Model('Project', {
  name: { type: String, required: true },
  description: { type: String, required: true, default: '' },
  versions: [models.Version],
  milestones: [models.Milestone],
  components: [models.Component],
  issues: [models.Issue],
  readers: [models.User],
  writers: [models.User],
  admins: [models.User],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});