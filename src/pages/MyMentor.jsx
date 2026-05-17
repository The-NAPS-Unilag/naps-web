import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { GetMyMentorships } from "../apiCalls/mentorship";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MentorPlaceholder from "../assets/images/upcomingSmall1.png";

const MyMentor = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [mentorData, setMentorData] = useState(null);
  const [mentorProfile, setMentorProfile] = useState(null);

  useEffect(() => {
    const fetchMentorData = async () => {
      setLoading(true);
      try {
        const response = await GetMyMentorships();
        if (response?.data) {
          const { as_mentee } = response.data;
          
          // Get the first active mentorship where user is a mentee
          if (as_mentee && as_mentee.length > 0) {
            const activeMentorship = as_mentee.find(
              (m) => m.status === "active"
            ) || as_mentee[0];
            
            setMentorData(activeMentorship);

            const mentorFromRelationship =
              activeMentorship.mentor ||
              activeMentorship.mentor_profile ||
              activeMentorship.mentor_details;

            if (mentorFromRelationship) {
              setMentorProfile(mentorFromRelationship);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch mentorship data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, []);

  const handleSendMessage = () => {
    // TODO: Implement messaging functionality
    // Could open email, WhatsApp, or in-app messaging
    if (mentorProfile?.email) {
      window.location.href = `mailto:${mentorProfile.email}`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <CircularProgress />
      </div>
    );
  }

  // No mentor assigned yet
  if (!mentorData) {
    return (
      <div>
        <h1 className="text-4xl font-GeneralSans-Semibold text-[#A5CC15]">
          My Mentor
        </h1>
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-GeneralSans-Medium text-gray-700 mb-2">
            No Mentor Assigned Yet
          </h2>
          <p className="text-gray-500 max-w-md">
            You haven't been assigned a mentor yet. Once your mentorship application 
            is approved and you're paired with a mentor, their details will appear here.
          </p>
        </div>
      </div>
    );
  }

  if (!mentorProfile) {
    return (
      <div>
        <h1 className="text-4xl font-GeneralSans-Semibold text-[#A5CC15]">
          My Mentor
        </h1>
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <h2 className="text-xl font-GeneralSans-Medium text-gray-700 mb-2">
            Mentor Assigned
          </h2>
          <p className="text-gray-500 max-w-md">
            Your mentor has been assigned, but their profile details are not yet available.
          </p>
          <p className="text-gray-700 font-GeneralSans-Medium mt-4">
            {mentorData?.area_of_expertise || "Area of expertise not provided"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-GeneralSans-Semibold text-[#A5CC15]">
        My Mentor
      </h1>

      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 mt-8 md:mt-12 justify-center">
        {/* Mentor Image */}
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={mentorProfile.profile_picture || MentorPlaceholder}
            alt={`${mentorProfile.firstname} ${mentorProfile.lastname}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mentor Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-GeneralSans-Semibold text-gray-900">
              {mentorProfile.firstname} {mentorProfile.lastname}
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {mentorProfile.current_level} Level
            </span>
          </div>

          {/* Area of expertise */}
          <p className="text-gray-700 font-GeneralSans-Medium">
            {mentorData?.area_of_expertise || "Area of expertise not provided"}
          </p>

          {/* Bio or description */}
          <p className="text-gray-600 text-sm max-w-md">
            {mentorProfile.bio || 
              "I help with research methods and exam revision. I hope to be of assistance to my prospective mentee(s)"}
          </p>

          {/* Send Message Button */}
          <button
            onClick={handleSendMessage}
            className="mt-4 bg-[#2561ED] text-white px-6 py-2 rounded-lg font-GeneralSans-Medium hover:bg-[#1e4fc7] transition-colors w-fit"
          >
            Send Message
          </button>
        </div>
      </div>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default MyMentor;
