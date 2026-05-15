import { useState, useEffect } from 'react';
import MentorInput, { MentorTextarea } from '../components/mentorship/MentorInput';
import { useAuth } from '../context/AuthContext';
import {
    ApplyAsMentor,
    ApplyAsMentee,
    GetMyMentorApplication,
    GetMyMenteeApplication,
} from '../apiCalls/mentorship';
import CircularProgress from "@mui/material/CircularProgress";

const STATUS_CONFIG = {
    pending: {
        color: 'bg-amber-50 border-amber-200 text-amber-700',
        dot: 'bg-amber-400',
        label: 'Under Review',
    },
    approved: {
        color: 'bg-green-50 border-green-200 text-green-700',
        dot: 'bg-green-500',
        label: 'Approved',
    },
    rejected: {
        color: 'bg-red-50 border-red-200 text-red-700',
        dot: 'bg-red-500',
        label: 'Not Approved',
    },
};

const ApplicationStatusCard = ({ application, type, onReapply }) => {
    const cfg = STATUS_CONFIG[application.status] ?? STATUS_CONFIG.pending;
    const label = type === 'mentor' ? 'Mentor Application' : 'Mentee Application';
    const submitted = application.created_at
        ? new Date(application.created_at).toLocaleDateString()
        : '—';

    return (
        <div className={`border rounded-xl p-5 ${cfg.color} mb-6`}>
            <div className="flex items-center gap-2 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                <span className="font-GeneralSans-Semibold text-sm">
                    {label} — {cfg.label}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-3">
                {type === 'mentor' ? (
                    <>
                        <div>
                            <span className="opacity-70">Expertise</span>
                            <p className="font-GeneralSans-Medium mt-0.5">
                                {application.area_of_expertise || '—'}
                            </p>
                        </div>
                        <div>
                            <span className="opacity-70">Preferred Mode</span>
                            <p className="font-GeneralSans-Medium mt-0.5">
                                {application.preferred_mode || '—'}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <span className="opacity-70">Level</span>
                            <p className="font-GeneralSans-Medium mt-0.5">
                                {application.level || '—'}
                            </p>
                        </div>
                        <div>
                            <span className="opacity-70">Interests</span>
                            <p className="font-GeneralSans-Medium mt-0.5">
                                {application.areas_of_interest || '—'}
                            </p>
                        </div>
                    </>
                )}
                <div>
                    <span className="opacity-70">Submitted</span>
                    <p className="font-GeneralSans-Medium mt-0.5">{submitted}</p>
                </div>
            </div>

            {application.status === 'pending' && (
                <p className="text-xs opacity-70">
                    Your application is being reviewed by the admin team. We'll notify you once a decision has been made.
                </p>
            )}
            {application.status === 'approved' && (
                <p className="text-xs opacity-70">
                    {type === 'mentor'
                        ? 'Congratulations! You are now a mentor on the platform.'
                        : 'Your application is approved. You will be paired with a mentor shortly.'}
                </p>
            )}
            {application.status === 'rejected' && (
                <div className="flex items-center justify-between mt-2">
                    <p className="text-xs opacity-70">
                        Your application was not approved this time. You may submit a new application.
                    </p>
                    <button
                        onClick={onReapply}
                        className="text-xs underline font-GeneralSans-Medium ml-4 shrink-0"
                    >
                        Apply again
                    </button>
                </div>
            )}
        </div>
    );
};

