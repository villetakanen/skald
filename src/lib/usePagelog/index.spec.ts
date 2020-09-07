// import { initFirestoreData, clearFirestoreData } from '../../../tests/firebaseSetup'
import { usePagelog } from '.'
import * as firebase from 'firebase'
/**
 * usePagelog integration test suite
 */
describe('usePagelog integration tests', () => {
  /* beforeEach(() => {
    initFirestoreData()
  })

  afterEach(() => {
    clearFirestoreData()
  }) */

  it('reads a pagelog', () => {
    // const update = jest.fn();
    // const doc = jest.fn(() => ({update}));
    const onSnapshot = jest.fn()
    const collection = jest.spyOn(firebase.firestore(), 'collection').mockReturnValue(({ onSnapshot } as unknown) as any)

    const { pagelog } = usePagelog()

    expect(onSnapshot).toHaveBeenCalled()
  })

  it('upserts a pagelog entry', () => {
    const set = jest.fn().mockResolvedValue(Promise.resolve(1))
    const update = jest.fn().mockResolvedValue(Promise.resolve(1))
    const doc = jest.fn(() => ({ set, update }))
    const collection = jest.spyOn(firebase.firestore(), 'collection').mockReturnValue(({ doc } as unknown) as any)

    const { stamp } = usePagelog()
    stamp('create', 'mekanismi')

    expect(collection).toHaveBeenCalled()
    expect(doc).toHaveBeenCalled()
    expect(set).toHaveBeenCalled()
  })

  it('does not upser a pagelog entry, if missing page id and action id', () => {
    const set = jest.fn().mockResolvedValue(Promise.resolve(1))
    const update = jest.fn().mockResolvedValue(Promise.resolve(1))
    const doc = jest.fn(() => ({ set, update }))
    const collection = jest.spyOn(firebase.firestore(), 'collection').mockReturnValue(({ doc } as unknown) as any)

    const { stamp } = usePagelog()
    stamp('', '')

    expect(update).not.toHaveBeenCalled()
    expect(set).not.toHaveBeenCalled()
  })
})
