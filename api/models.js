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

models.Project = new willy.Model('Project', {
  name: { type: String, required: true },
  description: { type: String, required: true, default: '' },
  versions: [models.Versions],
  milestones: [models.Milestones],
  components: [models.Components],
  issues: [models.Issues],
  readers: [models.Users],
  writers: [models.Users],
  admins: [models.Users],
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
  status: models.Status,
  kind: models.Kind,
  priority: models.Priority,
  response: models.User,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});
