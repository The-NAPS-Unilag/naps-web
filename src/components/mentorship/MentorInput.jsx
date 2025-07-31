// Check how they write the onchange function to validate input

function MentorInput({ htmlFor, type='text', title, placeholder, className, peerClassName, onChange,  }) {    
    return (
        <>
            <label htmlFor={htmlFor} className={`text-sm `}>
                <span>{title}</span>
            
                <input
                    name={htmlFor}
                    id={htmlFor}
                    type={type}
                    placeholder={placeholder}
                    required
                    onChange={onChange}
                    className={`${className} peer mt-2 bg-slate-50 w-full text-sm border-[0.5px] border-[#CACDD5] rounded-lg p-3 placeholder:text-sm placeholder:text-[#CACDD5] outline-none hover:border-[#2561ED] focus:border-[#2561ED] user-valid:border-[#2561ED] user-invalid:border-[#CA001A] [appearance:textfield] `}
                />
                {/* <p className={`${peerClassName} text-[10px] text-[#CA001A]`}>This field is required</p> */} {/* Uncomment this when you have v4 of tailwind */}
            </label>
       </>
    );
}

export function MentorTextarea({ htmlFor, title, placeholder, className, peerClassName, onChange }) {
    return (
        <>
            <label htmlFor={htmlFor} className={`text-sm`}>
                {title}
            </label>
            <textarea
                name={htmlFor}
                id={htmlFor}
                placeholder={placeholder}
                onChange={onChange}
                required
                className={`${className} mt-2 h-[140px] bg-slate-50 w-full text-sm border-[0.5px] border-[#CACDD5] rounded-lg p-3 placeholder:text-sm placeholder:text-[#CACDD5] outline-none hover:border-[#2561ED] focus:border-[#2561ED] user-valid:border-[#2561ED] user-invalid:border-[#CA001A]`}
            ></textarea>
            {/* <p className={`${peerClassName} text-[10px] text-[#CA001A]`}>This field is required</p> */} {/** Uncomment this when you have v4 of tailwind */}
        </>
    );
}

export default MentorInput;
