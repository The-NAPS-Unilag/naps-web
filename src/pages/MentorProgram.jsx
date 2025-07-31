import { useState } from 'react';
import MentorInput, { MentorTextarea } from '../components/mentorship/MentorInput';

const MentorProgram = () => {

    // These can be used to write future validation code and API use too
    const [name, setName] = useState('')
    const [matricNo, setMatricNo] = useState('')
    const [level, setLevel] = useState('')
    const [academicBg, setAcademicBg] = useState('')
    const [interests, setInterests] = useState('')
    const [preferredComm, setPreferredComm] = useState('')
    
    return (
        <>
            <h1 className="max-md:text-center text-4xl font-GeneralSans-Semibold text-[#A5CC15]">
                Apply to be a Mentor
            </h1>

            <div className="md:w-[448px] mt-6 mx-auto font-GeneralSans-Semibold text-[#5B5C60]">
                <p className="mb-[14px]">All fields are required</p>

                {/* If input value is okay, change border colour to #2561ED */}
                <form action="#" className="flex flex-col gap-2">
                    <MentorInput
                        htmlFor={"name"}
                        title={"Name"}
                        placeholder={"Annabelle Joel"}
                        className={'peer/name'}
                        peerClassName={'hidden 300 peer-user-invalid/name:text-red-500 peer-user-invalid/name:block'}
                        onChange={(e) => setName(e.target.value)}
                   />
                    <MentorInput
                        htmlFor={"matric-no"}
                        title={"Matric No"}
                        type={"number"}
                        placeholder={"24/wer34xy"}
                        className={'peer/matric-no'}
                        peerClassName={'hidden 300 peer-user-invalid/matric-no:text-red-500 peer-user-invalid/matric-no:block'}
                        onChange={(e) => setMatricNo(e.target.value)}
                    />
                    <MentorInput
                        htmlFor={"level"}
                        title={"Current Level"}
                        placeholder={"Select your Current Level"}
                        className={'peer/level'}
                        peerClassName={'hidden peer-user-invalid/level:text-red-500 peer-user-invalid/level:block'}
                        onChange={(e) => setLevel(e.target.value)}
                    />

                    <MentorTextarea
                        htmlFor={"academic-bg"}
                        title={"Academic Background"}
                        placeholder={
                            "Tell us a little about your Academic Background"
                        }
                        className={'peer/academic'}
                        peerClassName={'hidden peer-user-invalid/academic:text-red-500 peer-user-invalid/academic:block'}
                        onChange={(e) => setAcademicBg(e.target.value)}
                    />
                    <MentorTextarea
                        htmlFor={"interests"}
                        title={"Areas of Interest"}
                        placeholder={"Enter your areas of interest"}
                        className={'peer/interest'}
                        peerClassName={'hidden peer-user-invalid/interest:text-red-500 peer-user-invalid/interest:block'}
                        onChange={(e) => setInterests(e.target.value)}
                    />

                    <MentorInput
                        htmlFor={"preferred-comm"}
                        title={"Preferred Mode of Communication"}
                        placeholder={"24/wer34xy"}
                        className={'peer/preferred'}
                        peerClassName={'hidden peer-user-invalid/preferred:text-red-500 peer-user-invalid/preferred:block'}
                        onChange={(e) => setPreferredComm(e.target.value)}
                    />

                    <button className="mt-[72px] bg-[#C0C0C0] text-[#FAFAFB] hover:bg-[#2561ED] text-lg rounded-lg border-none">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};
export default MentorProgram;
