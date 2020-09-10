// import { initFirestoreData, clearFirestoreData } from '../../../tests/firebaseSetup'
import { usePlayers } from '.'
import * as firebase from 'firebase'

/**
 * usePlayers unit tests
 */
describe('usePlayers unit tests', () => {
  it('inits without calling firebase', () => {
    const doc = jest.fn(() => ({ collection }))
    const collection = jest.spyOn(firebase.firestore(), 'collection').mockReturnValue(({ doc } as unknown) as any)
    const { players } = usePlayers()
    expect(collection).not.toHaveBeenCalled()
  })
})
