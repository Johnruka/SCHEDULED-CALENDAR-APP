import React from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { AiOutlineSave } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { addMeetingData, updateMeetingData } from '../../service/MeetingAPI';


const ScheduleMeeting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = () => {
    if(!document.getElementById('createMeeting').disabled) {
        addMeetingData(props.meetingFormData);
        props.setAlertName("CREATED");
        props.setAlertColor("success");
  } else {
    updateMeetingData(props.editId, props.meetingFormData);
    document.getElementById("createMeeting").disabled = false;
    document.getElementById("editMeeting").disabled = true;
    props.setAlertName("EDITED");
    props.setAlertColor("warning");
}
props.setShowAlert(true);
props.clearFields();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Meeting Title</label>
        <input
          {...register("meeting title", {
            required: "Title is required",
          })}
          placeholder="Enter meeting title"
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
        />
        {errors.title && (
          <div className="invalid-feedback">{errors.title.message}</div>
        )}
      </div>
      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Meeting Date</label>
          <input
            {...register("date", {
              required: "Date is required",
              validate: {
                notPastDate: (value) => {
                  const today = new Date();
                  const selectedDate = new Date(value);
                  return (
                    selectedDate >= today.setHours(0, 0, 0, 0) ||
                    "Date cannot be in the past"
                  );
                },
              },
            })}
            type="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
          />
          {errors.date && (
            <div className="invalid-feedback">{errors.date.message}</div>
          )}
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Meeting Time</label>
          <input
            {...register("time", {
              required: "Time is required",
              validate: {
                notPastTime: (value) => {
                  const today = new Date();
                  const selectedDate = watch("date");
                  if (!selectedDate) return "Please select a date first";

                  const selectedDateTime = new Date(`${selectedDate}T${value}`);
                  return (
                    selectedDateTime >= today || "Time must be in the future"
                  );
                },
              },
            })}
            type="time"
            className={`form-control ${errors.time ? "is-invalid" : ""}`}
          />
          {errors.time && (
            <div className="invalid-feedback">{errors.time.message}</div>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Meeting Level</label>
        <select
          {...register("level", { required: "Level is required" })}
          className={`form-control ${errors.level ? "is-invalid" : ""}`}
        >
          <option value="">Choose Level</option>
          <option value={"team"}>Team</option>
          <option value={"department"}>Department</option>
          <option value={"company"}>Company</option>
        </select>
        {errors.level && (
          <div className="invalid-feedback">{errors.level.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Participants</label>
        <input
          {...register("participants", {
            required: "Participants are required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email is invalid",
            },
          })}
          placeholder="Enter participant emails"
          type="text"
          className={`form-control ${errors.participants ? "is-invalid" : ""}`}
        />
        {errors.participants && (
          <div className="invalid-feedback">{errors.participants.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 5,
              message: "Description is too short",
            },
          })}
          placeholder="Enter meeting description"
          type="text"
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          rows="3"
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </div>
      <div className='mt-2'>
                <button type="submit" className='btn btn-success mx-2' id="createMeeting"><HiMiniPlus /> Create Meeting</button>
                <button type="submit" className='btn btn-success mx-2' id="editMeeting" style={{backgroundColor: "#fd7e14"}} disabled><AiOutlineSave /> Edit</button>
                <button type="button" className='btn btn-warning mx-2' id="clearFields" onClick={() => { props.setShowAlert(false); props.clearFields(); }}><MdClear /> Clear</button>
            </div>
      
    </form>
  );
};

export default ScheduleMeeting;