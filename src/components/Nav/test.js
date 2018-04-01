/**
 * waiting finish
 */
import jest from "jest";
import { shallow } from 'enzyme'
import Nav from './index'
import {store} from 'src/index'
import {login} from "src/extra/Account/actions";
const accountInit = () => {
    return new Promise.resolve()
    const testAccount = {username:'username',password:'password'}
    store.dispatch(login(testAccount))
}
describe('rendering', () => {
    let wrapper
    beforeEach(() => {
        accountInit().then(()=>{
            wrapper = shallow(<Nav account={store.Account}/>)
        })
    })
    it('should render a Notices/>', () => {
        expect(wrapper.find('Notices').toHaveLength(1))
    })
    it('should render a Notices/>', () => {
        expect(wrapper.find('Notices').toHaveLength(1))
    })

    describe('interaction', () =>{
        let showNotice
        let afterShowNotice
        beforeEach(() => {
            showNotice = wrapper.state
            wrapper.toggleNoticeHandle()
        })
        it('should toggle state\'s showNotice', () =>{
            afterShowNotice = wrapper.state
            expect(showNotice).to.equal(afterShowNotice);
        })
    })
})