import React, { useState } from "react";

import {
  Button,
  DatePicker,
  InputNumber,
  Input,
  Select,
  Radio,
  Form,
} from "antd";

import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

const dayOfWeek = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
  { id: 7, name: "Sunday" },
];

const months = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

const startOnWeek = [
  { id: 1, name: "First" },
  { id: 2, name: "Secound" },
  { id: 3, name: "Third" },
  { id: 4, name: "Fourth" },
  { id: 5, name: "Last" },
];

function SchedulerSetting({ config, onSubmit }) {
  const [form] = Form.useForm();
  const [mode, setMode] = useState(null);

  const renderSelectMonth = () => (
    <Select
      mode="multiple"
      placeholder="Select Month"
      style={{ minWidth: 300 }}
    >
      {months.map((month) => (
        <Option value={month?.id}>{month?.name}</Option>
      ))}
    </Select>
  );

  const onFinish = (values) => {
    const {
      content,
      startDate,
      endDate,
      day,
      month,
      week,
      repeatEvery,
    } = values;
    // console.log("values", values);

    const schedule = {
      Mode: mode,
      Description: null,
      StartDate: startDate ? dayjs(startDate).format() : null,
      EndDate: endDate ? dayjs(endDate).format() : null,
      Content: content,
      Day: day,
      Week: week,
      Month: month,
      RepeatEvery: repeatEvery,
    };
    onSubmit(schedule);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="scheduler-setting-component">
        <div className="container-date-picker">
          {config.showStartDate && (
            <div className="date-picker-wrapper">
              <h3>Start</h3>
              <Form.Item name="startDate">
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </div>
          )}
          {config.showEndDate && (
            <div className="date-picker-wrapper end-date-picker">
              <h3>End</h3>
              <Form.Item name="endDate">
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </div>
          )}
        </div>
        {config.showRepeatDay && (
          <div className="container-item container-repeat-every">
            Repeat Every
            <Form.Item name="repeatEvery">
              <InputNumber
                min={1}
                max={30}
                defaultValue={1}
                className="input-select"
              />
            </Form.Item>
            Days
          </div>
        )}
        {config.showRepeatWeek && (
          <div className="container-item container-repeat-every">
            Repeat Every
            <Form.Item name="repeatEvery">
              <InputNumber
                min={1}
                max={30}
                defaultValue={1}
                className="input-select"
              />
            </Form.Item>
            Week On
            <span className="input-select">
              <Form.Item name="day">
                <Select placeholder="Select Day of Week">
                  {dayOfWeek.map((day) => (
                    <Option value={day?.id}>{day?.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </span>
          </div>
        )}

        {config.showSelectMonth && (
          <div className="container-item">
            <h3>Month</h3>
            <div>
              <Form.Item name="month">{renderSelectMonth()}</Form.Item>
            </div>
            <div className="container-item ">
              <div className="radio-wrapper">
                <Radio checked={mode === "day"} onClick={() => setMode("day")}>
                  Day{" "}
                </Radio>
                {mode === "day" && (
                  <span className="input-select">
                    <Form.Item name="month">{renderSelectMonth()}</Form.Item>
                  </span>
                )}
              </div>
              <div className="radio-wrapper">
                <Radio
                  checked={mode === "week"}
                  onClick={() => setMode("week")}
                >
                  On{" "}
                </Radio>
                {mode === "week" && (
                  <span className="input-select">
                    <Form.Item name="week">
                      <Select
                        mode="multiple"
                        placeholder="Select Week"
                        style={{ minWidth: 300 }}
                      >
                        {startOnWeek.map((day) => (
                          <Option value={day?.id}>{day?.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {config.showWriteMessage && (
          <div className="container-item">
            <h3>Write Message</h3>
            <div className="container-text-input">
              <div className="title-wrapper" />
              <div className="input-wrapper">
                <Form.Item name="content">
                  <TextArea rows={4} />
                </Form.Item>
                <div className="input-info-wrapper">
                  <p>Credit 1</p>
                  <p>Charactor 0</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container-button">
          <Button onClick={() => form.resetFields()}>Cancel</Button>
          <Form.Item>
            <Button type="primary" className="button-next" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}

export default SchedulerSetting;
