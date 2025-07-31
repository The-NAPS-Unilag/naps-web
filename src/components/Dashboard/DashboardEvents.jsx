function DashboardEvents({ calendarNo, calendarDetails, time, borderColour }) {
    return (
        <>
            <div className="flex items-center gap-4 ">
                <div className={`p-1 border w-[25px] h-[27px] ${borderColour}`}>
                    <span className="flex justify-center items-center w-[17px] h-[19px] text-xs ">
                        {calendarNo}
                    </span>
                </div>
                <div>
                    <p className='text-xs font-GeneralSans-Medium mb-1'>
                        {calendarDetails}
                    </p>
                    <p className='text-[10px]'>
                        {time}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DashboardEvents