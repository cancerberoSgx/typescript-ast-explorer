import { Driver, InteractionSpecHelper } from 'cli-driver'
import { sleep, unique } from 'misc-utils-of-mine-generic'
import { debug } from 'accursed'
import { rm } from 'shelljs'
import { help } from '../src/ui/help'
import { strip } from 'accursed/dist/src/util/misc'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000

describe('astExplorerSpec', () => {
  let client: Driver
  let helper: InteractionSpecHelper

  beforeAll(async done => {
    client = new Driver()
    helper = new InteractionSpecHelper(client)
    await client.start(      {
      notSilent: true
    }    )
    // await sleep(200)
    done()
  })

  afterAll(async done => {
    await helper.clear()
    // await client.enter('npm run tput-reset')
    // await sleep(500)
    await client.destroy().catch()
    helper = null as any
    client = null as any
    done()
  })

  fit('should quit with q', async done => {
    // rm('-rf', 'log*.txt')
    let s = await client.enterAndWait('npx ts-node -T src/cli/cliMain', 'Project View');
    // await sleep(2000);
    // ['src','spec','help'].forEach(i=>expect(s).toContain(i))
    // await client.enter('npx ts-node -T src/cli/cliMain')
    // await sleep(200);
    // debug(s)
// let s = await helper.waitForStrippedDataToInclude('Project View') as string
s = strip(s).toLowerCase()
    expect(s).toContain('src')
    expect(s).toContain('spec')
    expect(s).toContain('help')
    // console.log('sebbbbb');
    // expect(await helper.waitForStrippedDataToInclude('Code View'))
    // await sleep(200) 
    await client.enter('q')
    // await sleep(200) 
    // await sleep(2000)
    // await client.enter('q')
   const exitStatus = await getLastExitCode(client)
// debug(exitStatus)
// debug(r&&r[1])
// debug(JSON.stringify(r))
    expect( await getLastExitCode(client)).toBe(0)
    // debug(s)
    // console.log('HSHSH', s);
    
    // await helper .expectLastExitCode(true)

    done()
  })

  it('should load project if --tsConfig given and show help modal on h key', async done => {
    let s = await client.enterAndWaitForData('npx ts-node -T src/cli/cliMain --tsConfig spec/assets/project1', 'Project View')
    expect(s).toContain('test')
    expect(s).not.toContain('Welcome to')

    await client.enterAndWaitForData('h', 'Welcome to')
    // s = await helper.waitForStrippedDataToInclude('Welcome to')

    // await client.time(300)
    await client.enter('q')
    // TODO: wait not to contain
    await client.time(300)
    await client.enter('q')
    await client.time(300)
    // await helper.expectLastExitCode(true)
    done()
  })
})

export async function getLastExitCode(client: Driver){
   await client.cleanData()
    const u = unique('exitStatus')
   let  s =await  client.enterAndWait(`echo ${u}_$?_`, d=>d.replace(`echo ${u}_$?_`, '').includes(u)) 
    // debug(s)
const rx = new RegExp(`${u}_([\\d]+)_`, 'gm')
s = s.replace(`echo ${u}_$?_`, '')
// debug(rx.toString(), s2)
const r = rx.exec( s)
let  exitStatus : number|undefined=   parseInt(r && r[1] ? r[1]:'')
exitStatus = isNaN(exitStatus) ? undefined: exitStatus
return exitStatus
}