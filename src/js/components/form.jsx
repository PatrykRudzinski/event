import React from "react";
import DatePicker from "react-datepicker";
import {EditIndexedDB} from "../scripts/editIndexedDb.js";

import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class OverallInfo extends React.Component {

    constructor(props){

        super(props);
        this.state ={
            tit: this.props.data ? this.props.data.tit : '',
            org: this.props.data ? this.props.data.org : '',
            cat: this.props.data ? this.props.data.cat : ''
        };

    }

    updateState = (e, stateKey) => {

        const temp = {};
        temp[stateKey] = e.target.value;
        this.setState(temp);

    };

    sendData = (e, dataKey) => {

        const temp = {};
        temp[dataKey] = e.target.value;
        this.props.collectData(temp);
        
    };

    render() {

        const list = this.props.categories.map((el, i)=>{
            return <option value={el} key={el+i}>{el}</option>
        });

        return <div className={'form-block__overall'}>
            <input type="text"
                   placeholder="Tytuł wydarzenia"
                   value={this.state.tit}
                   onChange={e => this.updateState(e, "tit") }
                   onBlur={ e => this.sendData(e, "tit") }
            />
            <input type="text"
                   placeholder="Organizator"
                   value={this.state.org}
                   onChange={e => this.updateState(e, "org") }
                   onBlur={ e => this.sendData(e, "org") }
            />
            <select value={this.state.cat}
                    onChange={e => this.updateState(e, "cat") }
                    onBlur={ e => this.sendData(e, "cat") }
            >
                {list}
            </select>
        </div>
    }
}

class Dates extends React.Component {
    constructor (props) {
        super(props);
        let start = null;
        let end = null;

        if(this.props.data) {
            start = this.parseDate(this.props.data.startDate);
            end = this.parseDate(this.props.data.endDate);
        }

        this.state = {
            startDate: start ? moment(start) : moment(),
            endDate: end ? moment(end) : moment()
        };
    }

    parseDate = (date) => {
        const ar = date.split(/[- :]+/).map( e => {
            return parseInt(e, 10)
        });
        const temp = ar[0];
        ar[0] = ar[2];
        ar[2] = temp;
        ar[1]--;
        return ar;
    };

    updateStartDate=(date)=>{
        this.setState({
            startDate: date
        });
        //console.log(this.state.startDate.diff(moment(), 'days'));
    };

    updateEndDate=(date)=>{
        this.setState({
            endDate: date
        })
    };

    sendDataStart=(e)=>{
        this.props.collectData({'startDate': e.target.value})
    };

    sendDataEnd=(e)=>{
        this.props.collectData({'endDate': e.target.value})
    };

    render() {
        return <div className={'form-block__dates'}>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.updateStartDate}
                onBlur={this.sendDataStart}
                showTimeSelect
                timeFormat="h:mm"
                timeIntervals={15}
                dateFormat="D-MM-YYYY h:mm"
                timeCaption="time"
                locale="pl"
                placeholderText="początek wydarzenia"
            />
            <DatePicker
                selected={this.state.endDate}
                onChange={this.updateEndDate}
                onBlur={this.sendDataEnd}
                showTimeSelect
                timeFormat="h:mm"
                timeIntervals={30}
                dateFormat="D-MM-YYYY h:mm"
                timeCaption="time"
                locale="pl"
                placeholderText="koniec wydarzenia"
            />
        </div>
    }
}

class Localization extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            loc: this.props.data ? this.props.data.loc : ''
        }
    }

    updateLoc=(e)=>{
        this.setState({
            loc: e.target.value
        })
    };

    sendData=(e)=>{
        this.props.collectData({'loc': e.target.value})
    };

    render() {
        return <div className={'form-block__localization'}>
            <input type="text"
                   placeholder="lokalizacja"
                   value={this.state.loc}
                   onChange={this.updateLoc}
                   onBlur={this.sendData}
            />
        </div>
    }
}

class Description extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            des: this.props.data ? this.props.data.des : ''
        }
    }

    updateDesc=(e)=>{
        this.setState({
            des: e.target.value
        })
    };

    sendData=(e)=>{
        this.props.collectData({'des': e.target.value})
    };

    render() {
        return <div className={'form-block__description'}>
            <textarea name=""
                      id=""
                      cols="30"
                      rows="10"
                      defaultValue={this.state.des}
                      onChange={this.updateDesc}
                      onBlur={this.sendData}
            ></textarea>
        </div>
    }
}

class Picture extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            pic: this.props.data ? this.props.data.pic : ''
        }
    }

    updatePic=(e)=>{
        this.setState({
            pic: e.target.value
        })
    };

    sendData=(e)=>{
        this.props.collectData({'pic': e.target.value})
    };

    render() {
        return <div className={'form-block__picture'}>
            <input type="text"
                   placeholder="adres zdjecia"
                   value={this.state.pic}
                   onChange={this.updatePic}
                   onBlur={this.sendData}
            />
        </div>
    }
}

class Submit extends React.Component {
    render() {
        return <div className={'form-block__button'}>
            <button type={'submit'}>Dodaj</button>
        </div>
    }
}

class Form extends React.Component{

    validated =()=> {
        return true
    };

    submitHandle = (e) => {
        e.preventDefault();

        if(this.validated()) {

            const data = this.state;
            const myEditIndexedDB = new EditIndexedDB();

            if(this.props.data) {
                data.id = this.props.data.id;
                myEditIndexedDB.update(data.id, data);
            } else {
                data.id = new Date().valueOf();
                myEditIndexedDB.add(data);
            }

        } else {
            this.validated();
        }
    };

    componentDidMount() {
        if(this.props.data) this.collectData(this.props.data)
    }
    
    collectData=(data)=>{
        this.setState(data);
    };

    render() {

        return <form className={'add-event__form'} onSubmit={this.submitHandle}>
            <OverallInfo
                categories={['Muzyka', 'Sport', 'Kino', 'Sztuka', 'Nauka']}
                collectData={this.collectData}
                data={this.props.data}
            />
            <Dates
                collectData={this.collectData}
                data={this.props.data}
            />
            <Localization
                collectData={this.collectData}
                data={this.props.data}
            />
            <Description
                collectData={this.collectData}
                data={this.props.data}
            />
            <Picture
                collectData={this.collectData}
                data={this.props.data}
            />
            <Submit />
        </form>
    }
}

export {Form};
