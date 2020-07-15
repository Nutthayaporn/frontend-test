import React, { useState } from "react";
import "./App.scss";

import { Tabs } from "antd";

import SchedulerSetting from "./components/SchedulerSetting";

const { TabPane } = Tabs;

const tabs = [
  {
    id: 1,
    key: "sendNow",
    name: "Send Now",
    config: {
      showWriteMessage: true,
    },
  },
  {
    id: 2,
    key: "oneTime",
    name: "One time",
    config: {
      showStartDate: true,
      showWriteMessage: true,
    },
  },
  {
    id: 3,
    key: "daily",
    name: "Daily",
    config: {
      showStartDate: true,
      showEndDate: true,
      showRepeatDay: true,
      showWriteMessage: true,
    },
  },
  {
    id: 4,
    key: "weekly",
    name: "Weekly",
    config: {
      showStartDate: true,
      showEndDate: true,
      showRepeatWeek: true,
      showWriteMessage: true,
    },
  },
  {
    id: 5,
    key: "monthly",
    name: "Monthly",
    config: {
      showStartDate: true,
      showEndDate: true,
      showRepeatWeek: true,
      showSelectMonth: true,
      showWriteMessage: true,
    },
  },
];

function App() {
  const [scheduleType, setScheduleType] = useState("sendNow");

  const handleSubmit = (values) => {
    const schedule = values;
    schedule.ScheduleType = scheduleType;

    console.log("Schedule", schedule);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Scheduler Setting</h1>
        <Tabs
          defaultActiveKey={scheduleType}
          onChange={(key) => setScheduleType(key)}
        >
          {tabs.map((tab) => {
            return (
              <TabPane tab={tab?.name} key={tab?.key}>
                <SchedulerSetting
                  config={tab?.config}
                  onSubmit={handleSubmit}
                />
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default App;
