
import React, { Component, useState } from 'react'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import momentPlugin from '@fullcalendar/moment'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import ModalEvent from '../flowbite/modalEvent'



 let events = 0;
 let count = 0;
let valor =''

// reciv

  //let titless: string;

  type Agenda = {
    title: string;
   
  };

  interface events {
    Agendas2:Agenda
  }


//send
type Type_event = {
  title: string;
  start: string;
  end: string;
}; 



const EventContainer: Type_event = {
title: "Matematicas",
start: "",
end: "",
};

const EventContainer2: Type_event = {
  title: "",
  start: "",
  end: "",
  };


interface AppState {
  weekendsVisible: boolean,
  currentEvents: EventApi[],
  titles:string,
  description:string
}






export default class DemoApp extends React.Component {

   

  state: AppState = {
    weekendsVisible: true,
    currentEvents: [],
    titles: '',
    description: ""
    //titles: Agenda
  }

 
 


  render() {
    
   // { this.renderSidebar ()}

   //console.log("retorno "+ Agendas2.title);
    return (
      <div className='demo-app'>
       { this.renderSidebar ()}
       
        <div className='demo-app-main' id='button'>
       
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            titleFormat={'MMMM D, YYYY'} 
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}//{this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}//{this.handleEventClick} 
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            eventAdd={function(){
              console.log('listo!!')
              EventContainer2.title= 's'
              
             
            }}
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

  renderSidebar (){
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
      {<Calendar2 Agendas2={EventContainer2}/>}
      
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>            
            {this.state.currentEvents.map(renderSidebarEvent)}
            { this.state.currentEvents.flatMap(renderModal)}
          </ul>
        </div>
      </div>
    )
  }

handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })

  
  }

  handleDateSelect = (selectInfo: DateSelectArg) => {  
   
    EventContainer.title = "Matematicas"
    EventContainer.start = selectInfo.startStr
    EventContainer.end = selectInfo.endStr
      

 
     
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() 

    //setTimeout(() => {
      
    console.log(EventContainer2.title )
   
    
     
    
    //}, 500);
  
    SL(selectInfo);
    //handleEventClick2()
   
     events = this.state.currentEvents.length ; 

   
   
  }  

  handleEventClick = (clickInfo: EventClickArg) => {
    console.log(clickInfo.event.id)
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events
    })
  }

}



function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
      
    </>
  )
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
     
    </li>
  )
}

function renderModal(event: EventApi) {

  
  if (events !== 0) {
    count = count + 1;

    if (events === count) {

      count = 0;
      events = 0;
      return (

        <ModalEvent Agendas={EventContainer} />
      )
    }
  }
}

function SL(selectInfo: DateSelectArg){


  let calendarApi = selectInfo.view.calendar
 calendarApi.unselect() 
 
  console.log(EventContainer2.title+' TIME ' + EventContainer2.title);
 if(EventContainer2.title === ''){

  calendarApi.addEvent({
    id: createEventId(),
    title: EventContainer2.title,
    start: selectInfo.startStr,
    end: selectInfo.endStr, 
    allDay: selectInfo.allDay
  })
}

//EventContainer2.title=''
}


 //export default Calendar;


 export const Calendar2: React.FC<events> = ({ Agendas2 }) => {

  console.log( "calendar "+Agendas2.title)

  EventContainer2.title = Agendas2.title
  
 
   return (
    <p>{Agendas2.title}</p>
    
   )

  
   
   }
  
  






