const { name } = require('ejs')
const fs = require('fs/promises')

const addquest = async (quest) => {
  console.log('add')
  const tests = await require('./files/tests.json')
  switch (quest['classnumber']) {
    case '7':
      tests[0].push(quest)
      break
    case '8':
      tests[1].push(quest)
      break
    case '9':
      tests[2].push(quest)
      break
    case '10':
      tests[3].push(quest)
      break
    case '11':
      tests[4].push(quest)
      break
  }
  await fs.writeFile('./files/tests.json', JSON.stringify(tests))
}

const testsshow = async (classnumber) => {
  const tests = await require('./files/tests.json')
  let testsnames = []
  switch (classnumber) {
    case '7':
      tests[0].forEach((test) => {
        testsnames.push({
          title: test.testtitle,
          id: test.id
        })
      })
      break
    case '8':
      tests[1].forEach((test) => {
        testsnames.push({
          title: test.testtitle,
          id: test.id
        })
      })
      break
    case '9':
      tests[2].forEach((test) => {
        testsnames.push({
          title: test.testtitle,
          id: test.id
        })
      })
      break
    case '10':
      tests[3].forEach((test) => {
        testsnames.push({
          title: test.testtitle,
          id: test.id
        })
      })
      break
    case '11':
      tests[4].forEach((test) => {
        testsnames.push({
          title: test.testtitle,
          id: test.id
        })
      })
      break
  }
  return testsnames
}

const testrender = async (id, classnumber) => {
  const tests = await require('./files/tests.json')
  let finaltest = {}
  switch (classnumber) {
    case '7':
      tests[0].forEach((test) => {
        if (test.id == id) {
          finaltest = test
        }
      })
      break
    case '8':
      tests[1].forEach((test) => {
        if (test.id == id) {
          finaltest = test
        }
      })
      break
    case '9':
      tests[2].forEach((test) => {
        if (test.id == id) {
          finaltest = test
        }
      })
      break
    case '10':
      tests[3].forEach((test) => {
        if (test.id == id) {
          finaltest = test
        }
      })
      break
    case '11':
      tests[4].forEach((test) => {
        if (test.id == id) {
          finaltest = test
        }
      })
      break
  }
  return finaltest
}

const walidanswers = async (answers) => {
  const id = answers.id
  const classnumber = answers.classnumber
  const classinfo = answers.classinfo
  const surname = answers.surname
  delete answers.id
  delete answers.classnumber
  delete answers.classinfo
  delete answers.surname
  const allcorrectansw = await testrender(id, classnumber)
  const answlength = Object.keys(answers).length
  let correctcounter = 0
  const answervalues = Object.values(answers)
  const values = answervalues.map((item) => {
    return item.replaceAll(' ', '').toLowerCase()
  })
  for (let i = 0; i < answlength; i++) {
    if (values[i] === allcorrectansw.correctansw[i]) {
      correctcounter++
    }
  }
  const percent = ((correctcounter/answlength) * 100).toFixed()
  let grade = 0
  if (percent >= 90) {
    grade = 5
  } else if (percent >= 75) {
    grade = 4
  } else if (percent >= 60) {
    grade = 3
  } else {
    grade = 2
  }
  return {id: Date.now(), class: classinfo, name: surname, correctquantity: correctcounter, allansw: answlength, grade: grade, correctansw: allcorrectansw.correctansw, answers: values}
}

const addansw = async (answers) => {
  const results = await require('./files/results.json')
  results.push(answers)
  await fs.writeFile('./files/results.json', JSON.stringify(results))
}

const getresults = async () => {
  return await require('./files/results.json')
}

const gettests = async () => {
  return await require('./files/tests.json')
}

const deleteresult = async (id) => {
  const results = await require('./files/results.json')
  let index = 0
  for (result of results) {
    if (result.id == id) {
      results.splice(index++, 1)
    }
  }
  await fs.writeFile('./files/results.json', JSON.stringify(results))
}

const deleteall = async () => {
  const results = await require('./files/results.json')
  results.splice(0)
  await fs.writeFile('./files/results.json', JSON.stringify(results))
}

const deletetest = async (id) => {
  const tests = await require('./files/tests.json')
  classnumber = 0
  for (classtest of tests) {
    let index = 0
    for (test of classtest) {
      if (test.id == id) {
        tests[classnumber].splice(index, 1)
      }
      index++
    }
    classnumber++
  }
  await fs.writeFile('./files/tests.json', JSON.stringify(tests))
}

module.exports = {
  addquest, testsshow, testrender, walidanswers, addansw, getresults, deleteresult, deleteall, gettests, deletetest
}