const MentorProgram = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('mentor');

    // Application status
    const [mentorApp, setMentorApp] = useState(undefined); // undefined = loading
    const [menteeApp, setMenteeApp] = useState(undefined);
    const [overrideMentor, setOverrideMentor] = useState(false); // allow reapply after rejection
    const [overrideMentee, setOverrideMentee] = useState(false);

    // Mentor form
    const [phoneNo, setPhoneNo] = useState('');
    const [academicBg, setAcademicBg] = useState('');
    const [areaOfExpertise, setAreaOfExpertise] = useState('');
    const [areasOfInterest, setAreasOfInterest] = useState('');
    const [preferredComm, setPreferredComm] = useState('');

    // Mentee form
    const [menteeInterests, setMenteeInterests] = useState('');
    const [menteePhoneNo, setMenteePhoneNo] = useState('');

    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        Promise.all([GetMyMentorApplication(), GetMyMenteeApplication()])
            .then(([mentorRes, menteeRes]) => {
                setMentorApp(mentorRes.data?.application ?? null);
                setMenteeApp(menteeRes.data?.application ?? null);
            })
            .finally(() => setInitLoading(false));
    }, []);

    const handleMentorSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!academicBg || !preferredComm) {
            setError('Academic Background and Preferred Mode are required.');
            return;
        }
        setLoading(true);
        try {
            const interests = areasOfInterest
                .split(/[\n,]/).map(v => v.trim()).filter(Boolean);
            const response = await ApplyAsMentor({
                academic_background: academicBg,
                preferred_mode: preferredComm,
                phone_no: phoneNo || undefined,
                area_of_expertise: areaOfExpertise || undefined,
                areas_of_interest: interests.length ? interests : undefined,
                current_level: user?.current_level || undefined,
            });
            if (response?.status === 201) {
                setMentorApp(response.data?.application ?? { status: 'pending' });
                setOverrideMentor(false);
                setPhoneNo(''); setAcademicBg(''); setAreaOfExpertise('');
                setAreasOfInterest(''); setPreferredComm('');
            }
        } catch {
            setError('Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleMenteeSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!menteeInterests) {
            setError('Areas of Interest are required.');
            return;
        }
        setLoading(true);
        try {
            const interests = menteeInterests
                .split(/[\n,]/).map(v => v.trim()).filter(Boolean);
            const response = await ApplyAsMentee({
                matric_no: user?.matric_no || '',
                level: user?.current_level || '',
                areas_of_interest: interests,
                phone_no: menteePhoneNo || undefined,
            });
            if (response?.status === 201) {
                setMenteeApp(response.data?.application ?? { status: 'pending' });
                setOverrideMentee(false);
                setMenteeInterests(''); setMenteePhoneNo('');
            }
        } catch {
            setError('Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const showMentorForm = !mentorApp || overrideMentor;
    const showMenteeForm = !menteeApp || overrideMentee;

    const tabs = [
        { id: 'mentor', label: 'Apply to be a Mentor' },
        { id: 'mentee', label: 'Apply for a Mentor' },
        { id: 'status', label: 'My Applications' },
    ];

    return (
        <>
            <h1 className="max-md:text-center text-4xl font-GeneralSans-Semibold text-[#A5CC15]">
                Mentor Program
            </h1>

            <div className="flex justify-center mt-6">
                <div className="flex bg-gray-100 rounded-lg p-1 gap-1 flex-wrap justify-center">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => { setActiveTab(t.id); setError(''); setSuccess(''); }}
                            className={`px-5 py-2 rounded-lg font-GeneralSans-Medium transition-colors text-sm ${
                                activeTab === t.id
                                    ? 'bg-[#2561ED] text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {t.label}
                            {t.id === 'status' && !initLoading && (mentorApp || menteeApp) && (
                                <span className="ml-2 bg-white text-[#2561ED] rounded-full text-xs px-1.5 py-0.5 font-GeneralSans-Semibold">
                                    {[mentorApp, menteeApp].filter(Boolean).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="md:w-[448px] mt-6 mx-auto font-GeneralSans-Semibold text-[#5B5C60]">
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                {initLoading ? (
                    <div className="flex justify-center py-12">
                        <CircularProgress size={28} />
                    </div>
                ) : (
                    <>
                        {/* ── Apply to be a Mentor ── */}
                        {activeTab === 'mentor' && (
                            <>
                                {mentorApp && !overrideMentor && (
                                    <ApplicationStatusCard
                                        application={mentorApp}
                                        type="mentor"
                                        onReapply={() => setOverrideMentor(true)}
                                    />
                                )}
                                {showMentorForm && (
                                    <>
                                        <p className="mb-[14px] text-sm">
                                            Academic Background and Preferred Mode are required.
                                        </p>
                                        <form onSubmit={handleMentorSubmit} className="flex flex-col gap-2">
                                            <MentorInput htmlFor="name" title="Name"
                                                value={user ? `${user.firstname || ''} ${user.lastname || ''}` : ''}
                                                disabled placeholder="Your name"
                                                className="peer/name bg-gray-100" peerClassName="hidden" />
                                            <MentorInput htmlFor="matric-no" title="Matric No"
                                                value={user?.matric_no || ''} disabled
                                                placeholder="Your matric number"
                                                className="peer/matric-no bg-gray-100" peerClassName="hidden" />
                                            <MentorInput htmlFor="level" title="Current Level"
                                                value={user?.current_level ? `${user.current_level} Level` : ''}
                                                disabled placeholder="Your current level"
                                                className="peer/level bg-gray-100" peerClassName="hidden" />
                                            <MentorInput htmlFor="phone-no" title="Phone Number" type="tel"
                                                placeholder="Enter your phone number"
                                                value={phoneNo} onChange={e => setPhoneNo(e.target.value)}
                                                className="peer/phone" peerClassName="hidden" />
                                            <MentorTextarea htmlFor="academic-bg" title="Academic Background"
                                                placeholder="Tell us about your academic background"
                                                value={academicBg} onChange={e => setAcademicBg(e.target.value)}
                                                className="peer/academic" peerClassName="hidden" />
                                            <MentorTextarea htmlFor="expertise" title="Area of Expertise"
                                                placeholder="Enter your areas of expertise"
                                                value={areaOfExpertise} onChange={e => setAreaOfExpertise(e.target.value)}
                                                className="peer/expertise" peerClassName="hidden" />
                                            <MentorTextarea htmlFor="areas-of-interest" title="Areas of Interest"
                                                placeholder="List areas of interest separated by commas or new lines"
                                                value={areasOfInterest} onChange={e => setAreasOfInterest(e.target.value)}
                                                className="peer/interest" peerClassName="hidden" />
                                            <MentorInput htmlFor="preferred-comm" title="Preferred Mode of Communication"
                                                placeholder="e.g., Email, WhatsApp, Phone calls"
                                                value={preferredComm} onChange={e => setPreferredComm(e.target.value)}
                                                className="peer/preferred" peerClassName="hidden" />
                                            <button type="submit" disabled={!(academicBg && preferredComm) || loading}
                                                className={`mt-[72px] ${academicBg && preferredComm && !loading ? 'bg-[#2561ED] hover:bg-[#1e4fc7]' : 'bg-[#C0C0C0]'} text-[#FAFAFB] text-lg rounded-lg border-none py-2 transition-colors`}>
                                                {loading ? 'Submitting…' : 'Submit'}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </>
                        )}

                        {/* ── Apply for a Mentor (Mentee) ── */}
                        {activeTab === 'mentee' && (
                            <>
                                {menteeApp && !overrideMentee && (
                                    <ApplicationStatusCard
                                        application={menteeApp}
                                        type="mentee"
                                        onReapply={() => setOverrideMentee(true)}
                                    />
                                )}
                                {showMenteeForm && (
                                    <>
                                        <p className="mb-[14px] text-sm">
                                            Areas of Interest are required. Fill out the form below to get matched with a mentor.
                                        </p>
                                        <form onSubmit={handleMenteeSubmit} className="flex flex-col gap-2">
                                            <MentorInput htmlFor="name" title="Name"
                                                value={user ? `${user.firstname || ''} ${user.lastname || ''}` : ''}
                                                disabled placeholder="Your name"
                                                className="peer/name bg-gray-100" peerClassName="hidden" />
                                            <MentorInput htmlFor="matric-no" title="Matric No"
                                                value={user?.matric_no || ''} disabled
                                                placeholder="Your matric number"
                                                className="peer/matric-no bg-gray-100" peerClassName="hidden" />
                                            <MentorInput htmlFor="level" title="Current Level"
                                                value={user?.current_level ? `${user.current_level} Level` : ''}
                                                disabled placeholder="Your current level"
                                                className="peer/level bg-gray-100" peerClassName="hidden" />
                                            <MentorInput htmlFor="phone-no" title="Phone Number (Optional)" type="tel"
                                                placeholder="Enter your phone number"
                                                value={menteePhoneNo} onChange={e => setMenteePhoneNo(e.target.value)}
                                                className="peer/phone" peerClassName="hidden" />
                                            <MentorTextarea htmlFor="mentee-interest" title="Areas of Interest"
                                                placeholder="What topics would you like help with? (e.g., Exam prep, Research, Career guidance)"
                                                value={menteeInterests} onChange={e => setMenteeInterests(e.target.value)}
                                                className="peer/interest" peerClassName="hidden" />
                                            <button type="submit" disabled={!menteeInterests || loading}
                                                className={`mt-[72px] ${menteeInterests && !loading ? 'bg-[#2561ED] hover:bg-[#1e4fc7]' : 'bg-[#C0C0C0]'} text-[#FAFAFB] text-lg rounded-lg border-none py-2 transition-colors`}>
                                                {loading ? 'Submitting…' : 'Apply for Mentor'}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </>
                        )}

                        {/* ── My Applications ── */}
                        {activeTab === 'status' && (
                            <div className="pt-2">
                                {!mentorApp && !menteeApp && (
                                    <p className="text-center text-gray-500 py-10 text-sm">
                                        You haven't submitted any applications yet.
                                    </p>
                                )}
                                {mentorApp && (
                                    <div className="mb-2">
                                        <h3 className="text-sm font-GeneralSans-Medium text-gray-500 mb-2 uppercase tracking-wide">
                                            Mentor Application
                                        </h3>
                                        <ApplicationStatusCard
                                            application={mentorApp}
                                            type="mentor"
                                            onReapply={() => { setOverrideMentor(true); setActiveTab('mentor'); }}
                                        />
                                    </div>
                                )}
                                {menteeApp && (
                                    <div>
                                        <h3 className="text-sm font-GeneralSans-Medium text-gray-500 mb-2 uppercase tracking-wide">
                                            Mentee Application
                                        </h3>
                                        <ApplicationStatusCard
                                            application={menteeApp}
                                            type="mentee"
                                            onReapply={() => { setOverrideMentee(true); setActiveTab('mentee'); }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default MentorProgram;
