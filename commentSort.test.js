const readline = require("readline-sync")
const commentSort = require("./commentSort")
const axios = require("axios")

const consolelogSpy = jest.spyOn(global.console, "log")
consolelogSpy.mockImplementation(() => {})

const data = [{
  postId: 1,
  id: 1,
  name: 'id labore ex et quam laborum',
  email: 'Eliseo@gardner.biz',
  body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
},
{
  postId: 58,
  id: 287,
  name: 'voluptas ad autem maxime iusto eos dolorem ducimus est',
  email: 'Sedrick@mertie.tv',
  body: 'voluptatem perspiciatis voluptatum quaerat\nodit voluptates iure\nquisquam magnam voluptates ut non qui\naliquam aut ut amet sit consequatur ut suscipit'
},
  {
    postId: 2,
    id: 8,
    name: 'et omnis dolorem',
    email: 'Mallory_Kunze@marie.org',
    body: 'ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque'
  }]


test("Test search 2 keyword", () => {
  const expectedResult = [{
    postId: 1,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
  },
    {
      postId: 58,
      id: 287,
      name: 'voluptas ad autem maxime iusto eos dolorem ducimus est',
      email: 'Sedrick@mertie.tv',
      body: 'voluptatem perspiciatis voluptatum quaerat\nodit voluptates iure\nquisquam magnam voluptates ut non qui\naliquam aut ut amet sit consequatur ut suscipit'
    }]
  const readlineSpy = jest.spyOn(readline, "question")
  readlineSpy.mockImplementation(() => "magnam voluptate")
  const actualResult = commentSort.askSearch(data)
  expect(actualResult).toEqual(expectedResult)
  readlineSpy.mockRestore()
})

test("Test search with empty keyword", () => {
  const readlineSpy = jest.spyOn(readline, "question")
  readlineSpy.mockImplementation(() => "")
  const actualResult = commentSort.askSearch(data)
  expect(actualResult).toEqual(data)
  readlineSpy.mockRestore()
})

test("Test show more data if data less than limit", async () => {
  const readlineSpy = jest.spyOn(readline, "question")
  const moreDataSpy = jest.spyOn(commentSort, "moreData")
  const menuChooseSpy = jest.spyOn(commentSort, "formatByMenuChoosen")
  const axiosSpy = jest.spyOn(axios, "get")
  readlineSpy.mockImplementationOnce(() => "1").mockImplementationOnce(() => "exit")
  axiosSpy.mockImplementation(() => Promise.resolve({ data }))
  menuChooseSpy.mockImplementationOnce(() => returnedData = {
    data,
    isWrong: false,
    isExit: false
  }).mockImplementationOnce(() => returnedData = {
    data: null,
    isWrong: false,
    isExit: true
  })
  await commentSort.showData()
  expect(moreDataSpy).toHaveBeenCalledTimes(0)
  readlineSpy.mockRestore()
  axiosSpy.mockRestore()
  menuChooseSpy.mockRestore()
})