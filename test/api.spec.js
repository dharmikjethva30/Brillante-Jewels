const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app').app

chai.use(chaiHttp)
const expect = chai.expect

describe('Brillante Jewels API', () => {
  describe('GET /gold/price', () => {
    it('should retrieve the gold price', (done) => {
      chai
        .request(app)
        .get('/gold/price')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('price_22K')
          expect(res.body).to.have.property('price_24K')
          done()
        })
    })
  })

  describe('GET /item/price', () => {
    it('should retrieve the price of one item without time range', (done) => {
      const itemId = '646701241d88683141172bf0';
      chai
        .request(app)
        .get(`/item/price/?id=${itemId}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('currentPrice')
          expect(res.body).to.have.property('bestPrice')
          expect(res.body).to.have.property('bestPriceDate')
          done()
        })
    })

    it('should retrieve the price of one item with time range', (done) => {
      const itemId = '646701241d88683141172bf0';
      const timeRange = 10;
      chai
        .request(app)
        .get(`/item/price/?id=${itemId}&timeRange=${timeRange}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('currentPrice')
          expect(res.body).to.have.property('bestPrice')
          expect(res.body).to.have.property('bestPriceDate')
          done()
        })
    })

    it('should retrieve the price of all items without time range', (done) => {
      chai
        .request(app)
        .get('/item/price/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('result')
          done()
        })
    })

    it('should retrieve the price of all items with time range', (done) => {
      const timeRange = 10;
      chai
        .request(app)
        .get(`/item/price/?timeRange=${timeRange}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('result')
          done()
        })
    })
  })

  describe('POST /item/add', () => {
    it('should add a new item', (done) => {
      const newItem = {
        name: 'Earings',
        weight: 15
      }

      chai
        .request(app)
        .post('/item/add')
        .send(newItem)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('weight')
          expect(res.body).to.have.property('all_price')
          done()
        })
    })
  })

  describe('GET /item/update', () => {
    it('should update item prices', (done) => {
      chai
        .request(app)
        .get('/item/update')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message')
          done()
        }).timeout(1000000)
    })
  })
})
