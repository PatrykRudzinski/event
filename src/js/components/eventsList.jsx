import React from 'react';
import {EditIndexedDB} from "../scripts/editIndexedDb.js";
import {Redirect} from 'react-router-dom';

class Event extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            redirect: false
        }
    }

    deleteEvent = (e, id) => {

        const events = new EditIndexedDB();
        events.del(id)
    };

    updateEvent = (e, data) => {

        this.setState({
            data: data,
            redirect: true
        });
    };

    translateCategory = (cat) => {

        const lib = {
            Music: 'Muzyka',
            Sport: 'Sport',
            Cinema: 'Kino',
            Art: 'Sztuka',
            Science: 'Nauka'
        };
        return lib[cat];
    };

    render(){

        if(this.state.redirect) {

            return <Redirect to={{
                pathname: '/newevent',
                data: this.state.data
            }} />
        }

        return <div className={'event'}>
            <button onClick={e => this.deleteEvent(e, this.props.data.id)}>Usuń wydarzenie</button>
            <button onClick={e => this.updateEvent(e, this.props.data)}>Edytuj wydarzenie</button>
            < br/>
            <img src={this.props.data.pic} alt=""/>
            <h2>{this.props.data.tit}</h2>
            <h3>{this.props.data.org}</h3>
            <p>start: {this.props.data.startDate}</p>
            <p>koniec: {this.props.data.endDate}</p>
            <p>{this.props.data.des}</p>
            <p>{this.props.data.locCity}</p>
            <p>{this.translateCategory(this.props.data.cat)}</p>
            <p>do wydarzenia pozostalo....</p>
            <p>od wydarzenia dzieli Cie....</p>
        </div>

    }
}

class EventsList extends React.Component{

    constructor(props){
        super(props);
        this.events = new EditIndexedDB();
        this.events.read().then(res=>{this.setState({events: res})});
        this.state = {
            events : null,
            
            searchCity: '',
            searchTitle: '',
            
            filterMusic: true,
            filterSport: true,
            filterCinema: true,
            filterArt: true,
            filterScience: true
        }
    }

    updateFilter = (e) => {
        const temp = {};
        temp[e.target.value] = !this.state[e.target.value];
        this.setState(temp)
    };

    updateSearch = (e) => {
        const temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp)
    };

    render() {

        let list = null;
        let listToRender = null;

        if(this.state.events) {
            
            list = this.state.events;
            
            if (this.state.searchTitle || this.state.searchCity) {
                list = list
                    .filter(e => {
                        const ix = e.tit.toLowerCase().indexOf(this.state.searchTitle.toLowerCase());
                        if(ix > -1) {
                            e.indexTitle = ix;
                            return true;
                        }
                    })
                    .filter(e => {
                        const ix = e.loc.toLowerCase().indexOf(this.state.searchCity.toLowerCase());
                        if(ix > -1) {
                            e.indexCity = ix;
                            return true;
                        }
                    })
                    .sort((a,b) => a.indexCity - b.indexCity)
                    .sort((a,b) => a.indexTitle - b.indexTitle);
            }

            list = list.filter(e => {
                const filter = `filter${e.cat}`;
                if(this.state[filter]) return true;
            });

            listToRender = list.map((e) => {
                    return <Event
                        key={e.id}
                        data={{
                            id: e.id,
                            tit: e.tit,
                            org: e.org,
                            pic: e.pic,
                            startDate: e.startDate,
                            endDate: e.endDate,
                            des: e.des,
                            locCity: e.locCity,
                            locStreet: e.locStreet,
                            cat: e.cat,
                        }}

                    />

                //console.log(this.state.startDate.diff(moment(), 'days'));
                });
        }

        return <main>
            <section>
                <input type="text"
                       name='searchTitle'
                       placeholder='nazwa wydarzenia'
                       value={this.state.searchTitle}
                       onChange={this.updateSearch}
                />
                <input type="text"
                       name='searchCity'
                       placeholder='miasto'
                       value={this.state.searchCity}
                       onChange={this.updateSearch}
                />
            </section>
            <section>
                <input
                    type="checkbox"
                    name="category"
                    value="filterMusic"
                    checked={this.state.filterMusic}
                    onChange={e => this.updateFilter(e)}
                />Muzyka<br />
                <input
                    type="checkbox"
                    name="category"
                    value="filterSport"
                    checked={this.state.filterSport}
                    onChange={e => this.updateFilter(e)}
                />Sport<br />
                <input
                    type="checkbox"
                    name="category"
                    value="filterCinema"
                    checked={this.state.filterCinema}
                    onChange={e => this.updateFilter(e)}
                />Kino<br />
                <input
                    type="checkbox"
                    name="category"
                    value="filterArt"
                    checked={this.state.filterArt}
                    onChange={e => this.updateFilter(e)}
                />Sztuka<br />
                <input
                    type="checkbox"
                    name="category"
                    value="filterScience"
                    checked={this.state.filterScience}
                    onChange={e => this.updateFilter(e)}
                />Nauka<br />
            </section>
                {listToRender}
        </main>
    }
}

export {EventsList}