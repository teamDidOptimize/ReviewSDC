const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ReviewSDC', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


let reviewPhotosSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  owner: String,
  forks: Number,
  url: String,
  name: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (usersRepos) => {
  var currentRepo = new Repo({
    // { type: String, unique: true }
    id: usersRepos.id,
    forks: usersRepos.forks,
    login: usersRepos.owner.login,
    url: usersRepos.owner.html_url,
    name: usersRepos.name
  });

  currentRepo.save()
    .then(() => {
      console.log('saved!');
    })
}


module.exports.save = save;
module.exports.Repo = Repo;