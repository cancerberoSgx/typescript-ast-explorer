import { ansi, Driver } from 'cli-driver'
import { Helper } from './interactionHelper'
import { Ansi } from 'cli-driver/lib/src/ansi';

jasmine.DEFAULT_TIMEOUT_INTERVAL=20000

describe('astExplorerSpec', () => {
  let client: Driver
  let helper: Helper

  beforeAll(async done => {
    client = new Driver()
    helper = new Helper(client)
    await client.start({
      notSilent: true
    })
    done()
  })

  afterAll(async done => {
    await client.destroy().catch()
    helper = null as any
    done()
  })

  it('should quit with q', async done => {
    client.enter('npx ts-node src/cliMain')
    expect(await helper.waitForStrippedDataToInclude('Files and Nodes'))
    expect(await helper.waitForStrippedDataToInclude('ViewCode'))
    await client.enter('q')
    await helper.expectLastExitCode(true)
    done()
  })
})

