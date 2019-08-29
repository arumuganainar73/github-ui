import githubService from './../src/GithubService'

describe("Github Service", function(){

  let repo1 = {name: "repo1", language: "JS", private: false, updated_at: "2015-01-29T11:52:47Z" }
  let repo2 = {name: "repo2", language: "language1", private: false, updated_at: "2015-01-29T11:52:47Z" }
  let repo3 = {name: "repo3", language: "language1", private: false, updated_at: "2015-01-29T11:52:47Z" }
  let repos = [repo1, repo2, repo3]
  let axiosSpy
  // let axiosSpy = jasmine.createSpyObj("axios", {
  //     get: Promise.resolve({data: repos})
  // })

  beforeEach(function(){
    // githubService.__Rewire__("axios", axiosSpy)
  })

  afterEach(function(){
    githubService.__ResetDependency__("axios")
  })

  describe("Get Repos for user", function(){


    it("Should be defined", function(){
      axiosSpy = jasmine.createSpyObj("axios", {
          get: Promise.resolve({data: repos})
      })
      githubService.__Rewire__("axios", axiosSpy)

      expect(githubService.getRepos).toBeDefined()
    })

    it("Should call axios get repos api", function(){
      axiosSpy = jasmine.createSpyObj("axios", {
          get: Promise.resolve({data: repos})
      })
      githubService.__Rewire__("axios", axiosSpy)

      githubService.getRepos("githubUserName")

      expect(axiosSpy.get).toHaveBeenCalled()
    })

    it("Should call axios get api with username", function(){
      axiosSpy = jasmine.createSpyObj("axios", {
          get: Promise.resolve({data: repos})
      })
      githubService.__Rewire__("axios", axiosSpy)

      githubService.getRepos("githubUserName")

      expect(axiosSpy.get).toHaveBeenCalledWith("https://api.github.com/users/githubUserName/repos")
    })

    it("Should return all repos for if language is all", function(done){

      axiosSpy = jasmine.createSpyObj("axios", {
          get: Promise.resolve({data: repos})
      })
      githubService.__Rewire__("axios", axiosSpy)

      githubService.getRepos("user1", "all").then(function(repos){
        expect(repos.length).toEqual(3)
        done()
      })

    })

    it("Should provide only language1 repos", function(done){

      axiosSpy = jasmine.createSpyObj("axios", {
          get: Promise.resolve({data: repos})
      })
      githubService.__Rewire__("axios", axiosSpy)

      githubService.getRepos("user1", "language1").then(function(repos){
        expect(repos.length).toEqual(2)
        expect(repos[0].name).toEqual("repo2")
        expect(repos[1].name).toEqual("repo3")
        done()
      })

    })

    it("Should handle failure response", function(done){


      axiosSpy = jasmine.createSpyObj("axios", {
          get: Promise.reject("Error Happened")
      })
      githubService.__Rewire__("axios", axiosSpy)

      githubService.getRepos("user1").then(function(repos){
        expect(repos.length).toEqual(0)
        done()
      })

    })



  })

})
