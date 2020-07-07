describe('My First Test',function(){
  it('Does not do much',function(){
    expect(true).to.equal(true)
  })
})

describe('App',function(){
  it('Loads App',function(){
    cy.visit('http://localhost:4000/')
    cy.contains('Squarepants')
    cy.contains('Running Waters')
    cy.contains('0:00')
    cy.contains('2:47')
  })
})
describe('endPoint',function(){
  it('Loads 101 Albums',()=>{
    var oldUrl= 'http://localhost:4000/'
    cy.request('http://fakespotify-env.eba-qqeare6m.us-west-1.elasticbeanstalk.com/albums')
    .its('body')
    .should('have.length',101)
  })
  it('Loads song',()=>{
    var url= 'http://fakespotify-env.eba-qqeare6m.us-west-1.elasticbeanstalk.com/songs/5eebfe07a386ca12ede16e2c';
    var oldUrl= 'http://localhost:4000/songs/5eebfe07a386ca12ede16e2c'
    cy.request(url)
      .then((res)=>{
        expect(res.body).have.property('title')
      })
  })
})