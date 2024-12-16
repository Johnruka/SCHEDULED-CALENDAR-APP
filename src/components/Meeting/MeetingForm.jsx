import { useState, useEffect } from "react";
import axios from "axios";

const MeetingForm = () => {
  const apiEndPoint = "http://localhost:8080";

  // State Declarations
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [onMeetingUpdated, setOnMeetingUpdated] = useState(false);
  const [onMeetingAdded, setOnMeetingAdded] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    Date: "",
    startTime: "",
    endTime: "",
    location: "",
    level: "",
    participants: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [reload, setReload] = useState(false);
  const [labels, setLabels] = useState({
    titleLabel: "Title", 
    dateLabel: "Date",
    startTimeLabel: "Start Time",
    endTimeLabel: "End Time",
    locationLabel: "Location",
    levelLabel: "Level",
    participantsLabel: "Participants",
    descriptionLabel: "Description",
  });

  // Fetch Labels from API
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await axios.get(apiEndPoint + '/api/labels');
        if (response.status === 200) {
          setLabels(response.data);
        }
      } catch (error) {
        console.error("Error fetching labels", error);
      }
    };
    fetchLabels();
  }, [reload]);

  useEffect(() => {
    if (editingMeeting) {
      setFormData(editingMeeting);
    }
  }, [editingMeeting]);

  // Validation Functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

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

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.Date) newErrors.Date = "Meeting date is required";

    if (formData.Date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.Date);
      if (selectedDate < today) newErrors.Date = "Meeting date cannot be in the past";
    }

    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";

    if (formData.startTime && formData.endTime) {
      if (!validateTimes(formData.startTime, formData.endTime)) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    if (!formData.location) newErrors.location = "Meeting location is required";
    if (!formData.level) newErrors.level = "Meeting level is required";

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
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const formattedData = {
        ...formData,
        participants: formData.participants.split(",").map((email) => email.trim()),
      };

      let result;
      if (editingMeeting) {
        result = await axios.put(`${apiEndPoint}/api/meetings/${editingMeeting.id}`, formattedData);
        setOnMeetingUpdated(true);
      } else {
        result = await axios.post(`${apiEndPoint}/api/meetings`, formattedData);
        setOnMeetingAdded(true);
      }

      if (result.status === 200 || result.status === 201) {
        resetForm();
      } else {
        alert("Failed to save meeting");
      }
    } catch (error) {
      console.error("Error saving meeting:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
    setEditingMeeting(null);
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
          {/* Title Field */}
          <div className="mb-3">
            <label className="form-label">{labels.titleLabel}</label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={`Enter ${labels.titleLabel}`}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          {/* Date and Time Fields */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">{labels.dateLabel}</label>
              <input
                type="date"
                className={`form-control ${errors.Date ? "is-invalid" : ""}`}
                name="Date"
                value={formData.Date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.Date && <div className="invalid-feedback">{errors.Date}</div>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingForm;
