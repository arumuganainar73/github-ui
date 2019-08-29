import githubService from './GithubService'
import getRouter from './router'
import $ from 'jquery'

async function repoList (username, language) {
    let repos = await githubService.getRepos(username, language)

    if(repos.length == 0) {
      return `
              <div id="repos">
                <p>No Repos available</p>
              </div>
             `
    }

    let template = `
                    <div id="repos">
                      <form>
                        <p id="username">${username}</p>
                        <label for="preferredLanguage">Language</label>
                        <input type="text" id="preferredLanguage" value="${language}"/>
                        <button type="button" id="filterBtn">Filter</button>
                      </form>
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
                   $(() => {
                     initHandler()
                   })
      return template
}



let initHandler = () => {
  $('#filterBtn').on('click', function(){
    let language = $('#preferredLanguage').val()
    let username = $("#username").text()
    getRouter().navigateTo(`repos/${username}/${language}`)
  })
}

export default repoList
