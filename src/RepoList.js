import githubService from './GithubService'

async function repoList (username) {
    let repos = await githubService.getRepos(username)

    if(repos.length == 0) {
      return `
              <div id="repos">
                <p>No Repos available</p>
              </div>
             `
    }

    let template = `
                    <div id="repos">
                      <table class="table">
                        <tr>
                          <th>name</th>
                          <th>language</th>
                          <th>updatedAt</th>
                          <th>private</th>
                        </tr>
                        ${repos.map(repo => `
                          <tr>
                            <td>${repo.name}</td>
                            <td>${repo.language}</td>
                            <td>${repo.updatedAt}</td>
                            <td>${repo.private}</td>
                          </tr>
                          `).join('')

                        }
                      </table>
                    </div>
                   `
      return template
}

export default repoList
