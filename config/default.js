const path = require('path')
const os = require('os')

const isDebug = process.argv.includes('--debug')

const config = {
  debug: isDebug,
  pkg: require('../package.json'),
  port: process.env.PORT || 3000,
  ghToken: process.env.GH_TOKEN,
  ghRepo: {
    owner: 'tigerbrokers',
    repo: 'gem'
  },
  users: [{
    username: 'admin',
    password: 'tiger'
  }],
  execTimeout: 3 * 60 * 1000,
  dataDir: path.join(os.homedir(), '.cdpanel'),
  workDir: path.join(os.homedir(), '.cdpanel', 'workspace'),

  team: {
    ijse: { login: 'ijse', name: '李毅', ding: 'zk1018' },
    liushumei: { login: 'liushumei', name: '刘淑美', ding: 'h1sdi4p' },
    'wang-jia': { login: 'wang-jia', name: '王佳', ding: 'mhs08ci' },
    'gao-jx': { login: 'gao-jx', name: '高建勋', ding: 'wzp1ae8' },
    'JeannieMa': { login: 'JeannieMa', name: '马柳菁', ding: 'bc41cu6' },
    'pengcui123': { login: 'pengcui123', name: '彭翠', ding: 'a332eji' },
    'zhangsundanfeng': { login: 'zhangsundanfeng', name: '长孙丹凤', ding: 'ncczmkl' },
    'huihongzhou': { login: 'huihongzhou', name: '周汇虹', ding: 'y20_l3o3g5d5k' }
  }

}

module.exports = config
