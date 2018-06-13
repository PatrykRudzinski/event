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

    updateEvent = (e, id, data) => {

        this.setState({
            data: data,
            redirect: true
        });

    };

    render(){

        if(this.state.redirect) {
            return <Redirect to={{
                pathname: '/event',
                data: this.state.data
            }} />
        }

        return <div className={'event'}>
            <button onClick={e => this.deleteEvent(e, this.props.data.id)}>Usuń wydarzenie</button>
            <button onClick={e => this.updateEvent(e, this.props.data.id, this.props.data)}>Edytuj wydarzenie</button>
            <img src={this.props.data.pic} alt=""/>
            <h2>{this.props.data.tit}</h2>
            <h3>{this.props.data.org}</h3>
            <p>start: {this.props.data.startDate}</p>
            <p>koniec: {this.props.data.endDate}</p>
            <p>{this.props.data.des}</p>
            <p>{this.props.data.loc}</p>
            <p>{this.props.data.cat}</p>
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
            events : null
        }
    }
    render() {

        //Możliwość wyszukiwania po tytule i/lub lokalizacji
        //Do wyboru: filtrowanie lub sortowanie (implementacja dowolna, im bardziej rozbudowana tym lepiej)

        const list = this.state.events && this.state.events.map((e)=>{
            return <Event
                key={e.id}
                data = {{
                    id : e.id,
                    tit : e.tit,
                    org : e.org,
                    pic : e.pic,
                    startDate : e.startDate,
                    endDate : e.endDate,
                    des : e.des,
                    loc : e.loc,
                    cat : e.cat,
                }}
            />
        });

        return <main>
            <section>
                <form action="">
                    <input type="text" placeholder='nazwa wydarzenia'/>
                    <input type="text" placeholder='miasto'/>
                </form>
            </section>
            <section>
                <div>sortuj</div>
                <div>filtruj</div>
            </section>
                {list}
        </main>
    }
}

export {EventsList}