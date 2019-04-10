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

  it('should run simple test basic usage path', async done => {
    await client.enterAndWaitForData('npx ts-node spec/astExplorer/test1.ts', 'Animal')
    await client.enterAndWaitForData('', 'selectedNode')
    expect(client.getStrippedDataFromLastWrite()).toContain(`{ selectedNode: 'Animal' }`)
    await helper.expectLastExitCode(true)

    await client.enterAndWaitForData('npx ts-node spec/astExplorer/test1.ts', 'Animal')
    await client.writeAndWaitForData(ansi.cursor.down(2), 'class')
    await client.enterAndWaitForData('', 'selectedNode')
    expect(client.getStrippedDataFromLastWrite()).toContain(`{ selectedNode: 'name' }`)
    await helper.expectLastExitCode(true)
    done()
  })
  it('should navigate thought all kind of nodes one by one', async done => {
    await client.enterAndWaitForData('npx ts-node spec/astExplorer/test1.ts', 'Animal')
    await client.enterAndWaitForData('', 'selectedNode')
    expect(client.getStrippedDataFromLastWrite()).toContain(`{ selectedNode: 'Animal' }`)
    await helper.expectLastExitCode(true)

    await client.enterAndWaitForData('npx ts-node spec/astExplorer/test1.ts', 'Animal')
    await client.writeAndWaitForData(ansi.cursor.down(2), 'class')
    await client.enterAndWaitForData('', 'selectedNode')
    expect(client.getStrippedDataFromLastWrite()).toContain(`{ selectedNode: 'name' }`)
    await helper.expectLastExitCode(true)
    done()
  })
})
