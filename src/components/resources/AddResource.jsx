import BackButton from "./BackButton";

const AddResource = () => {
    return (
        <>
            <>
                <BackButton />
                
                <div className="max-w-[448px] mx-auto text-sm">
                    <h1 className="mb-6 text-[#CC8A0A] font-GeneralSans-Semibold text-[28px]">Add Resource</h1>

                    <form action="#" className="flex flex-col gap">
                        <label htmlFor="resource-name" className="text-sm mb-2">
                            <span className="text-[#5B5C60] font-GeneralSans-Semibold">Resource Title / name</span>
                            <input 
                            type="text" 
                            placeholder="Enter resource Title / name"
                            className="w-full font-GeneralSans-Semibold text-[#797B80] outline-none placeholder:font-GeneralSans-Semibold placeholder:text-[#CACDD5] bg-slate-50 p-3 mt-2 text-xs border-[0.25px] rounded-lg border-[#CACDD5]"
                            />
                            
                        </label>
                        <label htmlFor="course-title" className="text-sm mb-2">
                            <span className="text-[#5B5C60] font-GeneralSans-Semibold">Course Title / Code</span>
                            <input 
                            type="text" 
                            placeholder="Enter Course Code"
                            className="w-full font-GeneralSans-Semibold text-[#797B80] outline-none placeholder:font-GeneralSans-Semibold placeholder:text-[#CACDD5] bg-slate-50 p-3 mt-2 text-xs border-[0.25px] rounded-lg border-[#CACDD5]"
                            />
                            
                        </label>
                        <label htmlFor="level" className="text-sm mb-2">
                            <span className="text-[#5B5C60] font-GeneralSans-Semibold">Level</span>
                            <input 
                            type="text" 
                            placeholder="Select your Current Level"
                            className="w-full font-GeneralSans-Semibold text-[#797B80] outline-none placeholder:font-GeneralSans-Semibold placeholder:text-[#CACDD5] bg-slate-50 p-3 mt-2 text-xs border-[0.25px] rounded-lg border-[#CACDD5]"
                            />
                            
                        </label>

                        <label htmlFor="upload" className="text-[#5B5C60] mb-2 font-GeneralSans-Semibold">Upload File</label>
                        <div className="border border-dashed border-[#CACDD5] h-[242px] overflow-hidden rounded-lg flex flex-col justify-evenly items-center">
                        <div className="flex items-center justify-center w-full">
                            <label for="dropzone-file" className="flex flex-col flex-1 items-center justify-center w-full h-[242px] rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">Drag your files or docs here to start uploading <br />(.Pdf, .Ppt, .Doc formats only )</p>
                                    
                                </div>
                                <input id='dropzone-file' className="block w-42 text-xs text-gray-900 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple/>
                            </label>
                        </div> 
                        </div>

                        <button className="mt-14 bg-[#C0C0C0] text-[#FAFAFB] hover:bg-[#2561ED] text-lg rounded-lg border-none">Submit</button>
                    </form>
                </div>
            </>
        </>
    )
}

export default AddResource;