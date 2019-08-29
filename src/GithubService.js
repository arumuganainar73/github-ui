import axios from "axios"
import Repo from './Repo'

let githubService = {
  getRepos : (username) => {
          return axios
                .get(`https://api.github.com/users/${username}/repos`)
                .then(function(response){
                    let repos = response.data
                    return repos.map(x => new Repo(x.name, x.language, x.updated_at, x.private))
                })
                .catch(function(error){
                    return []
                })
  }
}

export default githubService
