import { useState } from 'react';
import MentorInput, { MentorTextarea } from '../components/mentorship/MentorInput';
import { useAuth } from '../context/AuthContext';
import { ApplyAsMentor } from '../apiCalls/mentorship';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const MentorProgram = () => {
    const { user } = useAuth();
    
    // Form state - prefill with user data where available
    const [phoneNo, setPhoneNo] = useState('');
    const [academicBg, setAcademicBg] = useState('');
    const [areaOfExpertise, setAreaOfExpertise] = useState('');
    const [areasOfInterest, setAreasOfInterest] = useState('');
    const [preferredComm, setPreferredComm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate required fields
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
                // Reset form on success
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

    const isFormValid = academicBg && preferredComm;
    
    return (
        <>
            <h1 className="max-md:text-center text-4xl font-GeneralSans-Semibold text-[#A5CC15]">
                Apply to be a Mentor
            </h1>

            <div className="md:w-[448px] mt-6 mx-auto font-GeneralSans-Semibold text-[#5B5C60]">
                <p className="mb-[14px]">Academic Background and Preferred Mode are required</p>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    {/* Display user info (read-only) */}
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

                    {/* Editable fields */}
                    <MentorInput
                        htmlFor={"phone-no"}
                        title={"Phone Number"}
                        type={"tel"}
                        placeholder={"Enter your phone number"}
                        value={phoneNo}
                        className={'peer/phone'}
                        peerClassName={'hidden peer-user-invalid/phone:text-red-500 peer-user-invalid/phone:block'}
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
                        peerClassName={'hidden peer-user-invalid/academic:text-red-500 peer-user-invalid/academic:block'}
                        onChange={(e) => setAcademicBg(e.target.value)}
                    />
                    <MentorTextarea
                        htmlFor={"expertise"}
                        title={"Area of Expertise"}
                        placeholder={"Enter your areas of expertise"}
                        value={areaOfExpertise}
                        className={'peer/expertise'}
                        peerClassName={'hidden peer-user-invalid/expertise:text-red-500 peer-user-invalid/expertise:block'}
                        onChange={(e) => setAreaOfExpertise(e.target.value)}
                    />
                    <MentorTextarea
                        htmlFor={"areas-of-interest"}
                        title={"Areas of Interest"}
                        placeholder={"List areas of interest separated by commas or new lines"}
                        value={areasOfInterest}
                        className={'peer/interest'}
                        peerClassName={'hidden peer-user-invalid/interest:text-red-500 peer-user-invalid/interest:block'}
                        onChange={(e) => setAreasOfInterest(e.target.value)}
                    />

                    <MentorInput
                        htmlFor={"preferred-comm"}
                        title={"Preferred Mode of Communication"}
                        placeholder={"e.g., Email, WhatsApp, Phone calls"}
                        value={preferredComm}
                        className={'peer/preferred'}
                        peerClassName={'hidden peer-user-invalid/preferred:text-red-500 peer-user-invalid/preferred:block'}
                        onChange={(e) => setPreferredComm(e.target.value)}
                    />

                    <button 
                        type="submit"
                        disabled={!isFormValid || loading}
                        className={`mt-[72px] ${isFormValid && !loading ? 'bg-[#2561ED] hover:bg-[#1e4fc7]' : 'bg-[#C0C0C0]'} text-[#FAFAFB] text-lg rounded-lg border-none py-2 transition-colors`}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
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
