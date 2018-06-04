import React from "react";
import DatePicker from "react-datepicker";
import AddNewEvent from 'addNewEvent.js'

import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


class OverallInfo extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            title: '',
            org: '',
            category: ''
        }
    }

    updateTitle=(e)=>{
        this.setState({
            title: e.target.value
        })
    };

    updateOrg=(e)=>{
        this.setState({
            org: e.target.value
        })
    };

    updateCategory=(e)=>{
        this.setState({
            category: e.target.value
        })
    };

    render() {

        const list = this.props.categories.map((el, i)=>{
            return <option value={el} key={el+i}>{el}</option>
        });

        return <div className={'form-block__overall'}>
            <input type="text"
                   placeholder="Tytuł wydarzenia"
                   value={this.state.title}
                   onChange={this.updateTitle}
            />

            <input type="text"
                   placeholder="Organizator"
                   value={this.state.org}
                   onChange={this.updateOrg}
            />
            <select value={this.state.category}
                    onChange={this.updateCategory}
            >
                {list}
            </select>
        </div>
    }
}

class Dates extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment()
        };
    }

    updateStartDate=(date)=>{
        this.setState({
            startDate: date
        });
        console.log(this.state.startDate.diff(moment(), 'days'));
    };

    updateEndDate=(date)=>{
        this.setState({
            endDate: date
        })
    };

    render() {
        return <div className={'form-block__dates'}>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.updateStartDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
                locale="pl"
                placeholderText="początek wydarzenia"
            />
            <DatePicker
                selected={this.state.endDate}
                onChange={this.updateEndDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="LLL"
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
            loc: ''
        }
    }
    updateLoc=(e)=>{
        this.setState({
            loc: e.target.value
        })
    };

    render() {
        return <div className={'form-block__localization'}>
            <input type="text"
                   placeholder="lokalizacja"
                   value={this.state.loc}
                   onChange={this.updateLoc}
            />
        </div>
    }
}

class Description extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            desc: ''
        }
    }

    updateDesc=(e)=>{
        this.setState({
            desc: e.target.value
        })
    };

    render() {
        return <div className={'form-block__description'}>
            <textarea name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={this.state.desc}
                      onChange={this.updateDesc}
            >sad</textarea>
        </div>
    }
}

class Picture extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            pic: ''
        }
    }

    updatePic=(e)=>{
        this.setState({
            pic: e.target.value
        })
    };

    render() {
        return <div className={'form-block__picture'}>
            <input type="text"
                      placeholder="adres zdjecia"
                      value={this.state.pic}
                      onChange={this.updatePic}
            />
        </div>
    }
}

class Submit extends React.Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }

    render() {
        return <div className={'form-block__button'}>
            <button type={'submit'}>Dodaj</button>
        </div>
    }
}

class Form extends React.Component{
    render() {
        return <form className={'add-event__form'} onSubmit={AddNewEvent()}>
            <OverallInfo categories={['Muzyka', 'Sport', 'Kino', 'Sztuka', 'Nauka']} />
            <Dates />
            <Localization />
            <Description />
            <Picture />
            <Submit />
        </form>
    }
}

export {Form};
