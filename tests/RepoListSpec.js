import repoList from './../src/RepoList'
import Repo from './../src/Repo'
import $ from 'jquery'

describe("Github Repo list", function(){

  let repo1 = new Repo("repo1", "JS", "2015-01-29T11:52:47Z", false)
  let repo2 = new Repo("repo2", "C#", "2015-01-29T11:52:47Z", false)
  let serviceSpy
  // let serviceSpy = jasmine.createSpyObj("Github service", {
  //     getRepos: [repo1, repo2]
  // })

  beforeEach(function(){
    // repoList.__Rewire__("githubService", serviceSpy)
  })

  afterEach(function(){
    repoList.__ResetDependency__("githubService")
  })

    describe("Repos for user", function(){
      it("Should be defined", function(){
        serviceSpy = jasmine.createSpyObj("Github service", {
            getRepos: [repo1, repo2]
        })
        repoList.__Rewire__("githubService", serviceSpy)
        expect(repoList).toBeDefined()
      })

      it("Should fetch repos from service for user", function(done){
        serviceSpy = jasmine.createSpyObj("Github service", {
            getRepos: [repo1, repo2]
        })
        repoList.__Rewire__("githubService", serviceSpy)
        repoList("username").then(function(){
          expect(serviceSpy.getRepos).toHaveBeenCalledWith("username")
          done()
        })
      })

      it("Should fetch repos from service for user", function(done){
        serviceSpy = jasmine.createSpyObj("Github service", {
            getRepos: [repo1, repo2]
        })
        repoList.__Rewire__("githubService", serviceSpy)
          repoList("username").then(function(){
            expect(serviceSpy.getRepos).toHaveBeenCalledWith("username")
            done()
          })


      })

      it("Should create table of repos", function(done){
        serviceSpy = jasmine.createSpyObj("Github service", {
            getRepos: [repo1, repo2]
        })
        repoList.__Rewire__("githubService", serviceSpy)
          repoList("username").then(function(html){
            appendSetFixtures(html)

            let rows = $("#repos table tr")
            expect(rows.length).toEqual(3)
            done()
          })
      })

      it("Should return no repos available", function(done){
        serviceSpy = jasmine.createSpyObj("Github service", {
            getRepos: []
        })
        repoList.__Rewire__("githubService", serviceSpy)
          repoList("username").then(function(html){
            appendSetFixtures(html)

            let rows = $("#repos table tr")
            expect(rows.length).toEqual(0)

            let p = $("#repos p")
            expect(p.text()).toEqual("No Repos available")
            done()
          })
      })
    })
})
