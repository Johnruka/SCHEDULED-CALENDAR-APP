import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import validator from 'validator';
import { HiMiniPlus } from "react-icons/hi2";
import { AiOutlineSave } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const MeetingForm = ({
  setShowAlert,
  showEdit,
  meetingFormData,
  setMeetingFormData,
  handleCreateButton
}) => {
  const { register, handleSubmit, setValue, getFieldState, clearErrors, formState: { errors } } = useFormContext();
  const apiEndpoint = "http://localhost:8080/api/meetings";

  useEffect(() => {
    Object.keys(meetingFormData).forEach(key => {
      setValue(key, meetingFormData[key]);
    });
  }, [meetingFormData, setValue]);

  const fetchHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa('admin:password')}` // Replace with your token retrieval logic
  };

  const handleCreateMeeting = async (data) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: fetchHeaders,
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to create meeting');
      }

      const result = await response.json();
      console.log('Meeting created successfully:', result);
      setShowAlert(true);
      handleClearEvent();
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const handleUpdateMeeting = async (data) => {
    try {
      const response = await fetch(`${apiEndpoint}/${data.id}`, {
        method: 'PUT',
        headers: fetchHeaders,
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to update meeting');
      }

      const result = await response.json();
      console.log('Meeting updated successfully:', result);
      setShowAlert(true);
      handleClearEvent();
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  };

  const validateDate = (enteredDate) => {
    const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    if (validator.isDate(enteredDate, { format: "YYYY-MM-DD" }) && validator.isBefore(enteredDate, formattedCurrentDate)) {
      return "Enter a future date!";
    }
    return true;
  };

  const validateStartTime = (enteredTime) => {
    const currentDateTime = new Date();
    const formattedCurrentDateTime = `${String(currentDateTime.getFullYear()).padStart(2, '0')}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')}T${String(currentDateTime.getHours()).padStart(2, '0')}:${String(currentDateTime.getMinutes()).padStart(2, '0')}`;
    const enteredDateTime = `${document.getElementById("dateFor").value}T${enteredTime}`;
    if (validator.isTime(enteredTime, { format: "HH:mm" }) && validator.isBefore(enteredDateTime, formattedCurrentDateTime)) {
      return "Enter future time! Use format HH:mm!";
    }
    return true;
  };

  const validateEndTime = (enteredTime) => {
    const enteredStartTime = `${document.getElementById("dateFor").value}T${document.getElementById("startTime").value}`;
    const enteredEndTime = `${document.getElementById("dateFor").value}T${enteredTime}`;
    if (validator.isTime(enteredTime, { format: "HH:mm" }) && validator.isBefore(enteredEndTime, enteredStartTime)) {
      return "End time should be after start time!";
    }
    return true;
  };

  const validateEmails = (enteredEmails) => {
    const emailArray = enteredEmails.split(",").map(email => email.trim());
    if (emailArray.length > 5) {
      return "Maximum of 5 emails can be entered";
    }
    for (const email of emailArray) {
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        return `${email} is not a valid email.`;
      }
    }
    return true;
  };

  const handleClearEvent = () => {
    handleCreateButton();
    setShowAlert(false);
    setMeetingFormData({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      level: '',
      participants: '',
      description: ''
    });
    clearErrors();
  };

  const handleFormValues = (name, value) => {
    setShowAlert(false);
    setValue(name, value, { shouldValidate: true });
    setMeetingFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit(showEdit ? handleUpdateMeeting : handleCreateMeeting)}>
      <div className='row'>
        <div className='col-md-1'>
          <label htmlFor="titleFor" className='form-label fw-bold'>Meeting Title</label>
        </div>
        <div className='col-md-4'>
          <input type="text" className='form-control' id='titleFor' placeholder='Enter meeting title'
            {...register("title", {
              required: { value: true, message: "Title is required" },
              onChange: (event) => handleFormValues("title", event.target.value)
            })}
            value={meetingFormData.title}
          />
          {errors.title && <span className='invalid-feedback d-block'>{errors.title.message}</span>}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <label htmlFor="dateFor" className='form-label fw-bold'>Meeting Date</label>
          <input type="date" className='form-control' id='dateFor'
            {...register("date", {
              required: { value: true, message: "Date is required" },
              validate: validateDate,
              onChange: (event) => handleFormValues("date", event.target.value)
            })}
            value={meetingFormData.date}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.date && <span className='invalid-feedback d-block'>{errors.date.message}</span>}
        </div>
        <div className='col-md-4'>
          <label htmlFor="startTime" className='form-label fw-bold'>Start Time</label>
          <input type="time" className='form-control' id='startTime'
            {...register("startTime", {
              required: { value: true, message: "Start Time is required" },
              validate: validateStartTime,
              onChange: (event) => handleFormValues("startTime", event.target.value)
            })}
            value={meetingFormData.startTime}
            disabled={getFieldState("date") && (!getFieldState("date").isDirty || errors.date)}
          />
          {errors.startTime && <span className='invalid-feedback d-block'>{errors.startTime.message}</span>}
        </div>
        <div className='col-md-4'>
          <label htmlFor="endTime" className='form-label fw-bold'>End Time</label>
          <input type="time" className='form-control' id='endTime'
            {...register("endTime", {
              required: { value: true, message: "End Time is required" },
              validate: validateEndTime,
              onChange: (event) => handleFormValues("endTime", event.target.value)
            })}
            value={meetingFormData.endTime}
            disabled={getFieldState("startTime") && (!getFieldState("startTime").isDirty || errors.startTime)}
          />
          {errors.endTime && <span className='invalid-feedback d-block'>{errors.endTime.message}</span>}
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-6'>
          <label htmlFor="locationFor" className='form-label fw-bold'>Meeting Location</label>
          <input type="text" className='form-control' id='locationFor' placeholder='Enter meeting location'
            {...register("location", {
              required: { value: true, message: "Location is required" },
              onChange: (event) => handleFormValues("location", event.target.value)
            })}
            value={meetingFormData.location}
          />
          {errors.location && <span className='invalid-feedback d-block'>{errors.location.message}</span>}
        </div>
        <div className='col-md-6'>
          <label htmlFor="levelFor" className='form-label fw-bold'>Meeting Level</label>
          <select className="form-select" id="levelFor"
            {...register("level", {
              required: { value: true, message: "Level is required" },
              onChange: (event) => handleFormValues("level", event.target.value)
            })}
            value={meetingFormData.level}
          >
            <option value="">Choose level</option>
            <option value="Team">Team</option>
            <option value="Company">Company</option>
            <option value="Department">Department</option>
          </select>
          {errors.level && <span className='invalid-feedback d-block'>{errors.level.message}</span>}
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-12'>
          <label htmlFor="participantsFor" className='form-label fw-bold'>Participants</label>
          <input type="text" className='form-control' id='participantsFor' placeholder='Enter participant emails separated by commas'
            {...register("participants", {
              required: { value: true, message: "Participants are required" },
              validate: validateEmails,
              onChange: (event) => handleFormValues("participants", event.target.value)
            })}
            value={meetingFormData.participants}
          />
          {errors.participants && <span className='invalid-feedback d-block'>{errors.participants.message}</span>}
        </div>
      </div>
      <div className='mt-3'>
        <label htmlFor="descriptionFor" className='form-label fw-bold'>Description</label>
        <textarea className='form-control' id='descriptionFor' rows="2" placeholder='Enter meeting description'
          {...register("description", {
            required: { value: true, message: "Description is required" },
            onChange: (event) => handleFormValues("description", event.target.value)
          })}
          value={meetingFormData.description}
        />
        {errors.description && <span className='invalid-feedback d-block'>{errors.description.message}</span>}
      </div>
      <div className='form-group mt-2'>
        <button type="submit" className='btn btn-success mx-2'>
          {showEdit ? <AiOutlineSave /> : <HiMiniPlus />} {showEdit ? "Update Meeting" : "Submit"}
        </button>
        <button type="button" className='btn btn-warning mx-2' onClick={handleClearEvent}>
          <MdDelete /> Clear
        </button>
      </div>
    </form>
  );
};

export default MeetingForm;
