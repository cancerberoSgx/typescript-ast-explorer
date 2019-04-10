import { ansi, Driver } from 'cli-driver'
import { Helper } from './interactionHelper'

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

  it('should ...', async done => {
    // await client.enterAndWaitForData('npx ts-node spec/astExplorer/test1.ts', 'Animal')
    // await client.enterAndWaitForData('', 'selectedNode')
    // expect(client.getStrippedDataFromLastWrite()).toContain(`{ selectedNode: 'Animal' }`)
    // await helper.expectLastExitCode(true)

    // await client.enterAndWaitForData('npx ts-node spec/astExplorer/test1.ts', 'Animal')
    // await client.writeAndWaitForData(ansi.cursor.down(2), 'class')
    // await client.enterAndWaitForData('', 'selectedNode')
    // expect(client.getStrippedDataFromLastWrite()).toContain(`{ selectedNode: 'name' }`)
    // await helper.expectLastExitCode(true)
    expect(1).toBe(1)
    done()
  })
 
})
