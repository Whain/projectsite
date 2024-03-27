const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const {addquest, testsshow, testrender, walidanswers, addansw, getresults, deleteresult, deleteall, gettests, deletetest} = require('./functions')

const app = express()

const PORT = 3000
const frontpath = path.resolve('../', 'frontend')

app.set('view engine', 'ejs')
app.set('views', frontpath)

app.use(express.static(frontpath))
const jsonParser = bodyParser.json({limit: '50mb'})
const urlEcoded = bodyParser.urlencoded({limit: '50mb', extended: true})


app.listen(PORT, () => {
  console.log('Server has been started...')
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(frontpath, 'index.html'))
})

app.get('/classinfo', async (req, res) => {
  res.render(path.resolve(frontpath + '/pages/selecttest/index.ejs'), {
    data: await testsshow(req.query.class),
    classnumber: req.query.class
  })
})

app.get('/selecttest', async (req, res) => {
  res.render(path.resolve(frontpath + '/pages/test/index.ejs'), {
    test: await testrender(req.query.id, req.query.class)
  })
})

app.get('/testresults', async (req, res) => {
  res.render(path.resolve(frontpath + '/pages/resultspanel/index.ejs'), {
    results: await getresults()
  })
})

app.get('/testcontrol', async (req, res) => {
  res.render(path.resolve(frontpath + '/pages/testcontrol/index.ejs'), {
    tests: await gettests()
  })
})

app.delete('/deleteresult:id', async (req, res) => {
  await deleteresult(req.params.id)
  res.sendStatus(200)
})

app.delete('/deleteall', async (req, res) => {
  await deleteall()
  res.sendStatus(200)
})

app.delete('/deletetest:id', async (req, res) => {
  await deletetest(req.params.id)
  res.sendStatus(200)
})

app.post('/createtest', jsonParser, async (req, res) => {
  await addquest(req.body)
  console.log(req.body)
  res.sendStatus(200)
})

app.post('/completedtest', urlEcoded, async (req, res) => {
  const walidedanswers = await walidanswers(req.body)
  res.render(path.resolve(frontpath + '/pages/testresult/index.ejs'), {
    result: walidedanswers
  })
  await addansw(walidedanswers)
})

// [[], [], [], [], []]
