import { useState } from 'react';
import MentorInput, { MentorTextarea } from '../components/mentorship/MentorInput';
import { useAuth } from '../context/AuthContext';
import { ApplyAsMentor, ApplyAsMentee } from '../apiCalls/mentorship';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const MentorProgram = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('mentor');
    
    // Mentor form state
    const [phoneNo, setPhoneNo] = useState('');
    const [academicBg, setAcademicBg] = useState('');
    const [areaOfExpertise, setAreaOfExpertise] = useState('');
    const [areasOfInterest, setAreasOfInterest] = useState('');
    const [preferredComm, setPreferredComm] = useState('');
    
    // Mentee form state
    const [mentorAreasOfInterest, setMentorAreasOfInterest] = useState('');
    const [mentorPhoneNo, setMentorPhoneNo] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleMentorSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!academicBg || !preferredComm) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            const interests = areasOfInterest
                .split(/[\n,]/)
                .map((value) => value.trim())
                .filter(Boolean);

            const applicationData = {
                academic_background: academicBg,
                preferred_mode: preferredComm,
                phone_no: phoneNo || undefined,
                area_of_expertise: areaOfExpertise || undefined,
                areas_of_interest: interests.length > 0 ? interests : undefined,
                current_level: user?.current_level || undefined,
            };

            const response = await ApplyAsMentor(applicationData);
            
            if (response?.status === 201) {
                setSuccess('Your mentor application has been submitted successfully!');
                setPhoneNo('');
                setAcademicBg('');
                setAreaOfExpertise('');
                setAreasOfInterest('');
                setPreferredComm('');
            }
        } catch (err) {
            console.error('Failed to submit mentor application:', err);
            setError('Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleMenteeSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!mentorAreasOfInterest) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            const interests = mentorAreasOfInterest
                .split(/[\n,]/)
                .map((value) => value.trim())
                .filter(Boolean);

            const applicationData = {
                matric_no: user?.matric_no || '',
                level: user?.current_level || '',
                areas_of_interest: interests,
                phone_no: mentorPhoneNo || undefined,
            };

            const response = await ApplyAsMentee(applicationData);
            
            if (response?.status === 201) {
                setSuccess('Your mentorship application has been submitted successfully!');
                setMentorAreasOfInterest('');
                setMentorPhoneNo('');
            }
        } catch (err) {
            console.error('Failed to submit mentee application:', err);
            setError('Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isMentorFormValid = academicBg && preferredComm;
    const isMenteeFormValid = mentorAreasOfInterest;
    
    return (
        <>
            <h1 className="max-md:text-center text-4xl font-GeneralSans-Semibold text-[#A5CC15]">
                Mentor Program
            </h1>

            {/* Tab Switcher */}
            <div className="flex justify-center mt-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        className={`px-6 py-2 rounded-lg font-GeneralSans-Medium transition-colors ${
                            activeTab === 'mentor'
                                ? 'bg-[#2561ED] text-white'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => setActiveTab('mentor')}
                    >
                        Apply to be a Mentor
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg font-GeneralSans-Medium transition-colors ${
                            activeTab === 'mentee'
                                ? 'bg-[#2561ED] text-white'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => setActiveTab('mentee')}
                    >
                        Apply for a Mentor
                    </button>
                </div>
            </div>

            <div className="md:w-[448px] mt-6 mx-auto font-GeneralSans-Semibold text-[#5B5C60]">
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                {success && (
                    <p className="text-green-500 text-sm mb-4">{success}</p>
                )}

                {/* Mentor Application Form */}
                {activeTab === 'mentor' && (
                    <>
                        <p className="mb-[14px]">Academic Background and Preferred Mode are required</p>
                        <form onSubmit={handleMentorSubmit} className="flex flex-col gap-2">
                            <MentorInput
                                htmlFor={"name"}
                                title={"Name"}
                                placeholder={"Your name"}
                                value={user ? `${user.firstname || ''} ${user.lastname || ''}` : ''}
                                disabled={true}
                                className={'peer/name bg-gray-100'}
                                peerClassName={'hidden'}
                            />
                            <MentorInput
                                htmlFor={"matric-no"}
                                title={"Matric No"}
                                placeholder={"Your matric number"}
                                value={user?.matric_no || ''}
                                disabled={true}
                                className={'peer/matric-no bg-gray-100'}
                                peerClassName={'hidden'}
                            />
                            <MentorInput
                                htmlFor={"level"}
                                title={"Current Level"}
                                placeholder={"Your current level"}
                                value={user?.current_level ? `${user.current_level} Level` : ''}
                                disabled={true}
                                className={'peer/level bg-gray-100'}
                                peerClassName={'hidden'}
                            />

                            <MentorInput
                                htmlFor={"phone-no"}
                                title={"Phone Number"}
                                type={"tel"}
                                placeholder={"Enter your phone number"}
                                value={phoneNo}
                                className={'peer/phone'}
                                peerClassName={'hidden'}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />

                            <MentorTextarea
                                htmlFor={"academic-bg"}
                                title={"Academic Background"}
                                placeholder={
                                    "Tell us a little about your Academic Background"
                                }
                                value={academicBg}
                                className={'peer/academic'}
                                peerClassName={'hidden'}
                                onChange={(e) => setAcademicBg(e.target.value)}
                            />
                            <MentorTextarea
                                htmlFor={"expertise"}
                                title={"Area of Expertise"}
                                placeholder={"Enter your areas of expertise"}
                                value={areaOfExpertise}
                                className={'peer/expertise'}
                                peerClassName={'hidden'}
                                onChange={(e) => setAreaOfExpertise(e.target.value)}
                            />
                            <MentorTextarea
                                htmlFor={"areas-of-interest"}
                                title={"Areas of Interest"}
                                placeholder={"List areas of interest separated by commas or new lines"}
                                value={areasOfInterest}
                                className={'peer/interest'}
                                peerClassName={'hidden'}
                                onChange={(e) => setAreasOfInterest(e.target.value)}
                            />

                            <MentorInput
                                htmlFor={"preferred-comm"}
                                title={"Preferred Mode of Communication"}
                                placeholder={"e.g., Email, WhatsApp, Phone calls"}
                                value={preferredComm}
                                className={'peer/preferred'}
                                peerClassName={'hidden'}
                                onChange={(e) => setPreferredComm(e.target.value)}
                            />

                            <button 
                                type="submit"
                                disabled={!isMentorFormValid || loading}
                                className={`mt-[72px] ${isMentorFormValid && !loading ? 'bg-[#2561ED] hover:bg-[#1e4fc7]' : 'bg-[#C0C0C0]'} text-[#FAFAFB] text-lg rounded-lg border-none py-2 transition-colors`}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </>
                )}

                {/* Mentee Application Form */}
                {activeTab === 'mentee' && (
                    <>
                        <p className="mb-[14px]">Areas of Interest are required. Fill out the form below to get matched with a mentor.</p>
                        <form onSubmit={handleMenteeSubmit} className="flex flex-col gap-2">
                            <MentorInput
                                htmlFor={"name"}
                                title={"Name"}
                                placeholder={"Your name"}
                                value={user ? `${user.firstname || ''} ${user.lastname || ''}` : ''}
                                disabled={true}
                                className={'peer/name bg-gray-100'}
                                peerClassName={'hidden'}
                            />
                            <MentorInput
                                htmlFor={"matric-no"}
                                title={"Matric No"}
                                placeholder={"Your matric number"}
                                value={user?.matric_no || ''}
                                disabled={true}
                                className={'peer/matric-no bg-gray-100'}
                                peerClassName={'hidden'}
                            />
                            <MentorInput
                                htmlFor={"level"}
                                title={"Current Level"}
                                placeholder={"Your current level"}
                                value={user?.current_level ? `${user.current_level} Level` : ''}
                                disabled={true}
                                className={'peer/level bg-gray-100'}
                                peerClassName={'hidden'}
                            />

                            <MentorInput
                                htmlFor={"phone-no"}
                                title={"Phone Number (Optional)"}
                                type={"tel"}
                                placeholder={"Enter your phone number"}
                                value={mentorPhoneNo}
                                className={'peer/phone'}
                                peerClassName={'hidden'}
                                onChange={(e) => setMentorPhoneNo(e.target.value)}
                            />

                            <MentorTextarea
                                htmlFor={"mentee-interest"}
                                title={"Areas of Interest"}
                                placeholder={
                                    "What topics would you like help with? (e.g., Exam preparation, Research methods, Career guidance)"
                                }
                                value={mentorAreasOfInterest}
                                className={'peer/interest'}
                                peerClassName={'hidden'}
                                onChange={(e) => setMentorAreasOfInterest(e.target.value)}
                            />

                            <button 
                                type="submit"
                                disabled={!isMenteeFormValid || loading}
                                className={`mt-[72px] ${isMenteeFormValid && !loading ? 'bg-[#2561ED] hover:bg-[#1e4fc7]' : 'bg-[#C0C0C0]'} text-[#FAFAFB] text-lg rounded-lg border-none py-2 transition-colors`}
                            >
                                {loading ? 'Submitting...' : 'Apply for Mentor'}
                            </button>
                        </form>
                    </>
                )}
            </div>

            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default MentorProgram;
