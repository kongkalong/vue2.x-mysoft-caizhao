import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(Axios)

mock.onGet('/list').reply(200, require('./datas/list.json'))
mock.onGet('/banner').reply(200, require('./datas/banner.json'))

export default mock
