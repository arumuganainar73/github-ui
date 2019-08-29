import axios from "axios"
import Repo from './Repo'

let githubService = {
  getRepos : (username, language) => {
          return axios
                .get(`https://api.github.com/users/${username}/repos`)
                .then(function(response){
                    let repos = response.data
                    if (language == "all") {
                      return createRepoObj(repos)
                    }
                    return createRepoObj(repos.filter(x => x.language == language))

                })
                .catch(function(error){
                    return []
                })
  }
}

let createRepoObj = (repos) => repos.map(x => new Repo(x.name, x.language, x.updated_at, x.private))

export default githubService
