/**
 * @fileoverview TOAST UI Calendar React wrapper component
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 */
import React from "react";
import TuiCalendar from "tui-calendar";
var CalendarUI = require("tui-calendar"); /* CommonJS */
require("tui-calendar/dist/tui-calendar.css");

// If you use the default popups, use this.
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

  static defaultProps = {
    height: "700px",
    view: "month",

    useDetailPopup: true,
  };

  calendarInst = null;

  componentDidMount() {
    const { schedules = [], view } = this.props;

    this.calendarInst = new TuiCalendar(this.rootEl.current, {
      isReadOnly: true,
      ...this.props,
      defaultView: view,
    });
    this.setSchedules([
      {
        id: "1",
        calendarId: "1",
        title: "Site Launch",
        category: "time",
        start: "Mon Nov 16 2020 06:50:56 GMT-1000",
        end: "Mon Nov 16 2020 06:50:56 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#FF33FF",
      },
      {
        id: "2",
        calendarId: "2",
        title: " Jodo Mission Lahaina",
        category: "time",
        start: "Mon Nov 3 2020 8:00:00 GMT-1000",
        end: "Mon Nov 3 2020 09:00:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
        recurrenceRule: "Weekly",
      },
      {
        id: "3",
        calendarId: "3",
        title: "Island Spirit Yoga",
        category: "time",
        start: "Mon Nov 3 2020 17:30:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        end: "Mon Nov 3 2020 019:00:00 GMT-1000",
        bgColor: "#3333CC44",
      },
      {
        id: "2",
        calendarId: "2",
        title: " Jodo Mission Lahaina",
        category: "time",
        start: "Mon Nov 10 2020 8:00:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
        recurrenceRule: "Weekly",
      },
      {
        id: "3",
        calendarId: "3",
        title: "Island Spirit Yoga",
        category: "time",
        start: "Mon Nov 10 2020 17:30:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
      },
      {
        id: "2",
        calendarId: "2",
        title: " Jodo Mission Lahaina",
        category: "time",
        start: "Mon Nov 17 2020 8:00:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
        recurrenceRule: "Weekly",
      },
      {
        id: "3",
        calendarId: "3",
        title: "Island Spirit Yoga",
        category: "time",
        start: "Mon Nov 17 2020 17:30:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
      },
      {
        id: "4",
        calendarId: "4",
        title: "Jodo Mission Lahaina",
        category: "time",
        start: "Nov 6 2020 8:00:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",

        bgColor: "#3333CC44",
      },
      {
        id: "4",
        calendarId: "4",
        title: "Jodo Mission Lahaina",
        category: "time",
        start: "Nov 13 2020 8:00:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",

        bgColor: "#3333CC44",
      },
      {
        id: "4",
        calendarId: "4",
        title: "Jodo Mission Lahaina",
        category: "time",
        start: "Nov 20 2020 8:00:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",

        bgColor: "#3333CC44",
      },
      {
        id: "4",
        calendarId: "4",
        title: "Jodo Mission Lahaina",
        category: "time",
        start: "Nov 27 2020 8:00:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",

        bgColor: "#3333CC44",
      },
      {
        id: "5",
        calendarId: "5",
        title: "Island Spirit Yoga",
        category: "time",
        body: "<a href='#'>Find Out More</a>",
        start: "Nov 7 2020 9:00:00 GMT-1000",
        bgColor: "#3333CC44",
      },
      {
        id: "5",
        calendarId: "5",
        title: "Island Spirit Yoga",
        category: "time",
        body: "<a href='#'>Find Out More</a>",
        start: "Nov 14 2020 9:00:00 GMT-1000",
        bgColor: "#3333CC44",
      },
      {
        id: "5",
        calendarId: "5",
        title: "Island Spirit Yoga",
        category: "time",
        body: "<a href='#'>Find Out More</a>",
        start: "Nov 21 2020 9:00:00 GMT-1000",
        bgColor: "#3333CC44",
      },
      {
        id: "5",
        calendarId: "5",
        title: "Island Spirit Yoga",
        category: "time",
        body: "<a href='#'>Find Out More</a>",
        start: "Nov 28 2020 9:00:00 GMT-1000",
        bgColor: "#3333CC44",
      },
      {
        id: "2",
        calendarId: "2",
        title: " Jodo Mission Lahaina",
        category: "time",
        start: "Mon Nov 24 2020 8:00:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
        recurrenceRule: "Weekly",
      },
      {
        id: "3",
        calendarId: "3",
        title: "Island Spirit Yoga",
        category: "time",
        start: "Mon Nov 24 2020 17:30:00 GMT-1000",
        body: "<a href='#'>Find Out More</a>",
        bgColor: "#3333CC44",
      },
    ]);

    this.bindEventHandlers(this.props);
  }

  alldayTitle() {
    return "All Day";
  }
  shouldComponentUpdate(nextProps) {
    const { calendars, height, schedules, theme, view } = this.props;

    if (height !== nextProps.height) {
      this.getRootElement().style.height = height;
    }

    if (calendars !== nextProps.calendars) {
      this.setCalendars(nextProps.calendars);
    }

    if (schedules !== nextProps.schedules) {
      this.calendarInst.clear();
      this.setSchedules(nextProps.schedules);
    }

    if (theme !== nextProps.theme) {
      this.calendarInst.setTheme(this.cloneData(nextProps.theme));
    }

    if (view !== nextProps.view) {
      this.calendarInst.changeView(nextProps.view);
    }

    optionProps.forEach((key) => {
      if (this.props[key] !== nextProps[key]) {
        this.setOptions(key, nextProps[key]);
      }
    });

    this.bindEventHandlers(nextProps, this.props);

    return false;
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
