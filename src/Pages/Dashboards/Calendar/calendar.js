/**
 * @fileoverview TOAST UI Calendar React wrapper component
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */
import React from "react";
import TuiCalendar from "tui-calendar";
require("tui-calendar/dist/tui-calendar.css");

require("tui-date-picker/dist/tui-date-picker.css");
require("tui-time-picker/dist/tui-time-picker.css");
/**
 * Calendar's options prop
 * @type {string[]}
 */
const optionProps = [
  "disableDblClick",
  "isReadOnly",
  "month",
  "scheduleView",
  "taskView",
  "theme",
  "timezones",
  "week",
];
export default class Calendar extends React.Component {
  rootEl = React.createRef();

  componentDidMount() {
    var WEEKLY_CUSTOM_THEME = {
      // week header 'dayname'
      "week.dayname.height": "41px",
      "week.dayname.borderTop": "1px solid #ddd",
      "week.dayname.borderBottom": "1px solid #ddd",
      "week.dayname.borderLeft": "1px solid #ddd",
      "week.dayname.paddingLeft": "5px",
      "week.dayname.backgroundColor": "inherit",
      "week.dayname.textAlign": "left",
      "week.pastDay.color": "#999",

      // week vertical panel 'vpanel'
      "week.vpanelSplitter.border": "1px solid #ddd",
      "week.vpanelSplitter.height": "3px",

      // week daygrid 'daygrid'
      "week.daygrid.borderRight": "1px solid #ddd",
      "week.daygrid.backgroundColor": "inherit",

      "week.daygridLeft.width": "77px",
      "week.daygridLeft.backgroundColor": "#a8def74d",
      "week.daygridLeft.paddingRight": "5px",
      "week.daygridLeft.borderRight": "1px solid #ddd",

      "week.today.backgroundColor": "#888888",
      "week.weekend.backgroundColor": "inherit",

      // week timegrid 'timegrid'
      "week.timegridLeft.width": "77px",
      "week.timegridLeft.backgroundColor": "#03a9f44d",
      "week.timegridLeft.borderRight": "1px solid #ddd",
      "week.timegridLeft.fontSize": "12px",
      "week.timegridLeftTimezoneLabel.height": "51px",
      "week.timegridLeftAdditionalTimezone.backgroundColor": "#fdfdfd",

      "week.timegridOneHour.height": "48px",
      "week.timegridHalfHour.height": "24px",
      "week.timegridHalfHour.borderBottom": "1px dotted #f9f9f9",
      "week.timegridHorizontalLine.borderBottom": "1px solid #eee",

      "week.timegrid.paddingRight": "10px",
      "week.timegrid.borderRight": "1px solid #ddd",
      "week.timegridSchedule.borderRadius": "0",
      "week.timegridSchedule.paddingLeft": "0",

      "week.currentTime.color": "#135de6",
      "week.currentTime.fontSize": "12px",
      "week.currentTime.fontWeight": "bold",

      "week.pastTime.color": "#808080",
      "week.pastTime.fontWeight": "normal",

      "week.futureTime.color": "#333",
      "week.futureTime.fontWeight": "normal",

      "week.currentTimeLinePast.border": "1px solid rgba(19, 93, 230, 0.3)",
      "week.currentTimeLineBullet.backgroundColor": "#135de6",
      "week.currentTimeLineToday.border": "1px solid #135de6",
      "week.currentTimeLineFuture.border": "1px solid #135de6",

      // week creation guide style
      "week.creationGuide.color": "#135de6",
      "week.creationGuide.fontSize": "12px",
      "week.creationGuide.fontWeight": "bold",

      // week daygrid schedule style
      "week.dayGridSchedule.borderRadius": "25px",
      "week.dayGridSchedule.height": "55px",
      "week.dayGridSchedule.marginTop": "2px",
      "week.dayGridSchedule.marginLeft": "55px",
      "week.dayGridSchedule.marginRight": "55px",
    };
    const { schedules = [], view, taskView, hourStart } = this.props;

    this.calendarInst = new TuiCalendar(this.rootEl.current, {
      isReadOnly: true,
      ...this.props,
      defaultView: view,
      taskView: true,
      milestoneView: false,
      scheduleView: false,
      theme: WEEKLY_CUSTOM_THEME,
      template: {
        milestone: function (schedule) {
          return (
            '<span style="color:red;"><i class="fa fa-flag"></i> ' +
            schedule.title +
            "</span>"
          );
        },
        milestoneTitle: function () {
          return null;
        },
        task: function (schedule) {
          return "&nbsp;&nbsp;#" + schedule.title;
        },
        taskTitle: function () {
          return null;
        },
        allday: function (schedule) {
          return schedule.title + ' <i class="fa fa-refresh"></i>';
        },
        alldayTitle: function () {
          return "All Day";
        },
        time: function (schedule) {
          return (
            schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start
          );
        },
      },
    });
    this.setSchedules([
      {
        id: "1",
        calendarId: "3",
        title: "Island Spirit Yoga <br />",
        category: "task",
        start: "Tue Dec 19 2020 17:30:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
        recurrenceRule: "Weekly",
      },
      {
        id: "2",
        calendarId: "2",
        title: " Jodo Mission Lahaina ",
        category: "task",
        start: "Tue Dec18 2020 8:00:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
        recurrenceRule: "weekly",
      },
      {
        id: "3",
        calendarId: "3",
        title: "Island Spirit Yoga",
        category: "task",
        start: "Tue Dec15 2020 17:30:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
      },
      {
        id: "2",
        calendarId: "2",
        title: " Jodo Mission Lahaina",
        category: "task",
        start: " 15Dec 2020 8:00:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        task: " Jodo Mission Lahaina ",
        bgColor: "#3333CC44",
      },
      {
        id: "3",
        calendarId: "3",
        title: "Island Spirit Yoga",
        category: "task",
        start: "Tue Dec22 2020 17:30:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
      },
    ]);

    this.bindEventHandlers(this.props);
  }

  alldayTitle() {
    return "All Day";
  }

  componentWillUnmount() {
    this.calendarInst.destroy();
  }

  cloneData(data) {
    return JSON.parse(JSON.stringify(data));
  }

  setCalendars(calendars) {
    if (calendars && calendars.length) {
      this.calendarInst.setCalendars(calendars);
    }
  }

  setSchedules(schedules) {
    if (schedules && schedules.length) {
      this.calendarInst.createSchedules(schedules);
    }
  }

  setOptions(propKey, prop) {
    this.calendarInst.setOptions({ [propKey]: prop });
  }

  getInstance() {
    return this.calendarInst;
  }

  getRootElement() {
    return this.rootEl.current;
  }

  bindEventHandlers = (props) => {
    const eventHandlerNames = Object.keys(props).filter((key) =>
      /^on[A-Z][a-zA-Z]+/.test(key)
    );

    eventHandlerNames.forEach((key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);
      this.calendarInst.off(eventName);
      this.calendarInst.on(eventName, props[key]);
    });
  };

  render() {
    return <div ref={this.rootEl} style={{ height: this.props.height }} />;
  }
}
