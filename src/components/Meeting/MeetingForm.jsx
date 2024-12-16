import { useState, useEffect } from "react";
import axios from "axios";


const MeetingForm = () => {
  const apiEndPoint = "http://localhost:8080";

  const [editingMeeting] = useState(null);
  const [onMeetingUpdated] = useState(false);
  const [onMeetingAdded] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    meetingDate: "",
    startTime: "",
    endTime: "",
    location: "",
    level: "",
    participants: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [labels, setLabels] = useState({
    titleLabel: "Title", 
    dateLabel: "Date",
    startTimeLabel: "Start Time",
    endTimeLabel: "End Time",
    levelLocation: "Location",
    levelLabel: "Level",
    participantsLabel: "Participants",
    descriptionLabel: "Description",
  });

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const fetchedLabels = await axios.getLabels(apiEndPoint + '/api/labels');
        setLabels(fetchedLabels);
      } catch (error) {
        console.error("Failed to fetch form labels:", error);
      }
    };
    fetchLabels();
  }, []);

  
  useEffect(() => {
    if (editingMeeting) {
      setFormData(editingMeeting);
    }
  }, [editingMeeting]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const validateParticipantEmails = (emails) => {
    if (!emails.trim()) return false;
    const emailList = emails.split(",").map((email) => email.trim());
    return emailList.every((email) => validateEmail(email));
  };

  const validateTimes = (startTime, endTime) => {
    if (!startTime || !endTime) return true;
    const Date = formData.Date || "2000-01-01";
    const start = new Date(`${Date}T${startTime}`);
    const end = new Date(`${Date}T${endTime}`);
    return end > start;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.Date) {
      newErrors.Date = "Meeting date is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.Date);
      if (selectedDate < today) {
        newErrors.Date = "Meeting date cannot be in the past";
      }
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (formData.startTime && formData.endTime) {
      if (!validateTimes(formData.startTime, formData.endTime)) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    if (!formData.location) newErrors.location = "Meeting location is required";
    if (!formData.level) {
      newErrors.level = "Meeting level is required";
    }

    if (!formData.participants.trim()) {
      newErrors.participants = "Participants are required";
    } else if (!validateParticipantEmails(formData.participants)) {
      newErrors.participants = "All participants must be valid email addresses";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      try {
        const formattedData = {
          ...formData,
          participants: formData.participants
            .split(",")
            .map((email) => email.trim()),
        };

        let result;
        if (editingMeeting) {
          result =  updateMeeting(apiEndPoint + '/api/meetings')(editingMeeting.id, formattedData);
        } else {
          result = await addMeeting(apiEndPoint + '/api/meetings')(formattedData);
        }

        if (result.success) {
          resetForm();
          if (editingMeeting) {
            onMeetingUpdated(apiEndPoint + '/api/meetings');
          } else {
            onMeetingAdded(apiEndPoint + '/api/meetings');
          }
        } else if (result.fieldErrors) {
          setErrors(result.fieldErrors);
        } else {
          alert(result.error || "Failed to save meeting");
        }
      } catch (error) {
        alert("Error saving meeting: " + error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      Date: "",
      startTime: "",
      endTime: "",
      location: "",
      level: "",
      participants: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">
          {editingMeeting ? "Edit Meeting" : "Schedule New Meeting"}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{labels.titleLabel}</label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={`Enter ${labels.titleLabel.toLowerCase()}`}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">{labels.dateLabel}</label>
              <input
                type="date"
                className={`form-control ${
                  errors.Date ? "is-invalid" : ""
                }`}
                name="Date"
                value={formData.Date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.Date && (
                <div className="invalid-feedback">{errors.Date}</div>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">{labels.startTimeLabel}</label>
              <input
                type="time"
                className={`form-control ${
                  errors.startTime ? "is-invalid" : ""
                }`}
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
              {errors.startTime && (
                <div className="invalid-feedback">{errors.startTime}</div>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">{labels.endTimeLabel}</label>
              <input
                type="time"
                className={`form-control ${errors.endTime ? "is-invalid" : ""}`}
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
              {errors.endTime && (
                <div className="invalid-feedback">{errors.endTime}</div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">{labels.location}</label>
            <textarea
              className={`form-control ${
                errors.location ? "is-invalid" : ""
              }`}
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder={`Enter ${labels.locationLabel.toLowerCase()}`}
              rows="3"
            />
            {errors.location && (
              <div className="invalid-feedback">{errors.location}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">{labels.levelLabel}</label>
            <select
              className={`form-select ${errors.level ? "is-invalid" : ""}`}
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="">Select {labels.levelLabel.toLowerCase()}</option>
              <option value="Team">Team</option>
              <option value="Department">Department</option>
              <option value="Company">Company</option>
            </select>
            {errors.level && (
              <div className="invalid-feedback">{errors.level}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">{labels.participantsLabel}</label>
            <input
              type="text"
              className={`form-control ${
                errors.participants ? "is-invalid" : ""
              }`}
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              placeholder="e.g., anders@example.com, george@example.com"
            />
            {errors.participants && (
              <div className="invalid-feedback">{errors.participants}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">{labels.descriptionLabel}</label>
            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={`Enter ${labels.descriptionLabel.toLowerCase()}`}
              rows="3"
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <div className="text-end">
            {editingMeeting && (
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => {
                  resetForm();
                  onMeetingUpdated(apiEndPoint + '/api/meetings'); 
                }}
              >
                <i className="bi bi-x-circle me-2"></i>
                Cancel Edit
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-save me-2"></i>
                  {editingMeeting ? "Update Meeting" : "Save Meeting"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingForm;
