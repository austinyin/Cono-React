import React, {Component} from 'react'
import './style.scss'


class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.InputChangeHandle = this.InputChangeHandle.bind(this);
        this.selectHandle = this.selectHandle.bind(this);
        this.removeSelectedHandle = this.removeSelectedHandle.bind(this);
        this.state = {
            selectedList: this.props.selectedList,
            filterList: [],
            itemList: this.props.itemList,
        }

    }

    InputChangeHandle(e) {
        const value = e.target.value
        if (!value) {
            this.setState({
                filterList: [],
            });
            return
        }
        const {selectedList} = this.state
        const {itemList} = this.props
        const filterList = itemList.filter(item => {
            return item.label.includes(value) && selectedList.indexOf(item) === -1
        });
        this.setState({
            filterList: filterList
        })
    }

    selectHandle(e) {
        /**
         * 选出元素
         */
        const index = e.target.id.split('-').pop()
        const item = this.state.filterList[index]
        this.state.selectedList.push(item)
        this.setState({
            filterList: [],
        }, () => {
            this.refs.searchInput.value = '';
        })
    }

    removeSelectedHandle(e){
        /**
         * 删除元素
         */
        const {selectedList} = this.state
        const itemId = e.target.previousElementSibling.id; //获取到a元素id。
        const index = parseInt(itemId.split('-').pop());
        selectedList.forEach((v,k) => {
            if(k === index){
                selectedList.splice(k,1)
            }
            return v
        });
        this.setState({
            selectedList
        })
    }



    render() {
        const {selectedList, filterList} = this.state
        return (
            <div id="multiSelect">
                <div className="selected-list">
                    <ul>
                        {selectedList.map((v, k) => {
                            return (
                                <li className="selected-item">
                                    <a id={`selected-${k}`}>{v.label}</a>
                                    <span onClick={this.removeSelectedHandle} className="select-item-remove-button">x</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <input ref="searchInput" onKeyUp={this.props.inputOnKeyUp} placeholder="搜索你要@的对象吧" onChange={this.InputChangeHandle} type="text"/>
                <ul>
                    {filterList.map((v, k) => {
                        return (
                            <li>
                                <a onClick={this.selectHandle} id={`select-${k}`}>{v.label}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}


export default MultiSelect




